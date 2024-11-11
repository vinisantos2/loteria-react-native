import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { COR_DE_FUNDO } from './src/constants/Cores';
import StackNavigator from './src/rotas/StackNavigator';
import { Alert, PermissionsAndroid } from 'react-native';
import messaging, { firebase } from '@react-native-firebase/messaging';
import { Notificacao } from './src/model/Notificacao';

export default function App() {

  const requestUserPermission = async () => {


    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  React.useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

    // // firebase.initializeApp(firebaseConfig)
    // onMessage(cloudMessaging, (payload) => {
    //   console.log('Message received. ', payload);
    //   // ...
    // });

    // getToken(cloudMessaging, { vapidKey: 'VAPID_KEY' }).then((currentToken) => {
    //   if (currentToken) {
    //     // Send the token to your server and update the UI if necessary

    //     console.log(currentToken);
    //   } else {
    //     // Show permission request UI
    //     console.log('No registration token available. Request permission to generate one.');
    //     // ...
    //   }
    // }).catch((err) => {
    //   console.log('An error occurred while retrieving token. ', err);
    //   // .
    // });



    if (requestUserPermission()) {
      messaging().getToken().then(token => {
        console.log(token)
      })
    } else {
      console.log("Erro token status: ")
    }

    messaging().getInitialNotification()
      .then((rometeMessage) => {
        if (rometeMessage) {
          console.log("Notificação", rometeMessage.notification)
        }
      })

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log("Notificação ", remoteMessage.notification)
    })

    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {

      console.log(remoteMessage['notification'])
      const notificacao = new Notificacao()
      notificacao.body = remoteMessage['notification']['body']
      notificacao.title = remoteMessage['notification']['title']
      Alert.alert(notificacao.title, notificacao.body);
    });

    return unsubscribe
  })






  return (
    <NavigationContainer

      theme={{
        dark: true,
        colors: {
          card: COR_DE_FUNDO,
          border: "#FFFFFF00",
          background: undefined,
          notification: undefined,
          text: undefined,
          primary: undefined

        }
      }}>

      <StackNavigator />
    </NavigationContainer>
  );
}
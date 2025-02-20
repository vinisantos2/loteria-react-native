import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CORES } from './src/constants/Cores';
import StackNavigator from './src/rotas/StackNavigator';
import { Alert, PermissionsAndroid } from 'react-native';
import messaging, { firebase } from '@react-native-firebase/messaging';
import { Notificacao } from './src/model/Notificacao';
import RodapeBanner from './src/components/RodapeBanner';
import MobileAds from 'react-native-google-mobile-ads';


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

    MobileAds()
      .initialize()
      .then(adapterStatuses => {
        // Initialization complete!
      });
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
    <>
      <NavigationContainer

        theme={{
          
          dark: true,
          colors: {
            card: CORES.GERAL.DE_FUNDO,
            border: "#FFFFFF00",
            background: undefined,
            notification: undefined,
            text: undefined,
            primary: undefined

          }
        }}>

        <StackNavigator />
      </NavigationContainer>

      <RodapeBanner />

    </>

  );
}
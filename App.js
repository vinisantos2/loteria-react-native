import * as React from 'react';
import { Button, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Lotofacil from './components/Lotofacil';
import Lotomania from './components/Lotomania';
import BotaoOpcao from './components/BotaoOpcoes';
import MegaSena from './components/MegaSena';
import Quina from './components/Quina';

function HomeScreen({ navigation }) {
  return (
    <View style={style.content}>

      <BotaoOpcao text={"Lotofácil"} cor={"#9A368F"} nav={() => navigation.navigate("Lotofacil")} />
      <BotaoOpcao text={"Lotomania"} cor={"#F7791A"} nav={() => navigation.navigate("Lotomania")} />
      <BotaoOpcao text={"Mega sena"} cor={'#25B577'} nav={() => navigation.navigate("Mega Sena")} />
      <BotaoOpcao text={"Quina"} cor={'#2A2DA8'} nav={() => navigation.navigate('Quina')} />


    </View>
  );
}

const style = StyleSheet.create({
  content: {
    backgroundColor: '#DFD07B',
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 5,
    flexWrap: 'wrap'
  },

})


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Lotofacil" component={Lotofacil} />
        <Drawer.Screen name="Lotomania" component={Lotomania} />
        <Drawer.Screen name="Mega Sena" component={MegaSena} />
        <Drawer.Screen name="Quina" component={Quina} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
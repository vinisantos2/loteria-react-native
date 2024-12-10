import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Share, Alert } from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { Ionicons } from '@expo/vector-icons';
import TextView from './TextView';
import {  ROTA_SOBRE } from '../rotas/Rotas';
import { useNavigation } from '@react-navigation/native';
import { TXT_COMPARTILHAR } from '../constants/Constants';

export default function MenuComponent({ }) {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

 
  function sobre() {
    navigation.navigate(ROTA_SOBRE)
    setVisible(false)
  }

  async function compartilhar() {
    try {
      const result = await Share.share({
        message: TXT_COMPARTILHAR


      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 2 }}>
      <Menu
        style={{ alignSelf: 'center' }}
        visible={visible}
        anchor={<Ionicons onPress={showMenu} style={{ alignSelf: 'center', color: "#FFF" }} size={30} name='ellipsis-vertical' />}
        onRequestClose={hideMenu}
      >

        <MenuItem style={styles.temMenu} onPress={() => sobre()}><TextView value={"Sobre o app"} /></MenuItem>
        <MenuItem style={styles.temMenu} onPress={() => compartilhar()}><TextView value={"Compartilhar app"} /></MenuItem>
        <MenuDivider />
      </Menu>
    </View>
  );

}

const styles = StyleSheet.create({
  temMenu: {
    backgroundColor: "blue",
    borderWidth: 1
  },


})
import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import DrawerNav, { StackNav } from './src/rotas/DrawerNavigator';
import { COR_DE_FUNDO, COR_LOTOMAIA } from './src/constants/Cores';

export default function App() {
  return (
    <NavigationContainer theme={{ colors: { card: COR_DE_FUNDO, border:"#FFFFFF00", text: "#FFF" } }}>
      <DrawerNav />
      {/* <StackNav /> */}
    </NavigationContainer>
  );
}
import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import DrawerNav, { StackNav } from './src/rotas/DrawerNavigator';
import { COR_DE_FUNDO } from './src/constants/Cores';

export default function App() {
  return (
    <NavigationContainer theme={{ colors: { card: COR_DE_FUNDO, border: COR_DE_FUNDO, text: "#FFF" } }}>
      <DrawerNav />
      {/* <StackNav /> */}
    </NavigationContainer>
  );
}
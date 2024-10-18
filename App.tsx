import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';


import { COR_DE_FUNDO, COR_LOTOMAIA } from './src/constants/Cores';
import StackNavigator from './src/rotas/DrawerNavigator';

export default function App() {
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
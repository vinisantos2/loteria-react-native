import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import DrawerNav from './src/rotas/DrawerNavigator';






export default function App() {
  return (
    <NavigationContainer>
      <DrawerNav />
    </NavigationContainer>
  );
}
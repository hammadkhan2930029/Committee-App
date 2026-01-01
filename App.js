import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { AppNavigator } from './src/navigations/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/navigations/navigationService';
const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <AppNavigator />
    </NavigationContainer>
  );
};
export default App;

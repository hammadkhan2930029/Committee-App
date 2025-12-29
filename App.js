import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { AppNavigator } from './src/navigations/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};
export default App;

import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { AppNavigator } from './src/navigations/AppNavigator';


const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar/>
    
     <AppNavigator/>
    </View>
  );
};
export default App;

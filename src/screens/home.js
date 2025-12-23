import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { Login } from './Auth/Login/login';
import { AppNavigator } from '../navigations/AppNavigator';

export const Home = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* <Login /> */}
      <AppNavigator/>
    </View>
  );
};

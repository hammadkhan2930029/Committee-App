import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { AppNavigator } from '../navigations/AppNavigator';

export const Home = () => {
  return (
    <View style={{ flex: 1 }}>
      <AppNavigator/>
    </View>
  );
};

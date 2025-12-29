import React, { useState, useEffect } from 'react';
import { AuthNavigator } from './authNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChooseRole } from '../screens/ChooseRole/chooseRole';
import { AdminProfile } from '../screens/AdminProfile/adminProfile';
import { AdminEditProfile } from '../screens/AdminProfile/adminEditProfile';

import { Main } from '../screens/AdminScreens/main';
import { BottomTabNavigation } from './BottomTabs';
const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthStack" component={AuthNavigator} />
      <Stack.Screen name="ChooseRole" component={ChooseRole} />
      <Stack.Screen name="AdminProfile" component={AdminProfile} />
      <Stack.Screen name="AdminEditProfile" component={AdminEditProfile} />
      <Stack.Screen name="BottomTabNavigation" component={BottomTabNavigation} />

      
    </Stack.Navigator>
  );
};

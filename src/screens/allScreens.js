import React from 'react';
import { View } from 'react-native';
import { CustomButton } from '../components/customButton';

export const AllScreens = () => {
  return (
  <View>
    <CustomButton title='Login'/>
    <CustomButton title='forget'/>
    <CustomButton title='OTP'/>
    <CustomButton title='Register'/>
    <CustomButton title='Reset password'/>
    <CustomButton title='change password'/>
    <CustomButton title='choose Role'/>
    <CustomButton title='Admin profile'/>


  </View>
  )
};

import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { AppNavigator } from './src/navigations/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/navigations/navigationService';
import Toast from 'react-native-toast-message';
import { AppColors } from './src/constant/appColors';

const App = () => {
  const toastConfig = {
    customToast: ({ text1, text2, props }) => {
      const { bgColor, borderColor } = props;

      return (
        <View
          style={{
            height: 60,
            width: '90%',
            backgroundColor: bgColor,
            borderRadius: 10,
            padding: 15,
            borderLeftWidth: 6,
            borderLeftColor: borderColor,
          }}
        >
          <Text
            style={{
              color: AppColors.bodyText,
              fontWeight: 'bold',
              fontSize: 16,
            }}
          >
            {text1}
          </Text>

          <Text
            style={{
              color: AppColors.bodyText,
              fontSize: 14,
            }}
          >
            {text2}
          </Text>
        </View>
      );
    },
  };

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <AppNavigator />
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
};
export default App;

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, StatusBar, Image } from 'react-native';
import { AppColors } from '../../constant/appColors'; 
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppImages } from '../../constant/appImages';

export const Splash = () => {
  const navigation = useNavigation();
  

  const logoPosition = useSharedValue(-500);
  const contentOpacity = useSharedValue(0);


  useEffect(() => {
    logoPosition.value = withSpring(0, {
      damping: 12,
      stiffness: 90,
    });

    contentOpacity.value = withDelay(500, withTiming(1, { duration: 1000 }));

    const checkLogin = async () => {
      try {
        const userString = await AsyncStorage.getItem('user');
        console.log('RAW user from storage:', userString);

        let user = null;

        if (userString) {
          user = JSON.parse(userString);
        }

        setTimeout(() => {
          if (user && user.user_id) {
            navigation.replace('ChooseRole');
          } else {
            navigation.replace('Login');
          }
        }, 3000);
      } catch (e) {
        console.log('Storage error:', e);
        navigation.replace('Login');
      }
    };

    checkLogin();
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: logoPosition.value }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  return (
    <View style={styles.splashMain}>
      <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />

      <Animated.View style={[styles.splash_logo_view, logoStyle]}>
        <Image source={AppImages.profileAvatar} style={styles.logoImage} />
      </Animated.View>

      <Animated.View style={[styles.headings, textStyle]}>
        <Text style={styles.h1}>Committee App</Text>
        <Text style={styles.h4}>Manage your BC easily and securely</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  splashMain: {
    flex: 1,
    backgroundColor: AppColors.primary2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  splash_logo_view: {
    backgroundColor: '#fff',
    width: '50%',

    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 5,
  },
  logoImage: {
    width: '100%',
    elevation: 5,
    borderRadius: 90,
    borderWidth: 5,
    borderColor: AppColors.background,
  },
  headings: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  h1: {
    fontSize: moderateScale(24),
    color: AppColors.title,
    padding: 5,
    fontWeight: 'bold',
  },
  h4: {
    fontSize: moderateScale(18),
    color: AppColors.title,
    textAlign: 'center',
  },
});

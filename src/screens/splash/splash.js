import React, { useEffect } from 'react';
import { StyleSheet, View, Text,StatusBar } from 'react-native';
import { AppColors } from '../../constant/appColors'; // Aapki original theme
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  withDelay 
} from 'react-native-reanimated';

export const Splash = () => {
  const navigation = useNavigation();


  const logoPosition = useSharedValue(-500); 
  const contentOpacity = useSharedValue(0);  

  useEffect(() => {
  
    logoPosition.value = withSpring(0, {
      damping: 12,
      stiffness: 90
    });

    contentOpacity.value = withDelay(500, withTiming(1, { duration: 1000 }));

    const timer = setTimeout(() => {
      navigation.replace('Register');
    }, 3000);

    return () => clearTimeout(timer);
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
        <Text>Logo</Text>
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
    width: scale(120),
    height: verticalScale(120),
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
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
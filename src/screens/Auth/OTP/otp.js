import React from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TextBase,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { AppColors } from '../../../constant/appColors';
import { AppIcons } from '../../../constant/appIcons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { ScaledSheet } from 'react-native-size-matters';
import { OtpInput } from 'react-native-otp-entry';
import { CustomButton } from '../../../components/customButton';
import { useNavigation } from '@react-navigation/native';

export const OtpVerification = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.OTPContainer}>
      <StatusBar
        backgroundColor={AppColors.background}
        barStyle="dark-content"
      />

      <View style={styles.main}>
        <View style={styles.arrowBackView}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Image source={AppIcons.arrowBackColor} style={styles.arrowBack} />
          </TouchableOpacity>
        </View>

        <View style={styles.headingView}>
          <Text style={styles.h1}>OTP Verification</Text>
          <Text style={styles.h4}>
            Enter the 4-digit code sent to your number.
          </Text>
        </View>

        <View style={styles.view}>
          <Text style={styles.text1}>
            We’ve sent a code to{' '}
            <Text style={styles.link}>+92 300 1234567</Text>
          </Text>
        </View>

        <View style={styles.otpInput}>
          <OtpInput
            numberOfDigits={4}
            focusColor={AppColors.primary}
            autoFocus={false}
            hideStick={true}
            blurOnFilled={true}
            disabled={false}
            type="numeric"
            secureTextEntry={false}
            focusStickBlinkingDuration={500}
            onFocus={() => console.log('Focused')}
            onBlur={() => console.log('Blurred')}
            onTextChange={text => console.log(text)}
            onFilled={text => console.log(`OTP is ${text}`)}
            textInputProps={{
              accessibilityLabel: 'One-Time Password',
            }}
            textProps={{
              accessibilityRole: 'text',
              accessibilityLabel: 'OTP digit',
              allowFontScaling: false,
            }}
          />
        </View>
        <View style={styles.btn}>
          <CustomButton title="Verify Code" />
        </View>
        <View style={styles.reciveCode}>
          <Text style={styles.h4}>Didn’t receive the code?</Text>
          <Text style={styles.timer}>Resend code in 18s</Text>
        </View>
      </View>
    </View>
  );
};
const styles = ScaledSheet.create({
  OTPContainer: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  main: {
    margin: 10,
  },
  headingView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  h1: {
    fontSize: moderateScale(24),
    color: AppColors.primary,
    fontWeight: '700',
    padding: 5,
  },
  h4: {
    fontSize: moderateScale(16),
    color: AppColors.primary,
    opacity: 0.7,
    padding: 5,
  },
  arrowBackView: {
    marginTop: 20,
    padding: 10,
  },
  view: {
    padding: 10,
  },
  text1: {
    color: AppColors.bodyText,
    fontSize: moderateScale(16),
  },
  link: {
    color: AppColors.link,
  },
  otpInput: {
    padding: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  btn: {
    padding: 20,
  },
  reciveCode: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  timer: {
    padding: 10,
    fontSize: moderateScale(16),
    color: AppColors.bodyText,
    opacity: 0.6,
  },
});

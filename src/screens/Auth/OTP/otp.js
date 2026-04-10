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
import { useRoute } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { api } from '../../../services/api';
import Toast from 'react-native-toast-message';
import React, { useState, useEffect } from 'react';
import { Loader } from '../../Loader/loader';

export const OtpVerification = () => {


  const navigation = useNavigation();
  const route = useRoute();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { phone, userData, forgetPassData } = route.params;
  const [confirmation, setConfirmation] = useState(route.params.confirmation);

  console.log('user data :', userData)
  console.log('Phone :', phone)
  console.log('confirmation :', confirmation)
  console.log('forgetPassData :', forgetPassData)

  //-------------------------------------------------
  const [timer, setTimer] = useState(30);
  const [isResendActive, setIsResendActive] = useState(false);

  //-----------------Timer--------------------------------

  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else {
      setIsResendActive(true);
    }

    return () => clearInterval(interval);
  }, [timer]);

  //-------------------resend OTP-----------------------------

  const resendOTP = async () => {
    try {
      const newConfirmation = await auth().signInWithPhoneNumber(phone);

      // 🔥 confirmation update karo
      setConfirmation(newConfirmation);

      // timer reset
      setTimer(30);
      setIsResendActive(false);

      console.log("OTP Resent ✅");

    } catch (error) {
      console.log("Resend Error:", error);
    }
  };


  //--------------------User Register-----------------------------

  const register = async value => {
    setLoading(true);

    try {
      var formData = new FormData();
      formData.append('full_name', value.name);
      formData.append('phone', phone);
      formData.append('password', value.password);
      formData.append('confirm_password', value.confirmPassword);

      const res = await api.post('/user/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('response :', res?.data?.msg[0]?.response);
      if (res?.status === 200 && res?.data?.msg[0]?.response === 'register') {
        Toast.show({
          type: 'customToast',
          text1: 'Success',
          text2: res?.data?.msg[0]?.response || 'Successfully Registered',
          props: {
            bgColor: AppColors.background,
            borderColor: 'green',
          },
        });
        setTimeout(() => {
          navigation.navigate('Login');

          setLoading(false);
        }, 1000);
      } else {
        Toast.show({
          type: 'customToast',
          text1: 'Warning',
          text2: res?.data?.msg[0]?.response || 'User already exist',
          props: {
            bgColor: AppColors.background,
            borderColor: 'orange',
          },
        });
        navigation.goBack();

      }

      console.log('response :', res);
    } catch (error) {
      console.log('Try Catch Error :', error);
      Toast.show({
        type: 'customToast',
        text1: 'Error',
        text2:
          error?.response?.data?.message || 'Server error, please try again',
        props: {
          bgColor: AppColors.background,
          borderColor: '#ff5252',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  //----------------------Forget Password------------------------------

  const forgetPassword = async value => {

    console.log('reset:', value);

    setLoading(true);

    try {
      var formData = new FormData();
      formData.append('phone', phone);
      formData.append('new_password', value.newPassword);
      formData.append('confirm_password', value.confirmPassword);

      const res = await api.post('/user/forgot-password', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res?.data?.msg[0].response === 'password updated') {
        Toast.show({
          type: 'customToast',
          text1: 'Success',
          text2: res?.data?.msg[0].response,
          props: {
            bgColor: AppColors.background,
            borderColor: 'green',
          },
        });
        setTimeout(() => {
          navigation.navigate('Login');
          setLoading(false);

        }, 1500);
      } else {
        Toast.show({
          type: 'customToast',
          text1: 'Warning',
          text2: res?.data?.msg[0].response || 'Invalid credentials',
          props: {
            bgColor: AppColors.background,
            borderColor: 'orange',
          },
        });
        navigation.goBack();

      }

      console.log('response reset api :', res);
    } catch (error) {
      console.log('Try Catch error reset password :', error);
      Toast.show({
        type: 'customToast',
        text1: 'Error',
        text2:
          error?.response?.data?.message || 'Server error, please try again',
        props: {
          bgColor: AppColors.background,
          borderColor: '#ff5252',
        },
      });
    } finally {
      setLoading(false);

    }
  };

  //----------------------OTP verification----------------------------

  const verifyOTP = async () => {
    setLoading(true)
    try {

      if (!confirmation) {
        console.log("No confirmation object");
        return;
      }

      if (!otp || otp.length < 6) {
        Toast.show({
          type: 'customToast',
          text1: 'Error',
          text2: 'Please enter valid OTP',
        });
        setLoading(false);
        return;
      }

      await confirmation.confirm(otp);

      Toast.show({
        type: 'customToast',
        text1: 'Success',
        text2: 'OTP Verified ✅',
        props: {
          bgColor: AppColors.background,
          borderColor: 'green',
        },
      });

      if (userData) {
        register(userData);
      } else if (forgetPassData) {
        forgetPassword(forgetPassData)
      }

    } catch (error) {
      console.log("Invalid OTP ❌", error);
      Toast.show({
        type: 'customToast',
        text1: 'Error',
        text2: 'Invalid OTP',
        props: {
          bgColor: AppColors.background,
          borderColor: 'orange',
        },
      });
    } finally {
      setLoading(false)

    }
  };
  //---------------------------------------------
  return (
    <View style={styles.OTPContainer}>
      <StatusBar
        backgroundColor={AppColors.background}
        barStyle="dark-content"
      />

      <View style={styles.main}>
        <View style={styles.arrowBackView}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Icon name="arrow-back" size={24} color={AppColors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.headingView}>
          <Text style={styles.h1}>OTP Verification</Text>
          <Text style={styles.h4}>
            Enter the 6-digit code sent to your number.
          </Text>
        </View>

        <View style={styles.view}>
          <Text style={styles.text1}>
            We’ve sent a code to{' '}
            <Text style={styles.link}>{phone}</Text>
          </Text>
        </View>

        <View style={styles.otpInput}>
          <OtpInput
            numberOfDigits={6}
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
            onTextChange={(text) => setOtp(text)}
            onFilled={(text) => setOtp(text)}
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
          <CustomButton title="Verify Code" onPress={verifyOTP} />
        </View>
        <View style={styles.reciveCode}>

          <TouchableOpacity
            disabled={!isResendActive}
            onPress={resendOTP}
          >
            <Text style={styles.timer}>
              {isResendActive
                ? "Didn't receive code? Resend"
                : `You can resend code in ${timer} seconds`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Loader visible={loading} />
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

import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TextBase,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { AppColors } from '../../../constant/appColors';
import { AppIcons } from '../../../constant/appIcons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { ScaledSheet } from 'react-native-size-matters';
import { OtpInput } from 'react-native-otp-entry';
import { CustomButton } from '../../../components/customButton';
import { CustomInput } from '../../../components/customTextInput';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { api } from '../../../services/api';
import Toast from 'react-native-toast-message';
import { Loader } from '../../Loader/loader';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialIcons';

//-----------------------------------------------------

const resetPasswordSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(
      /^03[0-9]{9}$/,
      'Phone number must be a valid Pakistani number (11 digits, starting with 03)',
    )
    .required('Phone number is required'),

  newPassword: Yup.string()
    .min(6, 'Password kam az kam 6 characters ka ho')
    .required('Password required hai'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Password match nahi kar raha')
    .required('Confirm password required hai'),
});

//----------------------------------------------------
export const ResetPassword = () => {
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();

  //----------------------------------------------------
  const resetPassword = async value => {
    console.log('reset:', value);
    setLoader(true);
    try {
      var formData = new FormData();
      formData.append('phone', value.phone);
      formData.append('new_password', value.newPassword);
      formData.append('confirm_password', value.confirmPassword);

      const res = await api.post('/user/forgot-password', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res?.status === 200) {
        Toast.show({
          type: 'customToast',
          text1: 'Success',
          text2: res?.data?.message || 'Data successfully reset',
          props: {
            bgColor: AppColors.background,
            borderColor: 'green',
          },
        });
        navigation.goBack();
      } else {
        Toast.show({
          type: 'customToast',
          text1: 'Warning',
          text2: res.data.message || 'Invalid credentials',
          props: {
            bgColor: AppColors.background,
            borderColor: 'orange',
          },
        });
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
      setLoader(false);
    }
  };
  //----------------------------------------------------------

  return (
    <View style={styles.Container}>
      <StatusBar
        backgroundColor={AppColors.background}
        barStyle="dark-content"
      />
      <ScrollView>
        <View style={styles.main}>
          <View style={styles.arrowBackView}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="arrow-circle-left"
                size={28}
                color={AppColors.primary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.headingView}>
            <Text style={styles.h1}>Reset Password</Text>
            <Text style={styles.h4}>
              Enter your phone number to reset your password.
            </Text>
          </View>
          <View>
            <Formik
              initialValues={{
                phone: '',
                newPassword: '',
                confirmPassword: '',
              }}
              onSubmit={(values, { resetForm }) => {
                resetPassword(values);
                resetForm();
              }}
              validationSchema={resetPasswordSchema}
            >
              {({
                values,
                handleBlur,
                handleChange,
                handleSubmit,
                handleReset,
                touched,
                errors,
              }) => (
                <View>
                  <View>
                    <CustomInput
                      label="Phone Number"
                      type="numeric"
                      placeholder="Enter your phone number"
                      value={values.phone}
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      error={touched.phone && errors.phone}
                    />
                    <CustomInput
                      label="New Password"
                      type="password"
                      placeholder="Enter your new password"
                      value={values.newPassword}
                      onChangeText={handleChange('newPassword')}
                      onBlur={handleBlur('newPassword')}
                      error={touched.newPassword && errors.newPassword}
                    />
                    <CustomInput
                      label="Confirm Password"
                      type="password"
                      placeholder="Re-enter your password"
                      value={values.confirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      error={touched.confirmPassword && errors.confirmPassword}
                    />
                  </View>

                  <View style={styles.btn}>
                    <CustomButton
                      title="Reset Password"
                      onPress={handleSubmit}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>

          <View style={styles.reciveCode}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.h4}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Loader visible={loader} />
    </View>
  );
};
const styles = ScaledSheet.create({
  Container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  main: {
    margin: 15,
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
    textAlign: 'center',
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

  btn: {
    padding: 20,
  },
  reciveCode: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
});

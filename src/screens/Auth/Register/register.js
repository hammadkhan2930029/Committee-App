import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from 'react-native';
import { AppImages } from '../../../constant/appImages';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { ScaledSheet } from 'react-native-size-matters';
import { AppColors } from '../../../constant/appColors';
import { CustomInput } from '../../../components/customTextInput';
import { CustomButton } from '../../../components/customButton';
import { AppIcons } from '../../../constant/appIcons';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../../services/api';
import Toast from 'react-native-toast-message';
//-----------------------------------------
import * as Yup from 'yup';
import { Loader } from '../../Loader/loader';

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters long')
    .required('Name is required'),

  phone: Yup.string()
    .matches(
      /^03[0-9]{9}$/,
      'Phone number must be a valid Pakistani number (11 digits, starting with 03)',
    )
    .required('Phone number is required'),

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
});


//-----------------------------------------

export const Register = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  ///-------------------------------------------
  const register = async value => {
    setLoading(true);
    try {
      var formData = new FormData();
      formData.append('full_name', value.name);
      formData.append('phone', value.phone);
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
          text2: res?.data?.msg[0]?.response || 'Login successful',
          props: {
            bgColor: AppColors.background,
            borderColor: 'green',
          },
        });
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
  /// -----------------------------------------------

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.main}>
            <View>
              <ImageBackground
                source={AppImages.Rectangle}
                style={styles.RectangleImg}
                resizeMode="cover"
              >
                <View style={styles.backgroundInnerView}>
                  <TouchableOpacity
                    style={styles.arrowBTNView}
                    onPress={() => navigation.navigate('Login')}
                  >
                    <Image
                      source={AppIcons.arrowBack}
                      style={styles.backIcon}
                    />
                  </TouchableOpacity>
                  <View style={styles.headingsAlign}>
                    <Text style={styles.h1}>Create Account</Text>
                    <Text style={styles.h4}>
                      Sign up to start managing your committees
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </View>
            <Formik
              initialValues={{
                name: '',
                phone: '',
                password: '',
                confirmPassword: '',
              }}
              validationSchema={registerSchema}
              onSubmit={(values, { resetForm }) => {
                register(values);
                resetForm();
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <View>
                  <View style={styles.registerCard}>
                    <View>
                      <CustomInput
                        label="Name"
                        type="text"
                        placeholder="Enter your name"
                        value={values.name}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        error={touched.name && errors.name}
                      />

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
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        error={touched.password && errors.password}
                      />
                      <CustomInput
                        label="Confirm Password"
                        type="password"
                        placeholder="Re-enter your password"
                        value={values.confirmPassword}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        error={
                          touched.confirmPassword && errors.confirmPassword
                        }
                      />
                    </View>
                  </View>
                  <View style={styles.LoginBtn}>
                    <CustomButton title="Register" onPress={handleSubmit} />
                  </View>
                </View>
              )}
            </Formik>
            <View style={styles.continueLine}>
              <Image source={AppImages.VectorLine} />
              <Text style={styles.continueLine_text}>Or Continue With</Text>
              <Image source={AppImages.VectorLine} />
            </View>
            <View style={styles.socialIocns_View}>
              <Image source={AppIcons.apple} style={styles.socialIocns} />
              <Image source={AppIcons.facebook} style={styles.socialIocns} />
              <Image source={AppIcons.google} style={styles.socialIocns} />
            </View>
            <View style={styles.registerView}>
              <Text style={styles.registerText}>
                Already Have An Account ?{' '}
                <Text
                  style={styles.registerLink}
                  onPress={() => navigation.navigate('Login')}
                >
                  Login
                </Text>
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <Loader visible={loading} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  RectangleImg: {
    width: '100%',
    height: '250@vs',

    justifyContent: 'center',
  },
  main: {
    marginBottom: 20,
  },
  backgroundInnerView: {
    height: '150@vs',
  },
  headingsAlign: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  h1: {
    fontSize: moderateScale(24),
    color: AppColors.title,
    padding: 5,
    fontWeight: '700',
  },
  h4: {
    fontSize: moderateScale(18),
    color: AppColors.title,
    opacity: 0.7,
  },

  registerCard: {
    backgroundColor: '#fff',
    elevation: 5,
    width: '95%',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 10,
    marginTop: -45,
  },
  forgetView: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  forgetText: {
    color: AppColors.link,
    padding: 5,
    fontSize: moderateScale(14),
  },
  LoginBtn: {
    width: '95%',
    alignSelf: 'center',
    margin: 20,
    padding: 10,
  },
  continueLine: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  continueLine_text: {
    color: AppColors.bodyText,
    fontSize: moderateScale(14),
    padding: 5,
  },
  socialIocns_View: {
    margin: 10,
    width: '60%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  socialIocns: {
    width: '20%',
    resizeMode: 'contain',
  },
  registerView: {
    alignSelf: 'center',
  },
  registerText: {
    color: AppColors.bodyText,
    fontSize: moderateScale(14),
    padding: 10,
  },
  registerLink: {
    color: AppColors.link,
  },

  arrowBTNView: {
    width: '100%',
  },
  backIcon: {
    width: '20%',
    resizeMode: 'contain',
  },
});

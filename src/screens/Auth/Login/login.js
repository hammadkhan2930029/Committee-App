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
  Button,
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
import { Loader } from '../../Loader/loader';
import * as Yup from 'yup';
import { api } from '../../../services/api';
import Toast from 'react-native-toast-message';
//----------------------------------------------
const loginSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(
      /^03[0-9]{9}$/,
      'Phone number must be a valid Pakistani number (11 digits, starting with 03)',
    )
    .required('Phone number is required'),

  password: Yup.string()
    .min(6, 'Password kam az kam 6 characters ka ho')
    .required('Password required hai'),
});
//----------------------------------------------

export const Login = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  //-----------------------------------
  const loginUser = async value => {
    setLoading(true);
    try {
      var formData = new FormData();
      formData.append('phone',value.phone)
      formData.append('password',value.password)

    } catch (error) {
      console.log('Login try catch error', error);
    } finally {
      setLoading(false);
    }
  };
  //-----------------------------------

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* {isLoding && <Loader />} */}
      <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />
      {/* <TouchableOpacity>
        <Text style={{}}>loader</Text>
      </TouchableOpacity> */}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View>
              <ImageBackground
                source={AppImages.Rectangle}
                style={styles.RectangleImg}
                resizeMode="cover"
              >
                <Text style={styles.h1}>
                  Welcome Back <Image source={AppIcons.wavingHand} />
                </Text>
                <Text style={styles.h4}>Login to manage your committees</Text>
              </ImageBackground>
            </View>
            <Formik
              initialValues={{ phone: '', password: '' }}
              validationSchema={loginSchema}
              onSubmit={(values, { setSubmitting }) => {
                loginUser(values);
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
                  <View style={styles.loginCard}>
                    <View>
                      <CustomInput
                        label="phone"
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

                      <View style={styles.forgetView}>
                        <TouchableOpacity
                          onPress={() => navigation.navigate('Otp')}
                        >
                          <Text style={styles.forgetText}>
                            Forgot Password?
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View style={styles.LoginBtn}>
                    <CustomButton title="Login" onPress={handleSubmit} />
                  </View>
                </View>
                // </form>
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
                Don’t Have An Account?{' '}
                <Text
                  style={styles.registerLink}
                  onPress={() => navigation.navigate('Register')}
                >
                  Register
                </Text>
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Button title="Login" onPress={handleLogin} />
          <Loader visible={loading} />
        </View>
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
    alignItems: 'center',
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
  loginCard: {
    backgroundColor: '#fff',
    elevation: 5,
    width: '95%',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 10,
    marginTop: -35,
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
});

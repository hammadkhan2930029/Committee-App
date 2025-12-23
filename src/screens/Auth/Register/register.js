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

export const Register = () => {
  const navigation = useNavigation();

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
                email: '',
                phone: '',
                password: '',
                confirmPassword: '',
              }}
              validate={values => {
                const errors = {};
                if (!values.email) {
                  errors.email = 'Required';
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = 'Invalid email address';
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
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
                        onChangeText={handleChange}
                      />
                      <CustomInput
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        value={values.email}
                        onChangeText={handleChange}
                      />
                      <CustomInput
                        label="Phone Number"
                        type="numeric"
                        placeholder="Enter your phone number"
                        value={values.phone}
                        onChangeText={handleChange}
                      />

                      <CustomInput
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={values.password}
                        onChangeText={handleChange}
                      />
                      <CustomInput
                        label="Confirm Password"
                        type="password"
                        placeholder="Re-enter your password"
                        value={values.confirmPassword}
                        onChangeText={handleChange}
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

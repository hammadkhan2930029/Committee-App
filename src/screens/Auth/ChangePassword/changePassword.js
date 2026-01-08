import React from 'react';
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

export const ChangePassword = () => {
  const navigation = useNavigation();
  

  return (
    <View style={styles.Container}>
      <StatusBar
        backgroundColor={AppColors.background}
        barStyle="dark-content"
      />
      <ScrollView>
        <View style={styles.main}>
          <View style={styles.arrowBackView}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Image
                source={AppIcons.arrowBackColor}
                style={styles.arrowBack}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.headingView}>
            <Text style={styles.h1}>Change Password</Text>
            <Text style={styles.h4}>
              Update your account security
            </Text>
          </View>
          <View>
            <Formik
              initialValues={{
                CurrentPassword: '',
                newPassword: '',
                confirmPassword: '',
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
                handleBlur,
                handleChange,
                handleSubmit,
                handleReset,
                errors,
              }) => (
                <View>
                  <View>
                    <CustomInput
                      label="Current Password"
                      type="password"
                      placeholder="Enter your new current password"
                      value={values.CurrentPassword}
                      onChangeText={handleChange}
                      onBlur={handleBlur}
                    />
                    <CustomInput
                      label="New Password"
                      type="pasword"
                      placeholder="Enter your new password"
                      value={values.newPassword}
                      onChangeText={handleChange}
                      onBlur={handleBlur}
                    />
                    <CustomInput
                      label="Confirm Password"
                      type="password"
                      placeholder="Re-enter your password"
                      value={values.confirmPassword}
                      onChangeText={handleChange}
                      onBlur={handleBlur}
                    />
                  </View>

                  <View style={styles.btn}>
                    <CustomButton
                      title="Change Password"
                      onPress={handleSubmit}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>

         
        </View>
      </ScrollView>
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

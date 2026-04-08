import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { AppColors } from '../../../constant/appColors';
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
import { AppImages } from '../../../constant/appImages';

//-----------------------------------------------------

const resetPasswordSchema = Yup.object().shape({
  phone: Yup.string()
    // .matches(
    //   /^03[0-9]{9}$/,
    //   'Phone number must be a valid Pakistani number (11 digits, starting with 03)',
    // )
    .required('Phone number is required'),

  // newPassword: Yup.string()
  //   .min(6, 'Password kam az kam 6 characters ka ho')
  //   .required('Password required hai'),

  // confirmPassword: Yup.string()
  //   .oneOf([Yup.ref('newPassword')], 'Password match nahi kar raha')
  //   .required('Confirm password required hai'),
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
      // formData.append('new_password', value.newPassword);
      // formData.append('confirm_password', value.confirmPassword);

      const res = await api.post('/user/forgot-password', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('response', res.data.msg[0].response)
      if (res?.data?.code === 200) {
        Toast.show({
          type: 'customToast',
          text1: 'Success',
          text2: res?.data?.msg[0].response,
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
          text2: res?.data?.msg[0].response || 'Invalid credentials',
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
        backgroundColor={AppColors.primary}
        barStyle="light-content"
      />
      <ScrollView>
        {/* <View style={styles.header}>

          <View style={styles.arrowBackView}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="arrow-back"
                size={28}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.headingView}>
            <Text style={styles.h1}>Reset Password</Text>
            <Text style={styles.h4}>
              Enter your phone number to reset your password.
            </Text>
          </View>
        </View> */}
        <View>
          <ImageBackground
            source={AppImages.Rectangle}
            style={styles.RectangleImg}
            resizeMode="cover"
          >
            <View style={styles.backgroundInnerView}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backbtn}
              >
                <Icon
                  name="arrow-back"
                  size={28}
                  color={AppColors.title}
                />
              </TouchableOpacity>
              <View style={styles.headingsAlign}>
                <Text style={styles.h1}>Reset Password</Text>
                <Text style={styles.h4}>
                  Enter your phone number to reset your password.
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>



        <View style={styles.main}>

          <View style={styles.formView}>
            <Formik
              initialValues={{
                phone: '',

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
                    {/* <CustomInput
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
                    /> */}
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
  backbtn: {
    marginLeft: 15,
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
    opacity: 0.8,
  },
  formView: {
    borderRadius: 20,
    marginTop: 25,
    backgroundColor: "#fff",
    // margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,

    elevation: 5,
    width: '95%',
    alignSelf: 'center',
    // padding: 20,
    borderRadius: 10,
    marginTop: -35,

    elevation: 5
  },
  headingView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  h1: {
    fontSize: moderateScale(24),
    color: '#fff',
    fontWeight: '700',
    padding: 5,
  },
  h4: {
    fontSize: moderateScale(16),
    color: '#fff',
    opacity: 0.7,
    padding: 15,
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
  header: {
    backgroundColor: AppColors.primary,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50
  }
});

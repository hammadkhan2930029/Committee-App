import React, { useEffect, useState } from 'react';
import {
  Button,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { AppColors } from '../../constant/appColors';
import { AppIcons } from '../../constant/appIcons';
import { AppImages } from '../../constant/appImages';
import { CustomButton } from '../../components/customButton';
import { CustomInput } from '../../components/customTextInput';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../services/api';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import { Loader } from '../Loader/loader';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const screenWidth = Dimensions.get('window').width;



export const AdminEditProfile = ({ route }) => {
  const { user } = route.params;
  console.log('user :', user.full_name);
  const [userdata, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  //------------------local storage update data-----------------
  const updateUserInStorage = async updatedUser => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      console.log('User updated in AsyncStorage');
    } catch (e) {
      console.log('Storage update error:', e);
    }
  };

  //----------------------------------------------------------
  const editProfile = async value => {
    setIsLoading(true);
    try {
      var formData = new FormData();
      formData.append('full_name', value.fullName || user.full_name);
      formData.append('phone', value.phoneNumber || user.phone);
      formData.append('user_id', user.user_id);
      const res = await api.post('/user/edit-profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res?.data?.code === '200') {
        const updatedUser = {
          ...user,
          full_name: value.fullName || user.full_name,
          phone: value.phoneNumber || user.phone,
        };

        await updateUserInStorage(updatedUser);
        Toast.show({
          type: 'customToast',
          text1: 'Success',
          text2: res?.data?.msg?.[0].response || 'Profile updated',
          props: {
            bgColor: AppColors.background,
            borderColor: 'green',
          },
        });
      } else {
        Toast.show({
          type: 'customToast',
          text1: 'Warning',
          text2: res?.data?.msg?.[0].response || 'Something went wrong',
          props: {
            bgColor: AppColors.background,
            borderColor: 'orange',
          },
        });
      }
      navigation.goBack();
      console.log('edit profile response', res.data.code);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'customToast',
        text1: 'Error',
        text2:
          error?.response?.data?.msg?.[0]?.response ||
          'Server error, please try again',
        props: {
          bgColor: AppColors.background,
          borderColor: '#ff5252',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };
  //----------------------------------------------------------

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={AppColors.background}
        barStyle="dark-content"
      />
      <ScrollView>
        <View style={styles.arrowBackView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-circle-left"
              size={28}
              color={AppColors.link}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.profileView}>
          <Text style={styles.profile}>Edit Profile</Text>
        </View>
        <View style={styles.profileView}>
          <Image source={AppImages.profileAvatar} style={styles.profileImage} />
        </View>
        <View style={styles.nameView}>
          <Text style={styles.name}>{userdata?.full_name}</Text>
          <Text style={styles.admin}>Admin</Text>
        </View>
        <View style={styles.detailView}>
          <Formik
            initialValues={{
              fullName: user.full_name || '',
              phoneNumber: user.phone || '',
            }}
            onSubmit={(values, { resetForm }) => {
              editProfile(values);
              resetForm();
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
                    label="Full Name"
                    type="text"
                    placeholder={user.full_name}
                    value={values.fullName}
                    onChangeText={handleChange('fullName')}
                    onBlur={handleBlur('fullName')}
                  />
                  <CustomInput
                    label="Phone Number"
                    type="numeric"
                    placeholder={user.phone}
                    value={values.phoneNumber}
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                  />
                </View>

                <View style={styles.btn}>
                  <CustomButton title="Submit" onPress={handleSubmit} />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
      <Loader visible={isLoading} />
    </View>
  );
};
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  arrowBackView: {
    marginTop: 20,
    padding: 20,
  },

  profileView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile: {
    fontSize: moderateScale(24),
    color: AppColors.primary,
    fontWeight: '700',
    padding: 5,
  },
  profileView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: screenWidth * 0.45,
    height: screenWidth * 0.45,
    resizeMode: 'contain',
    borderColor: '#fff',
    borderWidth: 8,
    borderRadius: (screenWidth * 0.45) / 2,
    elevation: 3,

  },
  nameView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  name: {
    textAlign: 'center',
    fontSize: moderateScale(20),
    color: AppColors.bodyText,
  },
  admin: {
    textAlign: 'center',
    fontSize: moderateScale(16),
    color: AppColors.link,
  },
  detailView: {
    padding: 25,
  },
  detail: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: 8,
  },
  text1: {
    fontSize: moderateScale(18),
    color: AppColors.focusText,
    fontWeight: '600',
  },
  text2: {
    fontSize: moderateScale(18),
    color: AppColors.bodyText,
  },
  BtnView: {
    width: '70%',
    alignSelf: 'center',
  },
  button: {
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
    backgroundColor: AppColors.background,
    marginTop: 10,
    borderColor: AppColors.primary,
    borderWidth: 1,
  },
  text: {
    color: AppColors.link,
    fontWeight: 'bold',
    fontSize: moderateScale(14),
  },
  btn: {
    marginTop: 15,
  },
});

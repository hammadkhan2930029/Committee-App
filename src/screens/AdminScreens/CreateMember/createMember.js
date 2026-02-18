import React, { useState, useCallback } from 'react';
import {
  View,
  StatusBar,
  ImageBackground,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { AppColors } from '../../../constant/appColors';
import { AppImages } from '../../../constant/appImages';
import { AppIcons } from '../../../constant/appIcons';
import { CustomButton } from '../../../components/customButton';
import { Formik } from 'formik';
import { CustomInputWithIcon } from '../../../components/customInputWithIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getStoredUser } from '../../../Utils/getUser';
import { api } from '../../../services/api';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import { Loader } from '../../Loader/loader';
//-----------------------------------------------------------------
const membersSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'Name kam az kam 3 characters ka ho')
    .required('Name required hai'),

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
//------------------------------------------------------------------

export const CreateMembers = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  //-------------------get user data---------------------------

  useFocusEffect(
    useCallback(() => {
      const loadUser = async () => {
        const user = await getStoredUser();
        if (user) {
          setUserData(user);
          console.log(user.full_name, user.user_id);
        }
      };
      loadUser();
    }, []),
  );
  //-----------------------------------------
  const createMembers = async value => {
    setLoading(true);
    try {
      var formData = new FormData();
      formData.append('full_name', value.fullName);
      formData.append('phone', value.phone);
      formData.append('password', value.password);
      formData.append('user_id', userData.user_id);

      const response = await api.post('/user/create-user', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const msg = response?.data?.msg?.[0];
      if (response.status === 200 && typeof msg === 'object' && msg.status) {
        Toast.show({
          type: 'customToast',
          text1: 'Success',
          text2: msg.status,
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
          text2: typeof msg === 'string' ? msg : 'User already exists',
          props: {
            bgColor: AppColors.background,
            borderColor: 'orange',
          },
        });
      }
    } catch (error) {
      console.log('try catch error', error);
      Toast.show({
        type: 'customToast',
        text1: 'Error',
        text2: 'Server error, please try again',
        props: {
          bgColor: AppColors.background,
          borderColor: '#ff5252',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />

      <ScrollView style={styles.scrollView}>
        <View>
          <ImageBackground
            source={AppImages.Rectangle}
            style={styles.RectangleImg}
          >
            <View style={styles.main}>
              <View style={styles.TopView}>
                <View style={styles.backAndText}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>


                    <Icon
                      name="arrow-circle-left"
                      size={28}
                      color={AppColors.title}
                    />
                  </TouchableOpacity>
                  <Text style={styles.h1}>Create Member</Text>
                </View>
              </View>
              <View style={styles.textView}>
                <Text style={styles.h4}>Fill in the details to</Text>
                <Text style={styles.h4}>start a new committee</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View>
          <Formik
            initialValues={{
              fullName: '',
              phone: '',
              password: '',
            }}
            validationSchema={membersSchema}
            onSubmit={(values, { resetForm }) => {
              createMembers(values);
              resetForm();
            }}
          >
            {({
              values,
              errors,
              handleBlur,
              handleSubmit,
              handleChange,
              setFieldValue,
              touched,
            }) => (
              <View style={styles.createCommitteForm}>
                <CustomInputWithIcon
                  label="Enter full name"
                  placeholder="Enter full name"
                  type="text"
                  value={values.fullName}
                  onChangeText={handleChange('fullName')}
                  onblur={handleBlur('fullName')}
                  error={touched.fullName && errors.fullName}
                />

                <CustomInputWithIcon
                  label="Phone Number"
                  placeholder="+92 300 1234567"
                  type="numeric"
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  onblur={handleBlur('phone')}
                  error={touched.phone && errors.phone}
                />

                <CustomInputWithIcon
                  label="Password"
                  placeholder="Set user password"
                  type="password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onblur={handleBlur('password')}
                  error={touched.password && errors.password}
                  rightIcon={
                    <Icon name="remove-red-eye" size={20} color="#666" />
                  }
                />

                <View style={styles.btnView}>
                  <CustomButton title="Create member" onPress={handleSubmit} />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
      <Loader visible={loading} />
    </View>
  );
};
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },

  arrowBack: {
    width: 28,
    height: 28,
  },
  RectangleImg: {
    width: '100%',
    height: '240@vs',
    resizeMode: 'contain',
  },
  TopView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5,
    alignSelf: 'center',
    width: '100%',
    padding: 20,
    marginTop: 20,
  },
  backAndText: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  h1: {
    fontSize: moderateScale(24),
    color: AppColors.title,
    fontWeight: '600',
    paddingLeft: 6,
  },

  textView: {
    padding: 20,
  },

  h4: {
    color: AppColors.title,
    fontSize: moderateScale(16),
    opacity: 0.9,
    padding: 5,
  },
  //--------------------------
  createCommitteForm: {
    padding: 15,
    marginTop: -30,
  },
  label: {
    marginBottom: '5@ms',
    fontSize: '14@ms',
    color: '#333',
  },
  dropDown: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: '10@ms',
    backgroundColor: '#f7f4f4ff',
    paddingHorizontal: '10@ms',
  },
  button: {
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
    backgroundColor: AppColors.cardLight,
    borderWidth: 1,
    borderColor: AppColors.primary,
  },
  text: {
    color: AppColors.primary,
    fontWeight: 'bold',
  },
  btnView: {
    width: '80%',
    alignSelf: 'center',
    padding: 10,
  },
});

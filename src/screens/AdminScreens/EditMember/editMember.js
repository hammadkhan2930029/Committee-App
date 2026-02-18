import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { AppColors } from '../../../constant/appColors';
import { AppImages } from '../../../constant/appImages';
import { AppIcons } from '../../../constant/appIcons';
import { CustomButton } from '../../../components/customButton';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CustomInputWithIcon } from '../../../components/customInputWithIcon';
import { Formik } from 'formik';
import { api } from '../../../services/api';
import { Loader } from '../../Loader/loader';
import Toast from 'react-native-toast-message';

export const EditMember = ({ route }) => {
  //--------------------------------------------
  const { item } = route.params;
  console.log('edite members :', item.user_id);
  const userID = item.user_id;
  const [rounds, setRounds] = useState(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  //--------------------------------------------
  const editMember = async value => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('full_name', value.fullName || item.name);
      formData.append('phone', value.phone || item.phone);
      formData.append('user_id', userID);

      const response = await api.post('/user/edit-user', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const result = response.data.msg[0];
      console.log('edit member data :', result.response);
      if (result.response === 'user updated') {
        Toast.show({
          type: 'customToast',
          text1: 'Success',
          text2: result.response,
          props: {
            bgColor: AppColors.background,
            borderColor: 'green',
          },
        });
        navigation.pop(2);
        setLoading(false);
      } else {
        Toast.show({
          type: 'customToast',
          text1: 'Warning',
          text2: result.response,
          props: {
            bgColor: AppColors.background,
            borderColor: 'orange',
          },
        });
      }
    } catch (error) {
      console.log(error);
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
      <ScrollView>
        <View>
          <ImageBackground
            source={AppImages.Rectangle2}
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
                  <Text style={styles.h1}>Edit Member</Text>
                </View>
              </View>
              <View style={styles.textView}>
                <Text style={styles.h4}>Update user information below.</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <Formik
          initialValues={{
            fullName: item.name || '',
            phone: item.phone || '',
          }}
          onSubmit={values => {
            editMember(values);
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit }) => (
            <View>
              <View style={styles.textInput}>
                <CustomInputWithIcon
                  label="Full Name"
                  placeholder={item.name}
                  type="text"
                  value={values.fullName}
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  rightIcon={<Icon name="edit" size={20} color="#666" />}
                />
                <CustomInputWithIcon
                  label="Phone Number"
                  placeholder={item.phone}
                  type="numeric"
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  rightIcon={<Icon name="edit" size={20} color="#666" />}
                />
              </View>

              <View style={styles.buttons}>
                <View style={styles.btnView}>
                  <CustomButton title="Save Changes" onPress={handleSubmit} />
                </View>
              </View>
            </View>
          )}
        </Formik>
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
    height: 200,
    resizeMode: 'contain',
  },
  TopView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5,
    alignSelf: 'center',
    width: '100%',
    padding: 15,
    marginTop: 20,
  },
  backAndText: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // padding: 10,
  },
  h1: {
    fontSize: moderateScale(24),
    color: AppColors.title,
    fontWeight: '600',
    marginLeft: 6,
  },

  textView: {
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },

  h4: {
    color: AppColors.title,
    fontSize: moderateScale(16),
    opacity: 0.9,
    padding: 3,
  },

  buttons: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnView: {
    width: '50%',
    margin: 5,
  },
  label: {
    marginBottom: '5@ms',
    fontSize: '14@ms',
    color: '#333',
  },

  textInput: {
    width: '100%',
    padding: 15,
  },
});

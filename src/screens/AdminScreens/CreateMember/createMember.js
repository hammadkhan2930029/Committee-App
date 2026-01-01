import React, { useState } from 'react';
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
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import DropDownPicker from 'react-native-dropdown-picker';
import { navigate } from '../../../navigations/navigationService';
import { useNavigation } from '@react-navigation/native';

export const CreateMembers = () => {
    const navigation = useNavigation()
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(null);

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };
  //---------------------------------
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Pending', value: 'pending' },
  ]);

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
                  <TouchableOpacity onPress={()=> navigation.goBack()}>
                    <Image
                      source={AppIcons.arrowBack}
                      style={styles.arrowBack}
                    />
                  </TouchableOpacity>
                  <Text style={styles.h1}>Create Member</Text>
                </View>
              </View>
              <View style={styles.textView}>
                <Text style={styles.h4}>
                  Fill in the details to 
                </Text>
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
          >
            {({
              values,
              errors,
              handleBlur,
              handleSubmit,
              handleChange,
              setFieldValue,
            }) => (
              <View style={styles.createCommitteForm}>
                <CustomInputWithIcon
                  label="Total Members"
                  placeholder="Enter full name"
                  type="text"
                  value={values.fullName}
                  onChangeText={handleChange}
                />

                <CustomInputWithIcon
                  label="Phone Number"
                  placeholder="+92 300 1234567"
                  type="numeric"
                  value={values.phone}
                  onChangeText={handleChange}
                />

                <CustomInputWithIcon
                  label="Password"
                  placeholder="Set user password"
                  type="password"
                  value={values.password}
                  onChangeText={handleChange}
                  rightIcon={<Icon name="remove-red-eye" size={20} color="#666" />}
                />

                
                <View style={styles.btnView}>
                  <CustomButton title="Create User" onPress={handleSubmit} />
                </View>
                
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
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
    paddingLeft: 10,
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
  btnView:{
    width:'80%',
    alignSelf:'center',
    padding:10
  }
});

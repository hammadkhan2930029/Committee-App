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
import { useNavigation } from '@react-navigation/native';
import { CustomButtonLight } from '../../../components/customeButtonLight';

export const EditCommittee = ({ route }) => {
  const { details } = route.params;
  console.log('edit :',details)
  const navigation = useNavigation();
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
            source={AppImages.Rectangle2}
            style={styles.RectangleImg}
          >
            <View style={styles.main}>
              <View style={styles.TopView}>
                <View style={styles.backAndText}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                      source={AppIcons.arrowBack}
                      style={styles.arrowBack}
                    />
                  </TouchableOpacity>
                  <Text style={styles.h1}>Edit Committee</Text>
                </View>
              </View>
              <View style={styles.textView}>
                <Text style={styles.h4}>
                  Fill in the details to start a new committee
                </Text>
                <Text style={styles.h4}>start a new committee</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View>
          <Formik
            initialValues={{
              totalMembers: '',
              totalRounds: '',
              roundsPerMonth: '',
              noOfMonths: '',
              amountPerMember: '',
              totalAmount: '',
              startDate: '',
              status: '',
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
                  placeholder="Enter total members"
                  type="numeric"
                  value={values.totalMembers}
                  onChangeText={handleChange}
                  rightIcon={<Icon name="edit" size={20} color="#666" />}
                />

                <CustomInputWithIcon
                  label="Total Rounds"
                  placeholder="Enter total rounds"
                  type="numeric"
                  value={values.totalRounds}
                  onChangeText={handleChange}
                  rightIcon={<Icon name="edit" size={20} color="#666" />}
                />

                <CustomInputWithIcon
                  label="Rounds Per Month"
                  placeholder="Enter rounds per month"
                  type="numeric"
                  value={values.roundsPerMonth}
                  onChangeText={handleChange}
                  rightIcon={<Icon name="edit" size={20} color="#666" />}
                />

                <CustomInputWithIcon
                  label="No. Of Months"
                  placeholder="Enter number of months"
                  type="numeric"
                  value={values.noOfMonths}
                  onChangeText={handleChange}
                  rightIcon={<Icon name="edit" size={20} color="#666" />}
                />

                <CustomInputWithIcon
                  label="Amount Per Member"
                  placeholder="Enter amount per member"
                  type="numeric"
                  value={values.amountPerMember}
                  onChangeText={handleChange}
                  rightIcon={<Icon name="edit" size={20} color="#666" />}
                />

                <CustomInputWithIcon
                  label="Total Amount"
                  placeholder="Calculated automatically"
                  type="numeric"
                  value={values.totalAmount}
                  onChangeText={handleChange}
                  rightIcon={<Icon name="edit" size={20} color="#666" />}
                />
                <View>
                  <CustomInputWithIcon
                    label="Select Date"
                    type="date"
                    placeholder="Pick start date"
                    value={date ? dayjs(date).format('DD-MM-YYYY') : ''}
                    rightIcon={
                      <Icon name="calendar-today" size={22} color="#666" />
                    }
                    onRightIconPress={() => setShow(true)}
                  />

                  {show && (
                    <DateTimePicker
                      value={date || new Date()}
                      mode="date"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      onChange={onChange}
                    />
                  )}
                </View>
                <View>
                  <CustomInputWithIcon
                    label="Due on"
                    type="date"
                    placeholder="Pick Due date"
                    value={date ? dayjs(date).format('DD-MM-YYYY') : ''}
                    rightIcon={
                      <Icon name="calendar-today" size={22} color="#666" />
                    }
                    onRightIconPress={() => setShow(true)}
                  />

                  {show && (
                    <DateTimePicker
                      value={date || new Date()}
                      mode="date"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      onChange={onChange}
                    />
                  )}
                </View>
                <View>
                  <Text style={styles.label}>Status</Text>
                  <DropDownPicker
                    open={open}
                    items={items}
                    setOpen={setOpen}
                    value={values.status}
                    setValue={val => setFieldValue('status', val)}
                    setItems={setItems}
                    placeholder="Select Status"
                    style={styles.dropDown}
                    dropDownContainerStyle={{
                      borderColor: '#ccc',
                      borderRadius: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: '10@ms',
                      backgroundColor: '#f7f4f4ff',
                      paddingHorizontal: '10@ms',
                    }}
                    listMode="SCROLLVIEW"
                    ArrowDownIconComponent={({ style }) => (
                      <Icon name="arrow-drop-down" size={24} color="#666" />
                    )}
                    ArrowUpIconComponent={({ style }) => (
                      <Icon name="arrow-drop-up" size={24} color="#666" />
                    )}
                  />
                </View>
                <View style={styles.btnView}>
                  <CustomButton title="Save Changes" onPress={handleSubmit} />
                </View>
                <View style={styles.btnView}>
                  <CustomButtonLight title="Cancel" />
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
    padding: 10,
  },
  h1: {
    fontSize: moderateScale(24),
    color: AppColors.title,
    fontWeight: '600',
    paddingLeft: 10,
  },

  textView: {
    padding: 15,
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

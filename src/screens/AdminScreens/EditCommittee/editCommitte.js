import React, { useEffect, useState } from 'react';
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
import { api } from '../../../services/api';
import Toast from 'react-native-toast-message';
import { string } from 'yup';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  due_on: Yup.number()
    .typeError('Only numbers allowed')
    .required('Due date is required')
    .min(1, 'Minimum value is 1')
    .max(31, 'Maximum value is 31'),
});
export const EditCommittee = ({ route }) => {
  const { details, start, due } = route.params;
  console.log('edit :', details);
  console.log('start :', start);
  console.log('due :', due);

  const navigation = useNavigation();
  //------------------------------------
  const [showDue, setShowDue] = useState(false);
  const [dateDue, setDateDue] = useState(null);
  //------------------------------------
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(null);

  //---------------------------------
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Active', value: 1 },
    { label: 'Inactive', value: 2 },
    { label: 'Pending', value: 0 },
  ]);
  //-----------start date-------------

  const onChange = (event, selectedDate, setFieldValue) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
      setFieldValue('start', dayjs(selectedDate).format('YYYY-MM-DD'));
    }
  };

  //--------------due date---------------------

  const onChangeDue = (event, selectedDate, setFieldValue) => {
    setShowDue(false);
    if (selectedDate) {
      setDateDue(selectedDate);
      setFieldValue('due_on', dayjs(selectedDate).format('YYYY-MM-DD'));
    }
  };
  //------------------------------------------------------
  const formatNumber = value => {
    if (!value) return '';
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  //---------------------------------------------------------
  const removeCommas = value => value.replace(/,/g, '');

  //-----------------------------------------------------------
  const statusMap = {
    Active: 1,
    Inactive: 2,
    Pending: 0,
  };
  //--------------------------------------------------------
  console.log('committe ID :', details.committee_id);
  //---------------------------------------------------------
  const editCommittee = async value => {
    console.log('status :', value);
    try {
      var formData = new FormData();

      //=====================================================================

      formData.append('committee_id', String(value.committee_id));
      formData.append('name', value.committeeName || details.name);

      formData.append(
        'total_member',
        value.totalMembers || details.total_member,
      );

      formData.append(
        'total_rounds',
        value.totalRounds || details.total_rounds,
      );

      formData.append(
        'rounds_per_month',
        value.roundsPerMonth || details.rounds_per_month,
      );

      formData.append('no_of_month', value.noOfMonths || details.no_of_month);

      formData.append(
        'amount_per_member',
        value.amountPerMember || details.amount_per_member,
      );

      formData.append('total', value.totalAmount || details.total);

      formData.append('start_date', value.start || start);

      formData.append('due_on', value.due_on || due);

      formData.append('status', value.status);
      console.log('Form data :', formData);

      const response = await api.post(
        `/user/edit-committee/${details.committee_id}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
      const data = response?.data?.msg[0];
      console.log('Data :', response);

      if (data.response) {
        Toast.show({
          type: 'customToast',
          text1: 'Success',
          text2:
            typeof data.response === 'string'
              ? data.response
              : 'Committee updated successfully!',
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
          text2: 'something error',
          props: {
            bgColor: AppColors.background,
            borderColor: 'orange',
          },
        });
      }
      console.log('edit committee response : ', response?.data?.msg[0]);
    } catch (error) {
      console.log('API ERROR MESSAGE:', error);
      Toast.show({
        type: 'customToast',
        text1: 'Error',
        text2: 'Server error',
        props: {
          bgColor: AppColors.background,
          borderColor: '#ff5252',
        },
      });
    }
  };

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
                    <Icon
                      name="arrow-circle-left"
                      size={28}
                      color={AppColors.title}
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
            enableReinitialize
            initialValues={{
              committee_id: details.committee_id,
              committeeName: details.name || '',
              totalMembers: details.total_member || '',
              totalRounds: details.total_rounds || '',
              roundsPerMonth: details.rounds_per_month || '',
              noOfMonths: details.no_of_month || '',
              amountPerMember: details.amount_per_member || '',
              totalAmount: details.total || '',
              start: start || '',
              due_on: due || '',
              status: statusMap[details.status] ?? null,
            }}
            onSubmit={values => {
              editCommittee(values);
            }}
          >
            {({
              values,
              touched,
              errors,
              handleBlur,
              handleSubmit,
              handleChange,
              setFieldValue,
            }) => {
              return (
                <View style={styles.createCommitteForm}>
                  <CustomInputWithIcon
                    label="Name"
                    placeholder={details.name}
                    type="text"
                    value={values.committeeName}
                    onChangeText={handleChange('committeeName')}
                    onblur={handleBlur('committeeName')}
                    rightIcon={<Icon name="edit" size={20} color="#666" />}
                  />
                  <CustomInputWithIcon
                    label="Total Members"
                    placeholder={details.total_member}
                    type="numeric"
                    value={values.totalMembers}
                    onChangeText={text => {
                      setFieldValue('totalMembers', text);

                      const total =
                        Number(text) * Number(values.amountPerMember || 0);

                      setFieldValue('totalAmount', total.toString());
                    }}
                    onblur={handleBlur('totalMembers')}
                    rightIcon={<Icon name="edit" size={20} color="#666" />}
                  />

                  <CustomInputWithIcon
                    label="Total Rounds"
                    placeholder={details.total_rounds}
                    type="numeric"
                    value={values.totalRounds}
                    onChangeText={handleChange('totalRounds')}
                    onblur={handleBlur('totalRounds')}
                    rightIcon={<Icon name="edit" size={20} color="#666" />}
                  />

                  <CustomInputWithIcon
                    label="Rounds Per Month"
                    placeholder={details.rounds_per_month}
                    type="numeric"
                    value={values.roundsPerMonth}
                    onChangeText={handleChange('roundsPerMonth')}
                    onblur={handleBlur('roundsPerMonth')}
                    rightIcon={<Icon name="edit" size={20} color="#666" />}
                  />

                  <CustomInputWithIcon
                    label="No. Of Months"
                    placeholder={details.no_of_month}
                    type="numeric"
                    value={values.noOfMonths}
                    onChangeText={handleChange('noOfMonths')}
                    onblur={handleBlur('noOfMonths')}
                    rightIcon={<Icon name="edit" size={20} color="#666" />}
                  />

                  <CustomInputWithIcon
                    label="Amount Per Member"
                    placeholder={formatNumber(details.amount_per_member)}
                    type="numeric"
                    value={formatNumber(values.amountPerMember)}
                    onChangeText={text => {
                      const raw = removeCommas(text);

                      if (!isNaN(raw)) {
                        setFieldValue('amountPerMember', raw);

                        const total =
                          Number(values.totalMembers || 0) * Number(raw);

                        setFieldValue('totalAmount', total.toString());
                      }
                    }}
                    onblur={handleBlur('amountPerMember')}
                    rightIcon={<Icon name="edit" size={20} color="#666" />}
                  />

                  <CustomInputWithIcon
                    label="Total Amount"
                    placeholder={formatNumber(details.total)}
                    type="numeric"
                    editable={false}
                    value={formatNumber(values.totalAmount)}
                    onChangeText={handleChange('totalAmount')}
                    onblur={handleBlur('totalAmount')}
                    rightIcon={<Icon name="edit" size={20} color="#666" />}
                  />
                  {/* ---------------------------------------------------------- */}

                  <View>
                    <CustomInputWithIcon
                      label="Select Date"
                      type="date"
                      placeholder={start}
                      value={date ? dayjs(date).format('DD-MM-YYYY') : start}
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
                        onChange={(event, selectedDate) =>
                          onChange(event, selectedDate, setFieldValue)
                        }
                      />
                    )}
                  </View>
                  {/* ---------------------------------------------------------- */}
                  <View>
                  
                    <CustomInputWithIcon
                      label="Due on"
                      type="numeric"
                      maxLength={2}
                      placeholder={due}
                      value={values.due_on}
                      onChangeText={text => {
                        const numericValue = text.replace(/[^0-9]/g, '');

                        if (numericValue === '') {
                          setFieldValue('due_on', '');
                          return;
                        }

                        const number = parseInt(numericValue, 10);

                        if (number >= 1 && number <= 31) {
                          setFieldValue('due_on', numericValue);
                        }
                      }}
                      onblur={handleBlur('due_on')}
                      error={touched.due_on && errors.due_on}
                    />
                  </View>

                  <View>
                    <Text style={styles.label}>Status</Text>
                    <DropDownPicker
                      open={open}
                      items={items}
                      setOpen={setOpen}
                      value={values.status}
                      // setValue={val => setFieldValue('status', val)}
                      setValue={callback => {
                        const selectedValue = callback(values.status);
                        setFieldValue('status', selectedValue);
                      }}
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
              );
            }}
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
    // padding: 10,
  },
  h1: {
    fontSize: moderateScale(24),
    color: AppColors.title,
    fontWeight: '600',
    paddingLeft: 6,
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

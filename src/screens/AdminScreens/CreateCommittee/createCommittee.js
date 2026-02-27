import React, { useState, useEffect, useCallback } from 'react';
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
import { CustomInput } from '../../../components/customTextInput';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import DropDownPicker from 'react-native-dropdown-picker';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Loader } from '../../Loader/loader';
import { getStoredUser } from '../../../Utils/getUser';
import { api } from '../../../services/api';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  due_on: Yup.number()
    .typeError('Only numbers allowed')
    .required('Due date is required')
    .min(1, 'Minimum value is 1')
    .max(31, 'Maximum value is 31'),
});
export const CreateCommittee = () => {
  const navigation = useNavigation();
  //------------------------------------
  const [showDue, setShowDue] = useState(false);
  const [dateDue, setDateDue] = useState(null);
  //------------------------------------
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(null);
  //------------------------------------
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState();
  //-----------------get data--------------------

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
  //-----------start date-------------

  const onChange = (event, selectedDate, setFieldValue) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
      setFieldValue('startDate', dayjs(selectedDate).format('YYYY-MM-DD'));
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
  //---thousand separator---only display ke liye-------
  const formatNumber = value => {
    if (!value) return '';
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  //---- User input se commas remove karne ke liye-------
  const removeCommas = value => value.replace(/,/g, '');

  //--------------------api--------------------------
  const createCommittee = async value => {
    setLoading(true);
    try {
      var formData = new FormData();
      formData.append('user_id', userData.user_id);
      formData.append('name', value.committeeName);
      formData.append('total_member', value.totalMembers);
      formData.append('total_rounds', value.totalRounds);
      formData.append('rounds_per_month', value.roundsPerMonth);
      formData.append('no_of_month', value.noOfMonths);
      formData.append('amount_per_member', value.amountPerMember);
      formData.append('total', value.totalAmount);
      formData.append('start_date', value.startDate);
      formData.append('due_on', value.due_on);

      const response = await api.post('/user/create-committee', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const msg = response?.data?.msg?.[0];
      if (response.status === 200) {
        Toast.show({
          type: 'customToast',
          text1: 'Success',
          text2: msg.response,
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
      console.log('create committee :', msg.response);
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
                  <Text style={styles.h1}>Create Committee</Text>
                </View>
              </View>
              <View style={styles.textView}>
                <Text style={styles.h4}>
                  Fill in the details to start a new committee.
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        {/* ------------------------------------------------------------ */}
        <View>
          <Formik
            initialValues={{
              committeeName: '',
              totalMembers: '',
              totalRounds: '',
              roundsPerMonth: '',
              noOfMonths: '',
              amountPerMember: '',
              totalAmount: '',
              startDate: '',
              due_on: '',
            }}
            onSubmit={(values, { resetForm }) => {
              createCommittee(values);
              // resetForm();
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
            }) => {
              useEffect(() => {
                if (values.totalMembers && values.amountPerMember) {
                  const total =
                    Number(values.totalMembers) *
                    Number(values.amountPerMember);

                  setFieldValue('totalAmount', total.toString());
                }
              }, [values.totalMembers, values.amountPerMember]);

              return (
                <View style={styles.createCommitteForm}>
                  <CustomInput
                    label="Committee Name"
                    placeholder="Enter committee name"
                    type="text"
                    value={values.committeeName}
                    onChangeText={handleChange('committeeName')}
                    onblur={handleBlur('committeeName')}
                    error={touched.committeeName && errors.committeeName}
                  />
                  <CustomInput
                    label="Total Members"
                    placeholder="Enter total members"
                    type="numeric"
                    value={values.totalMembers}
                    onChangeText={handleChange('totalMembers')}
                    onblur={handleBlur('totalMembers')}
                    error={touched.totalMembers && errors.totalMembers}
                  />

                  <CustomInput
                    label="Total Rounds"
                    placeholder="Enter total rounds"
                    type="numeric"
                    value={values.totalRounds}
                    onChangeText={handleChange('totalRounds')}
                    onblur={handleBlur('totalRounds')}
                    error={touched.totalRounds && errors.totalRounds}
                  />

                  <CustomInput
                    label="Round(s) Per Month"
                    placeholder="Enter rounds per month"
                    type="numeric"
                    value={values.roundsPerMonth}
                    onChangeText={handleChange('roundsPerMonth')}
                    onblur={handleBlur('roundsPerMonth')}
                    error={touched.roundsPerMonth && errors.roundsPerMonth}
                  />

                  <CustomInput
                    label="No. Of Months"
                    placeholder="Enter number of months"
                    type="numeric"
                    value={values.noOfMonths}
                    onChangeText={handleChange('noOfMonths')}
                    onblur={handleBlur('noOfMonths')}
                    error={touched.noOfMonths && errors.noOfMonths}
                  />

                  <CustomInput
                    label="Amount Per Member"
                    placeholder="Enter amount per member"
                    type="numeric"
                    value={formatNumber(values.amountPerMember)}
                    onChangeText={text => {
                      const rawValue = removeCommas(text);
                      if (!isNaN(rawValue)) {
                        setFieldValue('amountPerMember', rawValue);
                      }
                    }}
                    onblur={handleBlur('amountPerMember')}
                    error={touched.amountPerMember && errors.amountPerMember}
                  />

                  <CustomInput
                    label="Total Amount"
                    placeholder="Calculated automatically"
                    type="numeric"
                    value={formatNumber(values.totalAmount)}
                    editable={false}
                    onChangeText={handleChange('totalAmount')}
                    onblur={handleBlur('totalAmount')}
                    error={touched.totalAmount && errors.totalAmount}
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
                        onChange={(event, selectedDate) =>
                          onChange(event, selectedDate, setFieldValue)
                        }
                      />
                    )}
                  </View>
                  <View>
                    <CustomInputWithIcon
                      label="Due on"
                      type="numeric"
                      maxLength={2}
                      placeholder="Enter due date"
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

                  <View style={{ padding: 20 }}>
                    <CustomButton
                      title="Create Committee"
                      onPress={handleSubmit}
                    />
                  </View>
                </View>
              );
            }}
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
    padding: 15,
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
});

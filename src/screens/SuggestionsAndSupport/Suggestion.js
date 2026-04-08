import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppImages } from '../../constant/appImages';
import { AppColors } from '../../constant/appColors';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getStoredUser } from '../../Utils/getUser';
import { api } from '../../services/api'
import Toast from 'react-native-toast-message';
import { Loader } from '../Loader/loader';
import { CustomInput } from '../../components/customTextInput';


export const SuggestionScreen = () => {

  //----------------------------------------------------------------------

  const navigation = useNavigation();
  const [loader, setLoader] = useState(false)
  //----------------------------------------------------------------------

  const validationSchema = Yup.object().shape({
    subject: Yup.string()
      .min(3, 'Subject is too short')
      .required('Subject is required'),
    message: Yup.string()
      .min(10, 'Please write in detail')
      .required('Message is required'),
  });


  //----------------------------------------------------------------------

  const [userData, setUserData] = useState();
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
  console.log('userData', userData?.user_id);

  //----------------------------------------------------------------------

  const sendSuggestion = async (value) => {
    console.log('values :', value)
    setLoader(true)
    try {
      var formData = new FormData();
      formData.append("user_id", userData?.user_id)

      formData.append("subject", value.subject)
      formData.append("message", value.message)

      const res = await api.post(`/user/send/feedback/suggestion`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const result = res.data.msg[0].response

      console.log('Support data :', res.data)
      if (res?.data?.code === "200") {
        Toast.show({
          type: 'customToast',
          text1: 'Success',
          text2: result || 'Suggestion msg send successfully',
          props: {
            bgColor: AppColors.background,
            borderColor: 'green',
          },
        });
      } else {
        Toast.show({
          type: 'customToast',
          text1: 'warning',
          text2: result,
          props: {
            bgColor: AppColors.background,
            borderColor: 'orange',
          },
        });
      }


    } catch (error) {
      console.log('Try catch error :', error)
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
      setLoader(false)
    }

  }

  //----------------------------------------------------------------------


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />

      <Formik
        initialValues={{ subject: '', message: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          sendSuggestion(values)
          resetForm()
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <ScrollView>
            {/* HEADER */}
            <ImageBackground
              source={AppImages.Rectangle}
              style={styles.header}
              resizeMode="cover"
            >
              <View style={styles.headerContent}>
                <View style={styles.headingAndArrow}>
                  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Icon name="arrow-back" size={24} color="#fff" />
                  </TouchableOpacity>
                  <View style={styles.hView}>
                    <Text style={styles.heading}>Send Suggestion</Text>

                    <Icon name="outgoing-mail" size={28} color="#fff" style={{ paddingHorizontal: 8 }} />

                  </View>
                </View>
                <Text style={styles.subHeading}>Share your ideas with us</Text>
              </View>
            </ImageBackground>

            {/* FORM */}
            <View contentContainerStyle={styles.formContainer}>
              <View style={styles.card}>

                {/* Subject */}
                <View style={styles.inputBox}>
                  <CustomInput
                    label='Subject'
                    value={values.subject}
                    onChangeText={handleChange('subject')}
                    onBlur={handleBlur('subject')}
                    placeholder="Enter subject"
                    placeholderTextColor="#999"
                  />
                  {touched.subject && errors.subject && (
                    <Text style={{ color: 'red', fontSize: 12 }}>
                      {errors.subject}
                    </Text>
                  )}
                </View>

                {/* Message */}
                <View style={styles.inputBox}>
                  <CustomInput
                    label='Message'
                    value={values.message}
                    onChangeText={handleChange('message')}
                    onBlur={handleBlur('message')}
                    placeholder="Write your suggestion..."
                    style={styles.textArea}
                    multiline
                    numberOfLines={5}
                    placeholderTextColor="#999"
                  />
                  {touched.message && errors.message && (
                    <Text style={{ color: 'red', fontSize: 12 }}>
                      {errors.message}
                    </Text>
                  )}
                </View>

                {/* Button */}
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Submit Suggestion</Text>
                </TouchableOpacity>

              </View>
            </View>
          </ScrollView>
        )}
      </Formik>
      <Loader visible={loader} />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },

  header: {
    height: '200@vs',
    // justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  headerContent: {
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'flex-start',
    gap: 10,
    paddingTop: 30
  },
  headingAndArrow: {
    flexDirection: 'row',
    alignItems: 'center'

  },

  backBtn: {
    marginRight: 10,
    padding: 5,
  },

  heading: {
    color: '#fff',
    fontSize: '22@ms',
    fontWeight: '600',
  },

  subHeading: {
    color: '#fff',
    fontSize: '14@ms',
    marginTop: 5,
    marginLeft: 30,
    opacity: 0.9,
  },

  formContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,

  },

  card: {
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    alignSelf: 'center'
  },

  inputBox: {
    marginBottom: 15,
  },

  label: {
    marginBottom: 6,
    color: '#555',
    fontSize: '13@ms',
  },

  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },

  button: {
    backgroundColor: AppColors.primary,
    padding: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 15,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '15@ms',
  },
  hView: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
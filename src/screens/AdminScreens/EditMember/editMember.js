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
import { CustomButtonLight } from '../../../components/customeButtonLight';
import { navigate } from '../../../navigations/navigationService';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CustomInputWithIcon } from '../../../components/customInputWithIcon';
import { Formik } from 'formik';

export const EditMember = ({ route }) => {
  const { item } = route.params;
  console.log('edite members :', item);
  const [rounds, setRounds] = useState(null);

  const navigation = useNavigation();
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
                    <Image
                      source={AppIcons.arrowBack}
                      style={styles.arrowBack}
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
        <Formik initialValues={{ fullName: '', phone: '' }}>
          {({ values, handleChange, handleBlur, handleSubmit }) => (
            <View>
              <View style={styles.textInput}>
                <CustomInputWithIcon
                  label="Full Name"
                  placeholder={item.name}
                  type="text"
                  value={values.fullName}
                  onChangeText={handleChange}
                  rightIcon={<Icon name="edit" size={20} color="#666" />}
                />
                <CustomInputWithIcon
                  label="Phone Number"
                  placeholder={item.phone}
                  type="numeric"
                  value={values.phone}
                  onChangeText={handleChange}
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
    marginLeft: 10,
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

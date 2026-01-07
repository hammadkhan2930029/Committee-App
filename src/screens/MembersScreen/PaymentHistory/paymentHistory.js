import {
  StatusBar,
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { AppColors } from '../../../constant/appColors';
import { useNavigation } from '@react-navigation/native';
import { AppIcons } from '../../../constant/appIcons';
import { AppImages } from '../../../constant/appImages';
import Icon from 'react-native-vector-icons/MaterialIcons';
// keyboard-arrow-left
export const PaymentHistory = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.conatiner}>
      <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />
      <ScrollView>
        <View>
          <ImageBackground
            source={AppImages.Rectangle}
            style={styles.RectangleImg}
          >
            <View style={styles.main}>
              <View style={styles.TopView}>
                <View style={styles.backAndText}>
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.arrowBack}
                  >
                    <Icon
                      name="keyboard-arrow-left"
                      size={26}
                      color={AppColors.primary}
                    />
                  </TouchableOpacity>
                  <Text style={styles.h1}>Payment History</Text>
                </View>
              </View>
              <View style={styles.textView}>
                <Text style={styles.h4}>View all your past payments.</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.card_view}>
          {[...Array(8)].map((_, index) => (
            <View style={styles.card}>
              <View style={styles.leftData}>
                <View style={styles.view}>
                  <Text style={styles.text1}>February</Text>
                  <Text style={styles.text2}> 2025</Text>
                </View>
                <View style={styles.view}>
                  <Text style={styles.text1}>Amount: </Text>
                  <Text style={styles.text2}> PKR 3,000</Text>
                </View>
                <View style={styles.view}>
                  <Text style={styles.text1}>Slip: </Text>
                  <Text style={styles.text2}> Approved</Text>
                </View>
              </View>
              <View style={styles.rightData}>
                <View style={styles.status_view}>
                  <Text style={styles.status_text}>Paid</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
const styles = ScaledSheet.create({
  conatiner: {
    flex: 1,
  },
  arrowBack: {
    backgroundColor: AppColors.background,
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  RectangleImg: {
    width: '100%',
    height: '250@vs',
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
  //------------------------------
  card_view: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  card: {
    width: '90%',
    backgroundColor: AppColors.background,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 20,
    borderColor: AppColors.primary,
    borderWidth: 1,
    marginTop: 8,
  },
  view: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
  },
  text1: {
    color: AppColors.blackText,
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
  text2: {
    color: AppColors.link,
    fontSize: moderateScale(16),
    fontWeight: '400',
  },
  status_view: {
    width: 80,
    backgroundColor: AppColors.primary,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    elevation: 5,
  },
  status_text: {
    color: AppColors.title,
    fontSize: moderateScale(16),
  },
});

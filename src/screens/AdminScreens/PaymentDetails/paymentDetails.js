import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { AppColors } from '../../../constant/appColors';
import { AppImages } from '../../../constant/appImages';
import { AppIcons } from '../../../constant/appIcons';
import { CustomButton } from '../../../components/customButton';
import { CustomButtonLight } from '../../../components/customeButtonLight';
import { navigate } from '../../../navigations/navigationService';
import { useState } from 'react';
import { api } from '../../../services/api';
import { Loader } from '../../Loader/loader';
import Toast from 'react-native-toast-message';


export const PaymentDetails = ({ route }) => {
  //-------------------------------------------
  const [loading, setLoading] = useState(false);

  const [showImage, setShowImage] = useState(false);

  const { item } = route.params;
  console.log('payment details :', item);
  const navigation = useNavigation();

  //-------------------------------------------
  const markPaymentVerified = async () => {
    setLoading(true)
    try {
      const response = await api.get(
        `/user/mark-payment/verified/${item.payment_id}`,
      );
      const result = await response?.data?.msg[0]?.response;
      console.log('paymnet verified mrk :', result);
      if (result === 'payment verified') {
        Toast.show({
          type: 'customToast',
          text1: 'Success',
          text2: result,
          props: {
            bgColor: AppColors.background,
            borderColor: 'green',
          },
        });
        navigation.goBack();
        setLoading(false);
      } else {
        Toast.show({
          type: 'customToast',
          text1: 'Warning',
          text2: result,
          props: {
            bgColor: AppColors.background,
            borderColor: 'orange',
          },
        });
      }
    } catch (error) {
      console.log(error);
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
                    <Image
                      source={AppIcons.arrowBack}
                      style={styles.arrowBack}
                    />
                  </TouchableOpacity>
                  <Text style={styles.h1}>Payment Details</Text>
                </View>
              </View>
              <View style={styles.textView}>
                <Text style={styles.h4}>
                  Review slip and update payment status.
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.BCDetails}>
          <View style={styles.row}>
            <Text style={styles.text1}>User Name</Text>
            <Text style={styles.text2}>{item.payment_by}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.text1}>Committee</Text>
            <Text style={styles.text2}>{item.committe_name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text1}>Round no</Text>
            <Text style={styles.text2}>{item.round_no}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text1}>Round Month</Text>
            <Text style={styles.text2}>{item.round_month}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text1}>Paid Amount</Text>
            <Text style={styles.text2}>{item.paid_amount}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text1}>Status</Text>
            <View style={styles.activeBtn}>
              <Text style={styles.active}>{item.status}</Text>
            </View>
          </View>
        </View>
        <View style={styles.fullSlip_View}>
          <View style={styles.fullSlip}>
            {item?.pay_slip ? (
              <TouchableOpacity onPress={() => setShowImage(true)}>
                <Image source={{ uri: item.pay_slip }} style={styles.paySlip} />
              </TouchableOpacity>
            ) : (
              <Text style={styles.tapText}>Pay Slip not available</Text>
            )}
          </View>
        </View>
        <View style={styles.buttons}>
          <View style={styles.btnView}>
            <CustomButton
              title="Verify Payment"
              onPress={() => markPaymentVerified()}
            />
          </View>
          <View style={styles.btnView}>
            <CustomButtonLight title="Reject Slip" />
          </View>
        </View>
        <Modal
          visible={showImage}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowImage(false)}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setShowImage(false)}
            >
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>

            <Image source={{ uri: item.pay_slip }} style={styles.fullImage} />
          </View>
        </Modal>
      </ScrollView>
      <Loader visible={loading}/>
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
  activeBtn: {
    backgroundColor: AppColors.primary,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
  },
  active: {
    fontSize: moderateScale(16),
    color: AppColors.title,
    textAlign: 'center',
    padding: 3,
  },
  //----------------------------------
  BCDetails: {
    width: '100%',

    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 6,
    borderBottomColor: AppColors.primary,
    borderBottomWidth: 1,
    // backgroundColor: 'green',
  },
  text1: {
    color: AppColors.blackText,
    fontSize: moderateScale(18),
  },
  text2: {
    color: AppColors.bodyText,
    fontSize: moderateScale(15),
  },
  buttons: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
  },
  btnView: {
    width: '50%',
    margin: 5,
  },
  fullSlip_View: {
    width: '100%',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullSlip: {
    borderColor: AppColors.primary,
    borderWidth: 1,
    width: '100%',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 10,
    borderRadius: 15,
  },
  empty: {
    backgroundColor: '#bbbbbbff',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  tapText: {
    color: AppColors.link,
    fontSize: moderateScale(20),
  },
  //------------------------------
  paySlip: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalClose: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
  closeText: {
    color: '#fff',
    fontSize: moderateScale(28),
    fontWeight: 'bold',
  },
  fullImage: {
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
  },
});

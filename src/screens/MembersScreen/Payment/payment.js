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
import Icon from 'react-native-vector-icons/MaterialIcons';

export const PaymentUser = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />
      <ScrollView style={styles.scroll}>
        <View>
          <ImageBackground
            source={AppImages.Rectangle}
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
                  <Text style={styles.h1}>Committee Details</Text>
                </View>
              </View>
              <View style={styles.textView}>
                <Text style={styles.h4}>ABC Group BC</Text>
                <View style={styles.activeBtn}>
                  <Text style={styles.active}>Active</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.BCDetails}>
          <View style={styles.row}>
            <Text style={styles.text1}>Total Members</Text>
            <Text style={styles.text2}>12</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text1}>Total Rounds</Text>
            <Text style={styles.text2}>12</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text1}>Rounds Per Month</Text>
            <Text style={styles.text2}>12</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text1}>Amount Per Member</Text>
            <Text style={styles.text2}>PKR 2,000</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text1}>Total Amount</Text>
            <Text style={styles.text2}>PKR 60,000</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text1}>Start Date</Text>
            <Text style={styles.text2}>Dec 2025</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text1}>Due On</Text>
            <Text style={styles.text2}>15th every month</Text>
          </View>
        </View>
        <View></View>
        <View style={styles.paymentStatus_view}>
          {/* -----------------------Submitted---------------------------------- */}
          <View style={styles.paymentStatus}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.status}>Your Payment Status</Text>
              </View>
              <View style={styles.statustype}>
                <Text style={styles.statustypeText}>Submitted</Text>
              </View>
            </View>
            <View style={styles.paymentCardRow}>
              <Text style={styles.label}>Last Payment Date</Text>
              <Text style={styles.value}>-</Text>
            </View>
            <View style={styles.paymentCardRow}>
              <Text style={styles.label}>Last Paid Amount</Text>
              <Text style={styles.value}>-</Text>
            </View>
            <View style={styles.paymentCardRow}>
              <Text style={styles.label}>Verification Status</Text>
              <Text style={styles.value}>-</Text>
            </View>
            <View style={styles.paymentCardRow}>
              <Text style={styles.label}>Slip</Text>
              <Text style={styles.value}>No slip submitted</Text>
            </View>
          </View>

          {/* ------------------paid--------------------- */}
          <View style={styles.paymentStatus}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.status}>Your Payment Status</Text>
              </View>
              <View style={styles.statustype_paid}>
                <Text style={styles.statustypeText}>Paid</Text>
              </View>
            </View>
            <View style={styles.paymentCardRow}>
              <Text style={styles.label}>Last Payment Date</Text>
              <Text style={styles.value}>15 Feb 2025</Text>
            </View>
            <View style={styles.paymentCardRow}>
              <Text style={styles.label}>Last Paid Amount</Text>
              <Text style={styles.value}>PKR 3,000</Text>
            </View>
            <View style={styles.paymentCardRow}>
              <Text style={styles.label}>Verification Status</Text>
              <Text style={styles.value}>Verified</Text>
            </View>
            <View style={styles.paymentCardRow}>
              <Text style={styles.label}>Slip</Text>
              <View style={styles.slipView}>
                <Text style={styles.value_slip}>View Slip</Text>
                <Icon
                  name="keyboard-arrow-right"
                  size={20}
                  color={AppColors.link}
                />
              </View>
            </View>
          </View>
          {/* ------------------OverDue--------------------- */}
          <View style={styles.paymentStatus}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.status}>Your Payment Status</Text>
              </View>
              <View style={styles.statustype_Overdue}>
                <Text style={styles.statustypeText}>Overdue</Text>
              </View>
            </View>
            <View style={styles.paymentCardRow}>
              <Text style={styles.label}>Last Payment Date</Text>
              <Text style={styles.value}>-</Text>
            </View>
            <View style={styles.paymentCardRow}>
              <Text style={styles.label}>Last Paid Amount</Text>
              <Text style={styles.value}>-</Text>
            </View>
            <View style={styles.paymentCardRow}>
              <Text style={styles.label}>Verification Status</Text>
              <Text style={styles.value}>-</Text>
            </View>
            <View style={styles.paymentCardRow}>
              <Text style={styles.label}>Slip</Text>
              <View style={styles.slipView}>
                <Text style={styles.value_slip}>No Slip submitted</Text>
              </View>
            </View>
          </View>
          {/* ------------------Rejected--------------------- */}
          <View style={styles.paymentStatus}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.status}>Your Payment Status</Text>
              </View>
              <View style={styles.statustype_Rejected}>
                <Text style={styles.statustypeText}>Rejected</Text>
              </View>
            </View>
            <View style={styles.paymentCardRow}>
              <Text style={styles.label}>Last Payment Date</Text>
              <Text style={styles.value}>-</Text>
            </View>
            <View style={styles.paymentCardRow}>
              <Text style={styles.label}>Last Paid Amount</Text>
              <Text style={styles.value}>-</Text>
            </View>
            <View style={styles.paymentCardRow}>
              <Text style={styles.label}>Verification Status</Text>
              <Text style={styles.value}>-</Text>
            </View>
            <View style={styles.paymentCardRow}>
              <Text style={styles.label}>Slip</Text>
              <View style={styles.slipView}>
                <Text style={styles.value_slip}>No Slip submitted</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    marginBottom: 60,
  },
  arrowBack: {
    width: 28,
    height: 28,
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
    fontSize: moderateScale(20),
    padding: 5,
  },
  activeBtn: {
    backgroundColor: AppColors.background,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
  },
  active: {
    fontSize: moderateScale(16),
    color: AppColors.link,
    textAlign: 'center',
    padding: 3,
  },
  //----------------------------------
  BCDetails: {
    width: '100%',

    padding: 20,
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
    borderBottomWidth: 2,
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
  },
  btnView: {
    width: '50%',
    margin: 5,
  },
  //--------------------------
  paymentStatus_view: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  paymentStatus: {
    backgroundColor: AppColors.background,
    width: '90%',
    borderRadius: 20,
    borderColor: AppColors.primary,
    borderWidth: 1,
    elevation: 5,
    marginTop: 5,
  },
  cardHeader: {
    width: '100%',
    backgroundColor: AppColors.primary,
    padding: 15,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  status: {
    color: AppColors.title,
    fontSize: moderateScale(18),
  },
  statustype: {
    backgroundColor: AppColors.placeholder,
    width: 80,
    padding: 3,
    borderRadius: 15,
  },
  statustype_paid: {
    backgroundColor: 'green',
    width: 80,
    padding: 3,
    borderRadius: 15,
  },
  statustype_Overdue: {
    backgroundColor: '#DE3163',
    width: 80,
    padding: 3,
    borderRadius: 15,
  },
  statustype_Rejected: {
    backgroundColor: '#ec0936ff',
    width: 80,
    padding: 3,
    borderRadius: 15,
  },
  statustypeText: {
    textAlign: 'center',
    fontSize: moderateScale(14),
    color: AppColors.title,
  },
  paymentCardRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
    marginTop: 5,
  },
  label: {
    fontSize: moderateScale(16),
    padding: 3,
  },
  value: {
    fontSize: moderateScale(16),

    textAlign: 'center',
    color: AppColors.placeholder,
    padding: 3,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  value_slip: {
    fontSize: moderateScale(16),

    textAlign: 'center',
    color: AppColors.link,
    padding: 3,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slipView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

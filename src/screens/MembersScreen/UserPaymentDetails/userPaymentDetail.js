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
import { Modal } from 'react-native';
import { useEffect, useState } from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const UserPaymentDetails = ({ route }) => {
  //------------------------------------

  const [showImage, setShowImage] = useState(false);
  const [loading, setLoading] = useState(true);
  //------------------------------------
  const { item } = route.params;
  console.log('item :', item);
  const navigation = useNavigation();
  const total = Number(item.total_amount);
  const paid = Number(item.paid_amount);
  const b = total - paid;
  //------------------------------------

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  const PaymentDetailsSkeleton = () => {
    return (
      <ScrollView style={styles.scrolldetails}>
        {/* BCDetails */}
        <View style={{ padding: 15 }}>
          {[...Array(7)].map((_, i) => (
            <SkeletonPlaceholder key={i}>
              <SkeletonPlaceholder.Item
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                marginBottom={12}
              >
                <SkeletonPlaceholder.Item
                  width={120}
                  height={20}
                  borderRadius={4}
                />
                <SkeletonPlaceholder.Item
                  width={120}
                  height={20}
                  borderRadius={4}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          ))}
        </View>

        {/* Pay slip */}
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item
            width="95%"
            height={250}
            borderRadius={15}
            marginBottom={20}
            alignSelf="center"
          />
        </SkeletonPlaceholder>

        {/* Button */}
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item
            width="50%"
            height={50}
            borderRadius={25}
            alignSelf="center"
          />
        </SkeletonPlaceholder>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />
      <ScrollView style={styles.scrolldetails}>
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
        {loading ? (
          <PaymentDetailsSkeleton />
        ) : (
          <View>
            <View style={styles.BCDetails}>
              <View style={styles.row}>
                <Text style={styles.text1}>Payment by</Text>
                <Text style={styles.text2}>{item.payment_by}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text1}>Committe Name</Text>
                <Text style={styles.text2}>{item.committe_name}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.text1}>Amount per member</Text>
                <Text style={styles.text2}>{item.amount_per_member}</Text>
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
                <Text style={styles.text1}>Pay Date</Text>
                <Text style={styles.text2}>{item.pay_date}</Text>
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
                    <Image
                      source={{ uri: item.pay_slip }}
                      style={styles.paySlip}
                    />
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.tapText}>Pay Slip not available</Text>
                )}
              </View>
            </View>

            <View style={styles.buttons}>
              <View style={styles.btnView}>
                <CustomButton
                  title="Edit Payment "
                  onPress={() =>
                    navigation.navigate('EditPayments', {
                      payment_id: item.payment_id,
                    })
                  }
                />
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

                <Image
                  source={{ uri: item.pay_slip }}
                  style={styles.fullImage}
                />
              </View>
            </Modal>
          </View>
        )}
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
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 5,
    borderRadius: 15,
  },

  tapText: {
    color: AppColors.link,
    fontSize: moderateScale(16),
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

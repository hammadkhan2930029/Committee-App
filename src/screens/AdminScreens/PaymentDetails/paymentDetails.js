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

export const PaymentDetails = ({ route }) => {
  const { item } = route.params;
  console.log('item :', item);
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
            <Text style={styles.text2}>{item.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text1}>Phone Number</Text>
            <Text style={styles.text2}>{item.phone}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text1}>Committee</Text>
            <Text style={styles.text2}>{item.fund}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text1}>Month</Text>
            <Text style={styles.text2}>{item.date}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text1}>Amount Due</Text>
            <Text style={styles.text2}>{item.amount}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text1}>Status</Text>
            {/* <Text style={styles.text2}>{item.status}</Text> */}
            <View style={styles.activeBtn}>
                  <Text style={styles.active}>{item.status}</Text>
                </View>
          </View>
        </View>
        <View style={styles.fullSlip_View}>
          <View style={styles.fullSlip}>
            <View style={styles.empty}></View>
            <Text style={styles.tapText}>Tap to view full slip </Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <View style={styles.btnView}>
            <CustomButton
              title="Verify Payment"
             
            />
          </View>
          <View style={styles.btnView}>
            <CustomButtonLight
              title="Reject Slip"
             
            />
          </View>
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
    margin:5
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
    padding: 30,
    borderRadius:15
  },
  empty:{
    backgroundColor:'#bbbbbbff',
    width:50,
    height:50,
    borderRadius:25
  },
  tapText:{
    color:AppColors.link,
    fontSize:moderateScale(20)
  }
});

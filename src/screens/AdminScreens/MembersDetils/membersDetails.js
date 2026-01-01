import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { AppColors } from '../../../constant/appColors';
import { AppImages } from '../../../constant/appImages';
import { AppIcons } from '../../../constant/appIcons';
import { CustomButton } from '../../../components/customButton';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const MembersDetails = () => {
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
                  <Text style={styles.h1}>Member Details</Text>
                </View>
              </View>
              <View style={styles.textView}>
                <Text style={styles.h4}>
                  View user info and joined BCs below.
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.informationCard_View}>
          <View style={styles.informationCard}>
            <View style={styles.CardHeader}>
              <Icon name="person" size={24} color={AppColors.background} />
              <Text style={styles.headerText}>Member Information</Text>
            </View>
            <View style={styles.cardDetails}>
              <View style={styles.row}>
                <Text style={styles.title}>Full Name</Text>
                <Text style={styles.value}>Hammad khan</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.title}>Phone Number</Text>
                <Text style={styles.value}>+92 301 5566778</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.title}>Joined BCs</Text>
                <Text style={styles.value}>5 Committees</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.title}>Status </Text>
                <View style={styles.activeBtn}>
                  <Text style={styles.active}>Active</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.informationCard_View}>
          <View style={styles.secondH1_view}>
            <Text style={styles.secondH1}>Joined Committees</Text>
          </View>
          {[...Array(4)].map((_, index) => (
            <TouchableOpacity style={styles.committeeDetails}>
              <View style={styles.firstRow}>
                <Text style={styles.committeName}>ABC Group BC</Text>
                <View style={styles.firstRow}>
                  <Text style={styles.currency}>PKR :</Text>
                  <Text style={styles.value2}>3,000</Text>
                </View>
              </View>
              <View style={styles.secondRow}>
                <Text style={styles.currency}>Start Date:</Text>
                <Text style={styles.value2}>Dec 2025</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.btn}>
          <CustomButton title="Edit User" />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = ScaledSheet.create({
  container: {
    flex: 1,
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
  //---------------------------
  informationCard_View: {
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  informationCard: {
    backgroundColor: AppColors.background,
    width: '90%',
    borderRadius: 15,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#eee',
  },
  CardHeader: {
    backgroundColor: AppColors.primary,
    padding: 15,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  headerText: {
    color: AppColors.title,
    fontSize: moderateScale(18),
    paddingLeft: 5,
  },
  cardDetails: {
    padding: 10,
  },
  row: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 8,
  },
  title: {
    color: AppColors.blackText,
    fontSize: moderateScale(16),
  },
  value: {
    color: AppColors.bodyText,
    fontSize: moderateScale(15),
  },
  activeBtn: {
    backgroundColor: AppColors.primary,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
  },
  active: {
    fontSize: moderateScale(16),
    color: AppColors.title,
    textAlign: 'center',
    padding: 3,
  },
  //--------------------------
  secondH1_view: {
    width: '90%',

    justifyContent: 'flex-start',
  },
  secondH1: {
    color: AppColors.link,
    fontSize: moderateScale(20),
    padding: 10,
  },
  committeeDetails: {
    width: '90%',
    borderColor: AppColors.primary,
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    marginTop: 5,
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  secondRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 5,
  },
  committeName: {
    fontSize: moderateScale(20),
  },
  currency: {
    color: AppColors.blackText,
    fontSize: moderateScale(16),
  },
  value2: {
    color: AppColors.link,
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  btn:{
    width:'90%',
    padding:10,
   alignSelf:'center'
  }
});

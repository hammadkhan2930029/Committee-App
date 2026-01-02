import React from 'react';
import {
  View,
  StatusBar,
  ImageBackground,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { AppColors } from '../../../constant/appColors';
import { AppImages } from '../../../constant/appImages';
import { AppIcons } from '../../../constant/appIcons';
import { CustomButton } from '../../../components/customButton';
import { useNavigation } from '@react-navigation/native';
import { navigate } from '../../../navigations/navigationService';
import Icon from 'react-native-vector-icons/MaterialIcons';


export const MembersDashboard = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />
      <ScrollView>
        <View>
          <ImageBackground
            source={AppImages.Rectangle}
            style={styles.RectangleImg}
            resizeMode="cover"
          >
            <View style={styles.main}>
              <View style={styles.TopView}>
                <Text style={styles.h1}>Member Dashboard</Text>
                <Image source={AppImages.profileAvatar} style={styles.avatar} />
              </View>
              <View style={styles.textView}>
                <Text style={styles.h2}>
                  Hello, Hammad{' '}
                  
                  <Icon name="waving-hand" size={30} color='#FED22D'/>
                </Text>
                <Text style={styles.h4}>Here’s your BC overview.</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        {/* ---------------------------------------------- */}
        <View style={styles.Dashboardcard_View}>
          {/* -------Active BCs------- */}

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('CommitteeList')}
            style={styles.Dashboardcard}
          >
            <View>
              <View style={styles.imgText}>
                <Icon name="person-add-alt" size={34} color={AppColors.link}/>
                <Text style={styles.activeBC}>My Active BCs</Text>
              </View>
            </View>
            <View style={styles.view2}>
              <Text style={styles.activeBC_details}>2 BCs you’ve joined</Text>
              <View style={styles.counter}>
                <Text style={styles.counter_text}>08</Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* -------Upcoming payments------- */}
          <TouchableOpacity activeOpacity={0.7} style={styles.Dashboardcard}>
            <View>
              <View style={styles.imgText}>
                <Icon name="calendar-today" size={34} color={AppColors.link}/>
                <Text style={styles.activeBC}>Upcoming Payment</Text>
              </View>
            </View>
            <View style={styles.view2}>
              <Text style={styles.activeBC_details}>Due on 15 Feb 2025 </Text>
              <Text style={styles.counter_text2}>PKR 5,000</Text>
            </View>
          </TouchableOpacity>
          {/* -------Pending Payments------- */}
          <TouchableOpacity activeOpacity={0.7} style={styles.Dashboardcard}>
            <View>
              <View style={styles.imgText}>
                <Icon name="cloud-upload" size={34} color={AppColors.link}/>

                <Text style={styles.activeBC}>Slip Status</Text>
              </View>
            </View>
            <View style={styles.view2}>
              <Text style={styles.activeBC_details}>Verification pending</Text>
              <View style={styles.btnView}>
                <Text style={styles.btn}>Pending</Text>
              </View>
            </View>
          </TouchableOpacity>
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
  RectangleImg: {
    width: '100%',
    height: '250@vs',
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
  h1: {
    fontSize: moderateScale(24),
    color: AppColors.title,
    fontWeight: '600',
  },
  avatar: {
    width: 60,
    height: 60,
    elevation: 5,
  },
  textView: {
    padding: 15,
  },
  wavingHand: {
    width: 28,
    height: 28,
  },
  h2: {
    color: AppColors.title,
    fontSize: moderateScale(20),
  },
  h4: {
    color: AppColors.title,
    fontSize: moderateScale(16),
    opacity: 0.9,
  },
  //----------------------------
  Dashboardcard_View: {
    width: '100%',

    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -50,
  },
  Dashboardcard: {
    width: '85%',
    backgroundColor: AppColors.background,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: 15,
    elevation: 5,
    borderRadius: 20,
    margin: 10,
  },
  view2:{
    width:'100%',
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    padding:5
  },
  group: {
    width: 35,
    height: 35,
  },
  imgText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeBC: {
    color: AppColors.blackText,
    fontSize: moderateScale(18),
    fontWeight: '500',
    padding: 5,
  },
  activeBC_details: {
    color: AppColors.blackText,
    fontSize: moderateScale(16),
    opacity: 0.7,
  },
  counter: {
    backgroundColor: AppColors.background,
    borderRadius: 10,
    elevation: 5,
  },
  counter_text: {
    fontSize: moderateScale(20),
    padding: 10,
    color: AppColors.link,
    fontWeight: '600',
  },
  counter_text2: {
    fontSize: moderateScale(16),
    padding: 10,
    color: AppColors.link,
    fontWeight: '600',
  },
  BtnView: {
    width: '70%',
    alignSelf: 'center',
  },

  CreateUser: {
    backgroundColor: AppColors.cardLight,
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
    marginTop: 5,
  },
  CreateUser_text: {
    color: AppColors.primary,
    fontWeight: 'bold',
  },
  btnView:{
    backgroundColor:AppColors.primary,
    paddingLeft:15,
    paddingRight:15,
    borderRadius:15
  },
  btn:{
    color:AppColors.title,
    fontSize:moderateScale(16),
    padding:3
  }

});

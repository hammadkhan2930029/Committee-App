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
import Ionicons from 'react-native-vector-icons/Ionicons';


export const AdminDashboard = () => {
    const navigation = useNavigation()
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
                <Text style={styles.h1}>Admin Dashboard</Text>
                <TouchableOpacity onPress={()=> navigation.navigate('AdminProfile')}>

                <Image source={AppImages.profileAvatar} style={styles.avatar} />
                </TouchableOpacity>
              </View>
              <View style={styles.textView}>
                <Text style={styles.h2}>
                  Hello, Hammad{' '}
                 
                   <Icon name="waving-hand" size={30} color='#FED22D'/>
                </Text>
                <Text style={styles.h4}>Here’s your admin overview.</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        {/* ---------------------------------------------- */}
        <View style={styles.Dashboardcard_View}>
          {/* -------Active BCs------- */}
          <TouchableOpacity activeOpacity={0.7} onPress={()=>navigation.navigate("CommitteeList")}>
            <View style={styles.Dashboardcard}>
              <View>
                <View style={styles.imgText}>
                  <Icon name="group-add" size={34} color={AppColors.link}/>
                  <Text style={styles.activeBC}>Active BCs</Text>
                </View>
                <Text style={styles.activeBC_details}>
                  2 starting this month
                </Text>
              </View>
              <View style={styles.counter}>
                <Text style={styles.counter_text}>08</Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* -------Total Users------- */}
          <TouchableOpacity activeOpacity={0.7}>
            <View style={styles.Dashboardcard}>
              <View>
                <View style={styles.imgText}>
                 <Icon name="groups" size={34} color={AppColors.link}/>
                  <Text style={styles.activeBC}>Total Users</Text>
                </View>
                <Text style={styles.activeBC_details}>3 joined this week </Text>
              </View>
              <View style={styles.counter}>
                <Text style={styles.counter_text}>25</Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* -------Pending Payments------- */}
          <TouchableOpacity activeOpacity={0.7}>
            <View style={styles.Dashboardcard}>
              <View>
                <View style={styles.imgText}>
                 <Ionicons name="briefcase" size={34} color={AppColors.link}/>
                  <Text style={styles.activeBC}>Pending Payments</Text>
                </View>
                <Text style={styles.activeBC_details}>Awaiting approval </Text>
              </View>
              <View style={styles.counter}>
                <Text style={styles.counter_text}>05</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.BtnView}>
          <CustomButton
            title="Create Committee"
            style={styles.createCommittee}
            onPress={()=> navigate('CreateCommittee')}
          />
          <TouchableOpacity style={styles.CreateUser}  onPress={()=> navigation.navigate('CreateMembers')}>
            <Text style={styles.CreateUser_text}>Create User</Text>
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -50,
  },
  Dashboardcard: {
    width: '90%',
    backgroundColor: AppColors.background,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
    elevation: 5,
    borderRadius: 10,
    margin: 10,
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
    backgroundColor: AppColors.primary,
    borderRadius: 10,
  },
  counter_text: {
    fontSize: moderateScale(20),
    padding: 10,
    color: AppColors.title,
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
});

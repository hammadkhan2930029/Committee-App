import React from 'react';
import {
  Button,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { AppColors } from '../../constant/appColors';
import { AppIcons } from '../../constant/appIcons';
import { AppImages } from '../../constant/appImages';
import { CustomButton } from '../../components/customButton';

export const AdminProfile = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={AppColors.background}
        barStyle="dark-content"
      />
      <View style={styles.arrowBackView}>
        <TouchableOpacity>
          <Image source={AppIcons.arrowBackColor} style={styles.arrowBack} />
        </TouchableOpacity>
      </View>

      <View style={styles.profileView}>
        <Text style={styles.profile}>Profile</Text>
      </View>
      <View style={styles.profileView}>
        <Image source={AppImages.profileAvatar} style={styles.profileImage} />
      </View>
      <View style={styles.nameView}>
        <Text style={styles.name}>Ahmed khan</Text>
        <Text style={styles.admin}>Admin</Text>
      </View>
      <View style={styles.detailView}>
        <View style={styles.detail}>
          <Text style={styles.text1}>Full Name : </Text>
          <Text style={styles.text2}> Ahmed khan</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.text1}>Phone Number : </Text>
          <Text style={styles.text2}> +92 301 5566778</Text>
        </View>
      </View>
      <View style={styles.BtnView}>
        <CustomButton title="Edit Profile" />
        <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  arrowBackView: {
    marginTop: 20,
    padding: 20,
  },
  profileView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile: {
    fontSize: moderateScale(24),
    color: AppColors.primary,
    fontWeight: '700',
    padding: 5,
  },
  profileView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '45%',
    resizeMode: 'contain',
  },
  nameView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  name: {
    textAlign: 'center',
    fontSize: moderateScale(20),
    color: AppColors.bodyText,
  },
  admin: {
    textAlign: 'center',
    fontSize: moderateScale(16),
    color: AppColors.link,
  },
  detailView: {
    padding: 25,
  },
  detail: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: 8,
  },
  text1: {
    fontSize: moderateScale(18),
    color: AppColors.focusText,
    fontWeight:'600'
  },
  text2: {
    fontSize: moderateScale(18),
    color: AppColors.bodyText,
  },
  BtnView:{
    width:'70%',
    alignSelf:'center'
  },
   button: {
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
    elevation:5,
    backgroundColor:AppColors.background,
    marginTop:10,
    borderColor:AppColors.primary,
    borderWidth:1

  },
  text: {
    color: AppColors.link,
    fontWeight: 'bold',
    fontSize: moderateScale(14),
  },
});

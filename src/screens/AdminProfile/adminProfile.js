import React, { useEffect, useState } from 'react';
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
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loader } from '../Loader/loader';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const AdminProfile = () => {
  const [userdata, setUserData] = useState('');
  const [isLodaing, setIsLoading] = useState(false);
  const navigation = useNavigation();
  //-----------------get data--------------------
  const getData = async () => {
    const user = await AsyncStorage.getItem('user');
    const parsedUser = JSON.parse(user);
    setUserData(parsedUser);

    console.log(parsedUser.full_name); // Hammad
    console.log(parsedUser.user_id); // 11
  };
  useFocusEffect(() => {
    getData();
  }, []);
  console.log('user data :', userdata);
  //-----------------logout--------------------------
  const logout = async () => {
    setIsLoading(true);
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    navigation.replace('Login');
  };
  // useEffect(() => {
  //   logout();
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);
  // }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={AppColors.background}
        barStyle="dark-content"
      />
      <View style={styles.arrowBackView}>
        {/* <TouchableOpacity>
          <Image source={AppIcons.arrowBackColor} style={styles.arrowBack} />
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.arrowIcon}>
          <Icon name="keyboard-arrow-left" size={26} color={AppColors.title} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="settings" size={26} color={AppColors.link} />
        </TouchableOpacity>
      </View>

      <View style={styles.profileView}>
        <Text style={styles.profile}>Profile</Text>
      </View>
      <View style={styles.profileView}>
        <Image source={AppImages.profileAvatar} style={styles.profileImage} />
      </View>
      <View style={styles.nameView}>
        <Text style={styles.name}>{userdata.full_name}</Text>
        <Text style={styles.admin}>Admin</Text>
      </View>
      <View style={styles.detailView}>
        <View style={styles.detail}>
          <Text style={styles.text1}>Full Name : </Text>
          <Text style={styles.text2}> {userdata.full_name}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.text1}>Phone Number : </Text>
          <Text style={styles.text2}> {userdata.phone}</Text>
        </View>
      </View>
      <View style={styles.BtnView}>
        <CustomButton
          title="Edit Profile"
          onPress={() =>
            navigation.navigate('AdminEditProfile', { user: userdata })
          }
        />
        <TouchableOpacity style={styles.button} onPress={() => logout()}>
          <Text style={styles.text}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <Loader visible={isLodaing} />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  arrowIcon: {
    backgroundColor: AppColors.primary,
    borderRadius: 20,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontWeight: '600',
  },
  text2: {
    fontSize: moderateScale(18),
    color: AppColors.bodyText,
  },
  BtnView: {
    width: '70%',
    alignSelf: 'center',
  },
  button: {
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
    backgroundColor: AppColors.background,
    marginTop: 10,
    borderColor: AppColors.primary,
    borderWidth: 1,
  },
  text: {
    color: AppColors.link,
    fontWeight: 'bold',
    fontSize: moderateScale(14),
  },
});

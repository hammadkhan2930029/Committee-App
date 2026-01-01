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
import { navigate } from '../../../navigations/navigationService';

export const CommitteeUserList = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />
      <View style={styles.addView}>
        <TouchableOpacity activeOpacity={0.8}>
          <Image source={AppIcons.Add} style={styles.add} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View>
          <ImageBackground
            source={AppImages.Rectangle2}
            style={styles.RectangleImg}
            resizeMode="cover"
          >
            <View style={styles.main}>
              <View style={styles.TopView}>
                <View style={styles.backAndText}>
                  <TouchableOpacity>
                    <Image
                      source={AppIcons.arrowBack}
                      style={styles.arrowBack}
                    />
                  </TouchableOpacity>
                  <Text style={styles.h1}>Users</Text>
                </View>
                <Image source={AppImages.profileAvatar} style={styles.avatar} />
              </View>
              <View style={styles.textView}>
                <Text style={styles.h4}>Manage all users and view </Text>
                <Text style={styles.h4}>their joined BCs below.</Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* ---------------------------------------------- */}
        <View style={styles.Committee_View}>
          {/* --------------------- */}
          {[...Array(5)].map((_, index) => (
              <TouchableOpacity style={styles.Dashboardcard} onPress={() => navigate('MembersDetails')}>
                <View style={styles.first_view}>
                  <View style={styles.userMale_View}>
                    <Image source={AppIcons.userMale} style={styles.userMale} />
                  </View>
                  <View>
                    <Text style={styles.Name}>Bilal Ahmed</Text>
                  </View>
                </View>
                <View style={styles.first_view}>
                  <View style={styles.details}>
                    <Text style={styles.one}>Phone:</Text>
                    <Text style={styles.count}>+92 301 5566778</Text>
                  </View>
                </View>
                <View style={styles.first_view}>
                  <View style={styles.details}>
                    <Text style={styles.one}>Joined BCs:</Text>
                    <Text style={styles.count}> 10</Text>
                  </View>
                </View>
              </TouchableOpacity>
          ))}
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
  scrollView: {
    marginBottom: 65,
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
    width: '30%',
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
    padding: 10,
  },

  h4: {
    color: AppColors.title,
    fontSize: moderateScale(16),
    opacity: 0.9,
    padding: 3,
  },
  //----------------------------
  Committee_View: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Dashboardcard: {
    width: '90%',
    backgroundColor: AppColors.cardLight,
    justifyContent: 'center',

    alignItems: 'center',
    flexDirection: 'column',
    padding: 15,
    elevation: 5,
    borderRadius: 20,
    margin: 10,
    borderColor: AppColors.primary,
    borderWidth: 1,
  },
  first_view: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  Name: {
    fontSize: moderateScale(16),
    color: AppColors.blackText,
    fontWeight: '600',
    padding: 5,
  },
  Btncomplete: {
    backgroundColor: AppColors.primary,
    borderRadius: 20,
    padding: 5,
  },
  complete: {
    fontSize: moderateScale(15),
    color: AppColors.title,
    paddingLeft: 7,
    paddingRight: 7,
  },
  BtnActive: {
    backgroundColor: AppColors.cardLight,
    borderRadius: 20,
    padding: 5,
    borderColor: AppColors.primary,
    borderWidth: 1,
  },
  active: {
    fontSize: moderateScale(15),
    color: AppColors.link,
    paddingLeft: 7,
    paddingRight: 7,
  },
  details: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 10,
  },
  one: {
    fontSize: moderateScale(14),
    color: AppColors.blackText,
  },
  count: {
    fontSize: moderateScale(14),
    color: AppColors.link,
    fontWeight: '600',
  },
  //-----------------------------
  addView: {
    position: 'absolute',
    top: 610,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,

    justifyContent: 'center',
    alignItems: 'center',

    zIndex: 100,
  },

  add: {
    width: 80,
    height: 80,

    resizeMode: 'contain',
    elevation: 10,
  },
  userMale_View: {
    backgroundColor: AppColors.primary,
    borderRadius: 50,
    padding: 8,
  },
  userMale: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
});

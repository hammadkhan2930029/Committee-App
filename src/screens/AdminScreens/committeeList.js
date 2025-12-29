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
import { AppColors } from '../../constant/appColors';
import { AppImages } from '../../constant/appImages';
import { AppIcons } from '../../constant/appIcons';
import { CustomButton } from '../../components/customButton';

export const CommitteeList = () => {
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
            source={AppImages.Rectangle}
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
                  <Text style={styles.h1}>Committees</Text>
                </View>
                <Image source={AppImages.profileAvatar} style={styles.avatar} />
              </View>
              <View style={styles.textView}>
                <Text style={styles.h4}>Manage all your active and</Text>
                <Text style={styles.h4}>completed BCs below.</Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* ---------------------------------------------- */}
        <View style={styles.Committee_View}>
          {/* --------------------- */}
          <View style={styles.Dashboardcard}>
            <View style={styles.first_view}>
              <View>
                <Text style={styles.family}>Family Fund BC</Text>
              </View>
              <TouchableOpacity style={styles.Btncomplete}>
                <Text style={styles.complete}>Complete</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.first_view}>
              <View style={styles.details}>
                <Text style={styles.one}>Members : </Text>
                <Text style={styles.count}> 25</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.one}>Amount per Member :</Text>
                <Text style={styles.count}> 4,000</Text>
              </View>
            </View>
            <View style={styles.first_view}>
              <View style={styles.details}>
                <Text style={styles.one}>Round : </Text>
                <Text style={styles.count}> 10</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.one}>Start Date :</Text>
                <Text style={styles.count}> Dec 2025</Text>
              </View>
            </View>
          </View>
          {/* --------------------- */}
          <View style={styles.Dashboardcard}>
            <View style={styles.first_view}>
              <View>
                <Text style={styles.family}>ABC Group BC</Text>
              </View>
              <TouchableOpacity style={styles.BtnActive}>
                <Text style={styles.active}>Active</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.first_view}>
              <View style={styles.details}>
                <Text style={styles.one}>Members : </Text>
                <Text style={styles.count}> 25</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.one}>Amount per Member :</Text>
                <Text style={styles.count}> 4,000</Text>
              </View>
            </View>
            <View style={styles.first_view}>
              <View style={styles.details}>
                <Text style={styles.one}>Round : </Text>
                <Text style={styles.count}> 10</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.one}>Start Date :</Text>
                <Text style={styles.count}> Dec 2025</Text>
              </View>
            </View>
          </View>

          {/* --------------------- */}
          <View style={styles.Dashboardcard}>
            <View style={styles.first_view}>
              <View>
                <Text style={styles.family}>ABC Group BC</Text>
              </View>
              <TouchableOpacity style={styles.BtnActive}>
                <Text style={styles.active}>Active</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.first_view}>
              <View style={styles.details}>
                <Text style={styles.one}>Members : </Text>
                <Text style={styles.count}> 25</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.one}>Amount per Member :</Text>
                <Text style={styles.count}> 4,000</Text>
              </View>
            </View>
            <View style={styles.first_view}>
              <View style={styles.details}>
                <Text style={styles.one}>Round : </Text>
                <Text style={styles.count}> 10</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.one}>Start Date :</Text>
                <Text style={styles.count}> Dec 2025</Text>
              </View>
            </View>
          </View>

          {/* --------------------- */}
          <View style={styles.Dashboardcard}>
            <View style={styles.first_view}>
              <View>
                <Text style={styles.family}>Family Fund BC</Text>
              </View>
              <TouchableOpacity style={styles.Btncomplete}>
                <Text style={styles.complete}>Complete</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.first_view}>
              <View style={styles.details}>
                <Text style={styles.one}>Members : </Text>
                <Text style={styles.count}> 25</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.one}>Amount per Member :</Text>
                <Text style={styles.count}> 4,000</Text>
              </View>
            </View>
            <View style={styles.first_view}>
              <View style={styles.details}>
                <Text style={styles.one}>Round : </Text>
                <Text style={styles.count}> 10</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.one}>Start Date :</Text>
                <Text style={styles.count}> Dec 2025</Text>
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
  backAndText: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '50%',
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

  h4: {
    color: AppColors.title,
    fontSize: moderateScale(16),
    opacity: 0.9,
    padding: 5,
  },
  //----------------------------
  Committee_View: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -50,
  },
  Dashboardcard: {
    width: '90%',
    backgroundColor: AppColors.background,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  family: {
    fontSize: moderateScale(16),
    color: AppColors.blackText,
    fontWeight: '600',
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
});

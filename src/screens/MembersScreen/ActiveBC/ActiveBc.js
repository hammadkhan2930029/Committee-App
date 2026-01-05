import {
  ScrollView,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  StatusBar
} from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { AppImages } from '../../../constant/appImages';
import { AppIcons } from '../../../constant/appIcons';
import { AppColors } from '../../../constant/appColors';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const ActiveBCs = () => {
  return (
    <View style={styles.container}>
        <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />
      <ScrollView style={styles.scroll_View}>
        <View>
          <ImageBackground
            source={AppImages.Rectangle}
            style={styles.RectangleImg}
          >
            <View style={styles.main}>
              <View style={styles.TopView}>
                <View style={styles.backAndText}>
                  <TouchableOpacity
                    // onPress={() => navigation.goBack()}
                    style={styles.arrowIcon}
                  >
                    <Icon
                      name="keyboard-arrow-left"
                      size={26}
                      color={AppColors.link}
                    />
                    {/* <Image
                      source={AppIcons.arrowBack}
                      style={styles.arrowBack}
                    /> */}
                  </TouchableOpacity>
                  <Text style={styles.h1}>My Active BCs </Text>
                </View>
              </View>
              <View style={styles.textView}>
                <Text style={styles.h4}>View all BCs you’ve joined.</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.Committee_View}>
          {[...Array(5)].map((_, index) => (
            <TouchableOpacity 
            // onPress={() => navigate('CommitteeDetails')}
            >
              <View style={styles.Dashboardcard}>
                <View style={styles.first_view}>
                  <View>
                    <Text style={styles.family}>Family Fund BC</Text>
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
  },
  arrowBack: {
    width: 28,
    height: 28,
  },
  arrowIcon: {
    backgroundColor: AppColors.background,
    borderRadius: 20,
    width:25,
    height:25,
    justifyContent:'center',
    alignItems:'center'
  },
  scroll_View: {
    marginBottom: 60,
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
    padding: 20,
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
  //------------------------------
  Committee_View: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -40,
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
    width:100,

    
  },
  complete: {
    fontSize: moderateScale(15),
    color: AppColors.title,
    paddingLeft: 7,
    paddingRight: 7,
    textAlign:'center'
  },
  BtnActive: {
    backgroundColor: AppColors.cardLight,
    borderRadius: 20,
    padding: 5,
    borderColor: AppColors.primary,
    borderWidth: 1,
    width:100,
  },
  active: {
    fontSize: moderateScale(15),
    color: AppColors.link,
    paddingLeft: 7,
    paddingRight: 7,
    textAlign:'center'
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
});

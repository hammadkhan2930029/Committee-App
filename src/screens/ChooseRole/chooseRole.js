import React, { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
import { View, TouchableOpacity, Text, Image, StatusBar } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { AppImages } from '../../constant/appImages';
import { useNavigation } from '@react-navigation/native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { AppColors } from '../../constant/appColors';
import { AppIcons } from '../../constant/appIcons';
import { CustomButton } from '../../components/customButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const ChooseRole = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(1);

  const handleContinue = () => {
    if (selected === 1) {
      navigation.navigate('BottomTabNavigation');
    } else if (selected === 2) {
      navigation.navigate('BottomTabNavigationUser');
    }
  };
  useEffect(() => {
    const data = async () => {
      const savedUser = await AsyncStorage.getItem('user');
      console.log('Saved user:', savedUser);
    };
    data();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />
      <ImageBackground
        source={AppImages.Rectangle}
        style={styles.RectangleImg}
        resizeMode="cover"
      >
        <View style={styles.backgroundInnerView}>

          <View style={styles.headingsAlign}>
            <Text style={styles.h1}>Choose Your Role</Text>
            <Text style={styles.h4}>Select how you want to use the app</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.profileView}>
        <Image source={AppImages.profileAvatar} style={styles.profileImage} />
      </View>

      <View style={styles.cardView}>
        {/* ------------------admin---------------------- */}
        <TouchableOpacity
          style={[
            styles.card,
            {
              backgroundColor:
                selected === 1 ? AppColors.primary : AppColors.cardLight,
            },
          ]}
          activeOpacity={0.8}
          onPress={() => setSelected(1)}
        >
          <View style={styles.view1}>

            <Icon
              name="admin-panel-settings"
              size={28}
              color={selected === 1 ? AppColors.title : AppColors.link}
            />
            <Text
              style={[
                styles.card_h2,
                { color: selected === 1 ? AppColors.title : AppColors.primary },
              ]}
            >
              Admin
            </Text>
          </View>

          <Text
            style={[
              styles.card_h4,
              { color: selected === 1 ? AppColors.title : AppColors.link },
            ]}
          >
            Manage BCs and members
          </Text>
        </TouchableOpacity>
        {/* ------------------member------------------- */}

        <TouchableOpacity
          style={[
            styles.card2,
            {
              backgroundColor:
                selected === 2 ? AppColors.primary : AppColors.cardLight,
            },
          ]}
          activeOpacity={0.8}
          onPress={() => setSelected(2)}
        >
          <View style={styles.view2}>

            <Icon
              name="groups"
              size={28}
              color={selected === 2 ? AppColors.title : AppColors.link}
            />

            <Text
              style={[
                styles.card2_h2,
                { color: selected === 2 ? AppColors.title : AppColors.link },
              ]}
            >
              Member
            </Text>
          </View>

          <Text
            style={[
              styles.card2_h4,
              { color: selected === 2 ? AppColors.title : AppColors.link },
            ]}
          >
            Join BCs and pay monthly installments
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnView}>
        <CustomButton title="Continue" onPress={handleContinue} />
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background
  },
  RectangleImg: {
    width: '100%',
    height: '250@vs',

    justifyContent: 'center',
  },

  backgroundInnerView: {
    height: '150@vs',
  },
  headingsAlign: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  h1: {
    fontSize: moderateScale(24),
    color: AppColors.title,
    padding: 5,
    fontWeight: '700',
  },
  h4: {
    fontSize: moderateScale(18),
    color: AppColors.title,
    opacity: 0.9,
  },
  arrowBTNView: {
    width: '100%',
  },
  backIcon: {
    width: '20%',
    resizeMode: 'contain',
  },
  profileView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100,
  },
  profileImage: {
    width: screenWidth * 0.45,
    height: screenWidth * 0.45,
    resizeMode: 'contain',
    borderColor: '#fff',
    borderWidth: 8,
    borderRadius: (screenWidth * 0.45) / 2,
    elevation: 3,
  },
  cardView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  card: {
    backgroundColor: AppColors.primary,
    width: '80%',
    height: 120,
    borderRadius: 15,
    padding: 15,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  view1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  cardIcon: {
    width: '20%',
    height: 30,
    resizeMode: 'contain',
  },
  card_h2: {
    color: AppColors.title,
    fontSize: moderateScale(20),
    fontWeight: '700',

  },
  card_h4: {
    color: AppColors.subtitle,
    fontSize: moderateScale(16),
    padding: 10,
  },
  //--------------------------------
  cardView2: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  card2: {
    backgroundColor: AppColors.cardLight,
    width: '80%',
    height: 120,
    borderRadius: 15,
    padding: 15,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  view2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  cardIcon2: {
    width: '20%',
    height: 30,
    resizeMode: 'contain',
  },
  card2_h2: {
    color: AppColors.primary,
    fontSize: moderateScale(20),
    fontWeight: '700',
    padding: 5
  },
  card2_h4: {
    color: AppColors.link,
    fontSize: moderateScale(16),
    textAlign: 'center',

    padding: 5,
  },
  btnView: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 20,
  },
});

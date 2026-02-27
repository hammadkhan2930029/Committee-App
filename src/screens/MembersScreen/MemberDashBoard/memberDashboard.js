import React, { useCallback, useEffect, useState } from 'react';
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
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { navigate } from '../../../navigations/navigationService';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getStoredUser } from '../../../Utils/getUser';
import { api } from '../../../services/api';
import { Loader } from '../../Loader/loader';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withRepeat,
} from 'react-native-reanimated';

export const MembersDashboard = () => {
  const navigation = useNavigation();
  const [userdata, setUserdata] = useState();
  const [notifyList, setNotifyList] = useState([]);
  const [committeeList, setCommitteeList] = useState([]);
  const [upComingList, setUpcomingList] = useState([]);

  const [loading, setLoading] = useState(true);

  //-----------get user aysnc Storage------------------
  useFocusEffect(
    useCallback(() => {
      const loader = async () => {
        const user = await getStoredUser();
        if (user) {
          setUserdata(user);
          console.log('user', user);
        }
      };
      loader();
    }, []),
  );
  const userID = userdata?.user_id;

  //--------------------------------------------------------
  const notificationsApi = async () => {
    try {
      const response = await api.get(
        `/user/view-notifications/${userdata.user_id}`,
      );
      const result = response.data.msg;

      if (response.data.code === '200') {
        setNotifyList(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      notificationsApi();
    }, [userdata]),
  );

  //-----------------myCommitteeList---------------------------
  const myCommitteeList = async () => {
    try {
      const response = await api.get(`/user/my-committees/${userID}`);
      const result = response?.data?.msg;

      setCommitteeList(result);
      if (result) {
        setLoading(false);
      }
    } catch (error) {
      console.log('try catch error :', error);
    }
  };

  //--------------------------------------------------------
  const UserPaymentHistory = async () => {
    try {
      const response = await api.get(
        `/user/view-committee-payments/list/${userID}`,
      );
      const result = response?.data?.msg;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (userID) {
      myCommitteeList();
      UserPaymentHistory();
    }
  }, [userID]);

  //-------------------------------------------------------
  const upComingPaymentsFun = async () => {
    try {
      const response = await api.get(
        `/user/upcoming-committee-payments/${userID}`,
      );
      const result = response?.data?.msg[0];
      console.log('upcoming  :', result);
      if (result) {
        setUpcomingList(result);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (userID) {
      upComingPaymentsFun();
    }
  }, [userID]);

  console.log('upComingList :', upComingList);
  //------------------------------------------------------
  const formatNumber = value => {
    if (value === null || value === undefined) return '';

    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  //------------------Animation by notification icon------------------------------------

  const ring = useSharedValue(0);

  const triggerBellRing = () => {
    ring.value = withSequence(
      withTiming(-15, { duration: 80 }),
      withTiming(15, { duration: 80 }),
      withTiming(-10, { duration: 80 }),
      withTiming(10, { duration: 80 }),
      withTiming(-5, { duration: 80 }),
      withTiming(5, { duration: 80 }),
      withTiming(0, { duration: 80 }),

      // Repeat sequence 3 times
      withTiming(-15, { duration: 80 }),
      withTiming(15, { duration: 80 }),
      withTiming(-10, { duration: 80 }),
      withTiming(10, { duration: 80 }),
      withTiming(-5, { duration: 80 }),
      withTiming(5, { duration: 80 }),
      withTiming(0, { duration: 80 }),

      withTiming(-15, { duration: 80 }),
      withTiming(15, { duration: 80 }),
      withTiming(-10, { duration: 80 }),
      withTiming(10, { duration: 80 }),
      withTiming(-5, { duration: 80 }),
      withTiming(5, { duration: 80 }),
      withTiming(0, { duration: 80 }),
    );
  };
  const ringStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${ring.value}deg` }],
    };
  });

  useEffect(() => {
    if (notifyList.length > 0) {
      triggerBellRing(); 
    }
  }, [notifyList]);
  //------------------------animation by notification waving hand---------------------------------
  const wave = useSharedValue(0);

  const triggerHandWave = () => {
    wave.value = withSequence(
      withTiming(-20, { duration: 150 }),
      withTiming(20, { duration: 150 }),
      withTiming(-15, { duration: 150 }),
      withTiming(15, { duration: 150 }),
      withTiming(-10, { duration: 150 }),
      withTiming(10, { duration: 150 }),
      withTiming(0, { duration: 150 }),

      // 2nd wave
      withTiming(-20, { duration: 150 }),
      withTiming(20, { duration: 150 }),
      withTiming(-15, { duration: 150 }),
      withTiming(15, { duration: 150 }),
      withTiming(-10, { duration: 150 }),
      withTiming(10, { duration: 150 }),
      withTiming(0, { duration: 150 }),

      // 3rd wave
      withTiming(-20, { duration: 150 }),
      withTiming(20, { duration: 150 }),
      withTiming(-15, { duration: 150 }),
      withTiming(15, { duration: 150 }),
      withTiming(-10, { duration: 150 }),
      withTiming(10, { duration: 150 }),
      withTiming(0, { duration: 150 }),
    );
  };
  const waveStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${wave.value}deg` }],
    };
  });
  useEffect(() => {
    triggerHandWave(); 
  }, []);

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
                <Text style={styles.h1}>Dashboard</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('AdminProfile')}
                >
                  <Image
                    source={AppImages.profileAvatar}
                    style={styles.avatar}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.nameAndNotifiView}>
                <View style={styles.textView}>
                  <Text style={styles.h2}>
                    Hello, {userdata?.full_name || 'Member'}{' '}
                    <Animated.View style={[waveStyle, { marginLeft: 5 }]}>
                      <Icon name="waving-hand" size={30} color="#FED22D" />
                    </Animated.View>
                  </Text>
                  <Text style={styles.h4}>Here’s your BC overview.</Text>
                </View>
                <TouchableOpacity
                  style={styles.notificationsView}
                  onPress={() => navigation.navigate('Notifications')}
                >
                  <Animated.View style={ringStyle}>
                    <Icon
                      name="notifications-active"
                      size={30}
                      color="#FED22D"
                    />
                  </Animated.View>
                  <Text style={styles.counterText}>
                    {notifyList.length > 0 ? notifyList.length : '0'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
        {/* ---------------------------------------------- */}
        <View style={styles.Dashboardcard_View}>
          {/* -------Active BCs------- */}

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ActiveBCs')}
            style={styles.Dashboardcard}
          >
            <View>
              <View style={styles.imgText}>
                <Icon name="person-add-alt" size={34} color={AppColors.link} />
                <Text style={styles.activeBC}>My Active BCs</Text>
              </View>
            </View>
            <View style={styles.view2}>
              <Text style={styles.activeBC_details}>
                {committeeList?.length || 0} BCs you’ve joined
              </Text>
              <View style={styles.counter}>
                <Text style={styles.counter_text}>
                  {committeeList?.length || 0}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* -------Upcoming payments------- */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.Dashboardcard}
            onPress={() => navigation.navigate('UpComingPayments')}
          >
            <View>
              <View style={styles.imgText}>
                <Icon name="calendar-today" size={34} color={AppColors.link} />
                <Text style={styles.activeBC}>Upcoming Payment</Text>
              </View>
            </View>
            <View style={styles.view2}>
              <Text style={styles.activeBC_details}>
                {`Due on ${upComingList?.due_date || ''}`}{' '}
              </Text>
              <Text style={styles.counter_text2}>{`PKR ${formatNumber(
                upComingList?.committee_amount || '',
              )}`}</Text>
            </View>
          </TouchableOpacity>
          {/* -------Pending Payments------- */}
          {/* <TouchableOpacity
            activeOpacity={0.7}
            style={styles.Dashboardcard}
            onPress={() => navigation.navigate('PaymentHistory')}
          >
            <View>
              <View style={styles.imgText}>
                <Icon name="cloud-upload" size={34} color={AppColors.link} />

                <Text style={styles.activeBC}>Slip Status</Text>
              </View>
            </View>
            <View style={styles.view2}>
              <Text style={styles.activeBC_details}>Verification pending</Text>
              <View style={styles.btnView}>
                <Text style={styles.btn}>Pending</Text>
              </View>
            </View>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
      <Loader visible={loading} />
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
    width: '75%',
    padding: 8,
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
  //-----------------------------
  nameAndNotifiView: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  notificationsView: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: AppColors.background,
    width: 70,
    borderRadius: 25,
    padding: 5,
    elevation: 5,
  },
  counterText: {
    fontSize: moderateScale(18),
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
  view2: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
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
  btnView: {
    backgroundColor: AppColors.primary,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 15,
  },
  btn: {
    color: AppColors.title,
    fontSize: moderateScale(16),
    padding: 3,
  },
});

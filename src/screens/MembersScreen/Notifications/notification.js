import React, { useCallback, useEffect, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { AppColors } from '../../../constant/appColors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppImages } from '../../../constant/appImages';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { api } from '../../../services/api';
import { getStoredUser } from '../../../Utils/getUser';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { CustomButton } from '../../../components/customButton';

export const Notifications = () => {
  const navigation = useNavigation();

  //------------------------------------------------------------
  const [loading, setLoading] = useState(true);
  const [notifyList, setNotifyList] = useState([]);
  //-----------get user aysnc Storage------------------
  const [userdata, setUserdata] = useState();
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

  //------------------------------------------------------------

  const notificationsApi = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/user/view-notifications/${userdata.user_id}`,
      );
      const result = response.data.msg;
      console.log(response);
      if (response.data.code === '200') {
        setNotifyList(result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (userdata?.full_name) {
      notificationsApi();
    }
  }, [userdata]);
  console.log('notify list :', notifyList);

  //------------------------------------------------------------

  const markNotification = async id => {
    console.log('ID', id);
    try {
      const response = await api.get(`/user/mark-as-read/notifications/${id}`);
      console.log('mark as read :', response.data.msg[0]);
      const result = response?.data?.msg[0]?.response;
      if (response.data.code === '200') {
        Toast.show({
          type: 'customToast',
          text1: 'Success',
          text2: response.data.msg[0].response,
          props: {
            bgColor: AppColors.background,
            borderColor: 'green',
          },
        });
        notificationsApi();
        setNotifyList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(notifyList);
  //------------------------------------------------------------

  const renderNotification = ({ item }) => {
    return (
      <View>
        <View
          style={[
            styles.notificationCard,
            { backgroundColor: AppColors.background },
          ]}
        >
          <Text style={styles.notificationTitle}>{item.from}</Text>
          <Text style={styles.notificationMessage}>{item.notification}</Text>
          <Text style={styles.notificationDate}>{item.noti_date}</Text>
        </View>
      </View>
    );
  };

  const MySkeleton = () => {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: 'transparent' }}>
        {[...Array(6)].map((_, index) => (
          <View
            key={index}
            style={{
              backgroundColor: 'white',
              marginHorizontal: 10,
              marginVertical: 8,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: AppColors.primary,
              borderLeftWidth: 5,
              borderLeftColor: AppColors.primary,
              padding: 15,
            }}
          >
            <SkeletonPlaceholder
              backgroundColor="#E0E0E0"
              highlightColor="#F5F5F5"
            >
              <SkeletonPlaceholder.Item
                width={120}
                height={25}
                borderRadius={10}
              />
              <SkeletonPlaceholder.Item
                width={200}
                height={20}
                borderRadius={10}
                marginTop={6}
              />
              <SkeletonPlaceholder.Item
                width={100}
                height={20}
                borderRadius={10}
                marginTop={10}
                alignSelf="flex-end"
              />
            </SkeletonPlaceholder>
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />
      <View>
        <ImageBackground
          source={AppImages.Rectangle}
          style={styles.RectangleImg}
          resizeMode="cover"
        >
          <View style={styles.main}>
            <View style={styles.TopView}>
              <View
                style={{
                  justifyContent: 'start',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon
                    name="arrow-circle-left"
                    size={28}
                    color={AppColors.title}
                  />
                </TouchableOpacity>
                <Text style={styles.h1}>Notifications</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('AdminProfile')}
              >
                <Image source={AppImages.profileAvatar} style={styles.avatar} />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.list}>
        <View style={styles.container2}>
          <FlatList
            data={loading ? [] : notifyList}
            ListEmptyComponent={
              loading ? (
                <MySkeleton />
              ) : (
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: moderateScale(16),
                    marginTop: 50,
                  }}
                >
                  No Notifications
                </Text>
              )
            }
            renderItem={renderNotification}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
        {notifyList && (
          <View style={styles.btnView}>
            <CustomButton
              title="Mark All as Read"
              onPress={() => markNotification(userdata.user_id)}
            />
          </View>
        )}
      </View>
    </View>
  );
};
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
    position: 'relative',
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
    marginTop: 10,
  },
  h1: {
    fontSize: moderateScale(24),
    color: AppColors.title,
    fontWeight: '600',
    paddingLeft: 6,
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
  //-----------------------------
  nameAndNotifiView: {
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
  //-------------------------------
  container2: {
    marginTop: hp('-5%'),
    // backgroundColor: 'green',
  },
  notificationCard: {
    backgroundColor: AppColors.background,
    width: wp('90%'),

    borderRadius: wp('3%'),
    marginVertical: hp('1%'),
    elevation: 3,
    alignSelf: 'center',
    padding: 15,
    borderLeftColor: 'green',
    borderLeftWidth: 5,
  },
  notificationTitle: {
    fontSize: RFValue(16),
    fontWeight: '600',
    color: '#000',
  },
  notificationMessage: {
    fontSize: RFValue(16),
    color: AppColors.blackText,
    marginTop: hp('0.5%'),
  },
  notificationDate: {
    color: AppColors.link,
    fontSize: RFValue(14),
    marginTop: hp('0.5%'),
    textAlign: 'right',
  },

  skeletonWrapper: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 5,
  },

  skeletonCard: {
    width: '100%',
    backgroundColor: AppColors.background,
    marginTop: 15,
    padding: 12,
    elevation: 5,
    borderRadius: 15,
    borderleftColor: 'gray',
    borderLeftWidth: 5,
  },
  list: {},
  btnView: {
    position: 'absolute',
    width: '95%',
    alignSelf: 'center',
    bottom: -100,
  },
});

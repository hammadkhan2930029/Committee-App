import {
  ScrollView,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { AppImages } from '../../../constant/appImages';
import { AppIcons } from '../../../constant/appIcons';
import { AppColors } from '../../../constant/appColors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { api } from '../../../services/api';
import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getStoredUser } from '../../../Utils/getUser';
import { navigate } from '../../../navigations/navigationService';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const ActiveBCs = () => {
  const [committeeList, setCommitteeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState();
  //-----------------get user data --------------------

  useFocusEffect(
    useCallback(() => {
      const loadUser = async () => {
        const user = await getStoredUser();
        if (user) {
          setUserData(user);
        }
      };
      loadUser();
    }, []),
  );
  const userID = userData?.user_id;
  console.log(userID);
  //-----------------------------------------------------------
  const formatNumber = value => {
    if (value === null || value === undefined) return '';

    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  //-----------------myCommitteeList---------------------------
  const myCommitteeList = async () => {
    try {
      const response = await api.get(`/user/my-committees/${userID}`);
      const result = response?.data?.msg;
      console.log('my committee list :', result);
      setCommitteeList(result);
      if (result) {
        setLoading(false);
      }
    } catch (error) {
      console.log('try catch error :', error);
    }
  };
  useEffect(() => {
    if (userID) {
      myCommitteeList();
    }
  }, [userID]);
  //----------------------Skeleton-----------------------------
  const MySkeleton = () => {
    return (
      <View>
        {[...Array(6)].map((_, index) => (
          <View
            style={{
              backgroundColor: AppColors.background,
              padding: 10,
              borderRadius: 20,
              margin: 10,
              borderColor: AppColors.placeholder,
              borderWidth: 1,
              elevation: 5,
              width: '95%',
            }}
          >
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item
                justifyContent="center"
                alignItems="center"
              >
                <SkeletonPlaceholder.Item
                  width={'100%'}
                  padding={10}
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  {/* Text */}
                  <SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item
                      width={120}
                      height={20}
                      borderRadius={4}
                    />
                    <SkeletonPlaceholder.Item
                      marginTop={6}
                      width={80}
                      height={20}
                      borderRadius={4}
                    />
                    <SkeletonPlaceholder.Item
                      marginTop={6}
                      width={80}
                      height={20}
                      borderRadius={4}
                    />
                  </SkeletonPlaceholder.Item>
                  <SkeletonPlaceholder.Item
                    justifyContent="flex-end"
                    alignItems="flex-end"
                  >
                    <SkeletonPlaceholder.Item
                      width={80}
                      height={25}
                      borderRadius={30}
                    />
                    <SkeletonPlaceholder.Item
                      marginTop={6}
                      width={120}
                      height={20}
                      borderRadius={4}
                    />
                    <SkeletonPlaceholder.Item
                      marginTop={6}
                      width={80}
                      height={20}
                      borderRadius={4}
                    />
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          </View>
        ))}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />

      <View>
        <ImageBackground
          source={AppImages.Rectangle}
          style={styles.RectangleImg}
        >
          <View style={styles.main}>
            <View style={styles.TopView}>
              <View style={styles.backAndText}>
                <TouchableOpacity >
                 <Icon
                      name="arrow-circle-left"
                      size={28}
                      color={AppColors.title}
                    />
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
      {loading ? (
        <MySkeleton />
      ) : (
        <View style={styles.Committee_View}>
          <FlatList
            data={committeeList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={item => {
              console.log('item :', item.item);
              const data = item.item;
              return (
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      navigate('UserCommitteeDetails', { data: data })
                    }
                  >
                    <View
                      style={[
                        styles.Dashboardcard,
                        { display: data.name ? 'flex' : 'none' },
                      ]}
                    >
                      <View style={styles.first_view}>
                        <View>
                          <Text style={styles.family}>{data.name}</Text>
                        </View>
                        <TouchableOpacity style={styles.BtnActive}>
                          <Text style={styles.active}>{data.status}</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.first_view}>
                        <View style={styles.details}>
                          <Text style={styles.one}>Members : </Text>
                          <Text style={styles.count}> {data.total_member}</Text>
                        </View>
                        <View style={styles.details}>
                          <Text style={styles.one}>Amount per Member :</Text>
                          <Text style={styles.count}>
                            {' '}
                            {formatNumber(data.amount_per_member)}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.first_view}>
                        <View style={styles.details}>
                          <Text style={styles.one}>Round : </Text>
                          <Text style={styles.count}> {data.total_rounds}</Text>
                        </View>
                        <View style={styles.details}>
                          <Text style={styles.one}>Start Date :</Text>
                          <Text style={styles.count}> {data.start_date}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={[
                      styles.dataEmpty,
                      { display: data.name ? 'none' : 'flex' },
                    ]}
                  >
                    <Text style={styles.emptyText}>Data not available</Text>
                  </View>
                </View>
              );
            }}
            ListEmptyComponent={() => (
              <View style={styles.dataEmpty}>
                <Text style={styles.emptyText}>Data not available</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  arrowBack: {
    width: 28,
    height: 28,
  },
  arrowIcon: {
    backgroundColor: AppColors.background,
    borderRadius: 20,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginLeft: 6,
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
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -40,
  },
  Dashboardcard: {
    width: '95%',
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
    width: 100,
  },
  complete: {
    fontSize: moderateScale(15),
    color: AppColors.title,
    paddingLeft: 7,
    paddingRight: 7,
    textAlign: 'center',
  },
  BtnActive: {
    backgroundColor: AppColors.cardLight,
    borderRadius: 20,
    padding: 5,
    borderColor: AppColors.primary,
    borderWidth: 1,
    width: 100,
  },
  active: {
    fontSize: moderateScale(15),
    color: AppColors.link,
    paddingLeft: 7,
    paddingRight: 7,
    textAlign: 'center',
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
  dataEmpty: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginTop: 50,
  },
  emptyText: {
    fontSize: moderateScale(18),
    color: AppColors.placeholder,
  },
});

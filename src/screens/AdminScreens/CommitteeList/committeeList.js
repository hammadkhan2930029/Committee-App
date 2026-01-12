import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StatusBar,
  ImageBackground,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { AppColors } from '../../../constant/appColors';
import { AppImages } from '../../../constant/appImages';
import { AppIcons } from '../../../constant/appIcons';
import { CustomButton } from '../../../components/customButton';
import { navigate } from '../../../navigations/navigationService';
import { useFocusEffect } from '@react-navigation/native';
import { getStoredUser } from '../../../Utils/getUser';
import { api } from '../../../services/api';
import { Loader } from '../../Loader/loader';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const CommitteeList = () => {
  const [loading, setLoading] = useState(false);
  const [listView, setListView] = useState([]);
  //----------------------------------------------
  const [userData, setUserData] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const loadUser = async () => {
        const user = await getStoredUser();
        if (user) {
          setUserData(user);
          console.log(user.full_name, user.user_id);
        }
      };
      loadUser();
    }, []),
  );
  //----------get committee list----------------------

  const committeeList = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/user/view-committees/${userData.user_id}`,
      );

      setListView(response.data.msg);
      if (response.data.msg) {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    committeeList();
  }, [userData]);

  //----------------------Skeleton-----------------------------
  const MySkeleton = () => {
    return (
      <View>
        {[...Array(6)].map((_, index) => (
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
              justifyContent="center"
              alignItems="center"
            >
              <View
                style={{
                  backgroundColor: AppColors.background,
                  padding: 10,
                  elevation: 5,
                  borderRadius: 20,
                  margin: 10,
                  borderColor: AppColors.primary,
                  borderWidth: 1,
                  height: 420,
                  width: '95%',
                  height: 120,
                }}
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
              </View>
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />
      <View style={styles.addView}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigate('CreateCommittee')}
        >
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
        {loading ? (
          <MySkeleton />
        ) : (
          <View style={styles.Committee_View}>
            <FlatList
              data={listView}
              keyExtractor={(item, index) =>
                item?.id.toString() || index.toString()
              }
              renderItem={item => {
                const datalist = item.item;
                return (
                  <View style={styles.Committee_View}>
                    <TouchableOpacity
                      onPress={() =>
                        navigate('CommitteeDetails', { id: datalist.id })
                      }
                    >
                      <View style={styles.Dashboardcard}>
                        <View style={styles.first_view}>
                          <View>
                            <Text style={styles.family}>{datalist.name}</Text>
                          </View>
                          <TouchableOpacity
                            style={
                              datalist.status === 'Active'
                                ? styles.BtnActive
                                : styles.Btncomplete
                            }
                          >
                            <Text style={styles.complete}>
                              {datalist.status}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.first_view}>
                          <View style={styles.details}>
                            <Text style={styles.one}>Members :</Text>
                            <Text style={styles.count}>
                              {' '}
                              {datalist.total_member}
                            </Text>
                          </View>
                          <View style={styles.details}>
                            <Text style={styles.one}>Amount per Member :</Text>
                            <Text style={styles.count}>
                              {' '}
                              {datalist.amount_per_member}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.first_view}>
                          <View style={styles.details}>
                            <Text style={styles.one}>Round :</Text>
                            <Text style={styles.count}>
                              {' '}
                              {datalist.total_rounds}
                            </Text>
                          </View>
                          <View style={styles.details}>
                            <Text style={styles.one}>Start Date :</Text>
                            <Text style={styles.count}>
                              {' '}
                              {datalist.start_date}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        )}

        {/* ------------------------------------------------------------------------- */}
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
    backgroundColor: 'green',
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
    backgroundColor: AppColors.primary,

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

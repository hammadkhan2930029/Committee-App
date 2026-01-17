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
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { api } from '../../../services/api';
import { getStoredUser } from '../../../Utils/getUser';


export const CommitteeUserList = () => {
  const [userdata, setUserData] = useState();
  const [userList, setUserList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  //-----------------get data--------------------

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

  //-----------------user list------------------------
  const userViewUsers = async () => {
    if (!userdata?.user_id) return; // safeguard
    console.log(userdata.user_id);
    try {
      const response = await api.get(`/user/view-users/${userdata.user_id}`);
      console.log('response:', response.data.msg);
      if (Array.isArray(response.data.msg)) {
        setUserList(response.data.msg);
      } else {
        setUserList([]);
      }
    } catch (error) {
      console.log('error :', error);
    }
  };

  // useEffect(() => {
  //   if (userdata?.user_id) {
  //     userViewUsers();
  //   }
  // }, [userdata]);
  console.log(userList);
  useFocusEffect(
    useCallback(() => {
      userViewUsers();
    }, [userdata?.user_id]),
  );
  //---------------------------------------------

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />
      <View style={styles.addView}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('CreateMembers')}
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
                  <Text style={styles.h1}>Users</Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('AdminProfile')}
                >
                  <Image
                    source={AppImages.profileAvatar}
                    style={styles.avatar}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.textView}>
                <Text style={styles.h4}>Manage all users and view </Text>
                <Text style={styles.h4}>their joined BCs below.</Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* ---------------------------------------------- */}
        <FlatList
          data={userList}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          renderItem={({ item }) => (
            <View style={styles.Committee_View}>
              <TouchableOpacity
                style={[
                  styles.Dashboardcard,
                  { display: item.name ? 'flex' : 'none' },
                ]}
                onPress={() =>
                  navigation.navigate('MembersDetails', { item: item })
                }
              >
                <View style={styles.first_view}>
                  <View style={styles.userMale_View}>
                    <Image source={AppIcons.userMale} style={styles.userMale} />
                  </View>
                  <View>
                    <Text style={styles.Name}>{item.name}</Text>
                  </View>
                </View>
                <View style={styles.first_view}>
                  <View style={styles.details}>
                    <Text style={styles.one}>Phone:</Text>
                    <Text style={styles.count}>{item.phone}</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <View
                style={[
                  styles.dataEmpty,
                  { display: item.name ? 'none' : 'flex' },
                ]}
              >
                <Text style={styles.emptyText}>Data not available</Text>
              </View>
            </View>
          )}
        />
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
  //----------------------------
  dataEmpty: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  emptyText: {
    fontSize: moderateScale(18),
    color: AppColors.placeholder,
  },
});

import {
  StatusBar,
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { AppColors } from '../../../constant/appColors';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppIcons } from '../../../constant/appIcons';
import { AppImages } from '../../../constant/appImages';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { api } from '../../../services/api';
import { useCallback, useEffect, useState } from 'react';
import { getStoredUser } from '../../../Utils/getUser';
import { Loader } from '../../Loader/loader';
import { CustomButton } from '../../../components/customButton';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const UpComingPayments = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState();
  const [history, setHistory] = useState([]);
  const [loading, setLoding] = useState(true);
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
  //------------------------------------------------------
  const formatNumber = value => {
    if (value === null || value === undefined) return '';

    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  //------------------------------------------------------

  const upComingPaymentsFun = async () => {
    try {
      const response = await api.get(
        `/user/upcoming-committee-payments/${userID}`,
      );
      const result = response?.data?.msg;
      console.log('upcoming  :', result);
      if (result) {
        setHistory(result);
        setLoding(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoding(false);
    }
  };
  useEffect(() => {
    if (userID) {
      upComingPaymentsFun();
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
              width: '95%',
              elevation: 5,
            }}
          >
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item
                justifyContent="center"
                alignItems="center"
                backgroundColor={AppColors.background}
                elevation={5}
              >
                {/* Text */}
                <SkeletonPlaceholder.Item
                  width={'100%'}
                  padding={10}
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <SkeletonPlaceholder.Item
                    width={120}
                    height={20}
                    borderRadius={4}
                  />
                  <SkeletonPlaceholder.Item
                    marginTop={6}
                    width={80}
                    height={20}
                    borderRadius={10}
                  />
                </SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item
                  width={'100%'}
                  paddingLeft={10}
                  paddingRight={10}
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <SkeletonPlaceholder.Item
                    width={80}
                    height={20}
                    borderRadius={4}
                  />
                  <SkeletonPlaceholder.Item
                    marginTop={6}
                    width={60}
                    height={20}
                    borderRadius={4}
                  />
                </SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item
                  width={'100%'}
                  paddingLeft={10}
                  paddingRight={10}
                  paddingTop={8}
                >
                  <SkeletonPlaceholder.Item
                    width={'100%'}
                    height={3}
                    borderRadius={4}
                  />
                </SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item
                  width={'100%'}
                  paddingLeft={10}
                  paddingRight={10}
                  paddingTop={8}
                  justifyContent="center"
                  alignItems="center"
                >
                  <SkeletonPlaceholder.Item
                    width={60}
                    height={20}
                    borderRadius={4}
                  />
                  <SkeletonPlaceholder.Item
                    marginTop={6}
                    width={120}
                    height={20}
                    borderRadius={4}
                  />
                </SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item
                  width={'100%'}
                  paddingLeft={10}
                  paddingRight={10}
                  paddingTop={8}
                >
                  <SkeletonPlaceholder.Item
                    width={'100%'}
                    height={35}
                    borderRadius={10}
                  />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.conatiner}>
      <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />
      <ScrollView style={styles.scroll}>
        <View>
          <ImageBackground
            source={AppImages.Rectangle}
            style={styles.RectangleImg}
          >
            <View style={styles.main}>
              <View style={styles.TopView}>
                <View style={styles.backAndText}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon
                      name="arrow-circle-left"
                      size={28}
                      color={AppColors.title}
                    />
                  </TouchableOpacity>
                  <Text style={styles.h1}>Upcoming Payments</Text>
                </View>
              </View>
              <View style={styles.textView}>
                <Text style={styles.h4}>View all your upcoming payments.</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        {loading ? (
          <MySkeleton />
        ) : (
          <View style={styles.pymentsCardView}>
            <FlatList
              data={history}
              keyExtractor={(item, index) => index.toString()}
              renderItem={item => {
                const items = item?.item;
                return (
                  <View>
                    <Text
                      style={[
                        styles.msg,
                        { display: items.committee_name ? 'none' : 'flex' },
                      ]}
                    >
                      Data not available
                    </Text>

                    <View
                      style={[
                        styles.card_view,
                        { display: items.committee_name ? 'flex' : 'none' },
                      ]}
                    >
                      <View style={styles.card}>
                        <View style={styles.header}>
                          <View style={styles.cardHeader}>
                            <Text style={styles.name}>
                              {items.committee_name}
                            </Text>
                            <Text style={styles.month}>
                              {items.round_month}
                            </Text>
                          </View>
                          <View style={styles.monthView}>
                            <Text style={styles.month}>
                              Round# {items.round_no}
                            </Text>
                            <Text style={styles.amountPermember}>
                              Amount : {formatNumber(items.committee_amount)}
                            </Text>

                            
                          </View>
                        </View>
                        

                        <View style={styles.btnView}>
                          <CustomButton
                            title="Payment Now"
                            onPress={() =>
                              navigation.navigate('UploadSlip', {
                                singleRoundAmount: items.committee_amount,
                                amount: items.committee_amount,
                                memberCount: items.round_no,
                                data: item.item,
                              })
                            }
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};
const styles = ScaledSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  arrowBack: {
    backgroundColor: AppColors.background,
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
    padding: 15,
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
  pymentsCardView: {
    marginTop: -50,
  },
  card_view: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 10,
  },
  card: {
    width: '90%',
    backgroundColor: AppColors.background,
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 10,
    borderRadius: 20,
    borderColor: AppColors.primary,
    borderWidth: 1,
    marginTop: 8,
    elevation: 3,
  },

  //---------------------------------
 
  cardHeader: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
  },
  name: {
    color: AppColors.blackText,
    fontSize: moderateScale(18),
    fontWeight: '700',
  },
  status_view: {
    width: 80,
    backgroundColor: AppColors.primary,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    elevation: 5,
  },
  status_text: {
    color: AppColors.title,
    fontSize: moderateScale(16),
  },
  monthView: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
   
  },
  month: {
    fontSize: moderateScale(16),
    
  },
  amountPermember: {
    textAlign: 'center',
    fontSize: moderateScale(16),
    color: AppColors.link,
    padding: 3,
    fontWeight: '700',
  },
  amountPermemberText: {
    textAlign: 'center',
    fontSize: moderateScale(16),
    color: AppColors.bodyText,
    padding: 3,
  },
  btnView: {
    marginTop: 5,
  },
  msg: {
    textAlign: 'center',
    fontSize: moderateScale(16),
    padding: 15,
  },
  
});

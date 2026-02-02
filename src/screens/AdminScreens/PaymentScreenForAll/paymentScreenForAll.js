import React, { useCallback, useState } from 'react';
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
import { date } from 'yup';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { api } from '../../../services/api';
import { getStoredUser } from '../../../Utils/getUser';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Payments = ({ route }) => {
  //----------------------------------------------------

  const navigation = useNavigation();
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [paymentList, setPaymentList] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log('status check :', selectedStatus);
  //----------------------------------------------------
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

  //-----------------------------------------------------
  const formatNumber = value => {
    if (value === null || value === undefined) return '';

    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  //---------------------------------------------------

  const AdminpaymentList = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `/admin/view-committee-payments/list/${userData.user_id}`,
      );

      setPaymentList(response?.data?.msg || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      if (userData?.user_id) {
        AdminpaymentList();
      }
    }, [userData]),
  );

  console.log('paymentList :', paymentList[0]?.response);

  //---------------------------------------------
  //---------------------------------------------
  const validPayments = paymentList.filter(
    item => Number(item?.paid_amount) > 0,
  );

  const hasPayments = validPayments.length > 0;
  //------------------------------------------------
  const filterData =
    selectedStatus === 'All'
      ? validPayments
      : validPayments.filter(
          item => item?.status?.toLowerCase() === selectedStatus.toLowerCase(),
        );

  // const hasPayments = paymentList?.length > 0;

  // const filterData = hasPayments
  //   ? selectedStatus === 'All'
  //     ? paymentList
  //     : paymentList.filter(
  //         item => item?.status?.toLowerCase() === selectedStatus?.toLowerCase(),
  //       )
  //   : [];

  //----------------------------------------------

  const requestedlist = paymentList.filter(
    item => item?.status?.toLowerCase() === 'requested',
  );

  //------------------pending----------------------------

  const pendingList = paymentList.filter(
    item => item?.status?.toLowerCase() === 'pending',
  );
  const pendingAmount = hasPayments
    ? pendingList?.reduce((sum, item) => {
        return sum + Number(item?.paid_amount || 0);
      }, 0)
    : 0;

  //-----------------paid----------------------------------

  const paidList = paymentList.filter(
    item => item?.status?.toLowerCase() === 'paid',
  );
  const paidAmount = hasPayments
    ? paidList.reduce((sum, item) => {
        return sum + Number(item?.paid_amount || 0);
      }, 0)
    : 0;

  //-----------------------------------------------
  const summaryData = [
    {
      id: 2,
      title: 'Pending Amount',
      value: pendingAmount,
      subtitle: 'Awaiting payments',
      type: 'pending',
    },
    {
      id: 3,
      title: 'Pending Count',
      value: pendingList?.length || 0,
      subtitle: 'Awaiting payments',
      type: 'pending_count',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />

      <View>
        <ImageBackground
          source={AppImages.Rectangle2}
          style={styles.RectangleImg}
        >
          <View style={styles.main}>
            <View style={styles.TopView}>
              <View style={styles.backAndText}>
                <TouchableOpacity>
                  <Image source={AppIcons.arrowBack} style={styles.arrowBack} />
                </TouchableOpacity>
                <Text style={styles.h1}>Payments</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('AdminProfile')}
              >
                <Image source={AppImages.profileAvatar} style={styles.avatar} />
              </TouchableOpacity>
            </View>
            <View style={styles.textView}>
              <Text style={styles.h4}>Monitor all committee payments </Text>
              <Text style={styles.h4}>and pending amounts.</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
      {!hasPayments ? (
        <View style={{ alignItems: 'center', marginTop: 40 }}>
          <Text
            style={{
              fontSize: moderateScale(16),
              color: AppColors.bodyText,
            }}
          >
            No payments available yet
          </Text>
        </View>
      ) : (
        <View>
          <View style={styles.cardView}>
            <FlatList
              data={filterData}
              ListHeaderComponent={
                <>
                  <View style={styles.horizontalCards}>
                    <FlatList
                      data={summaryData}
                      horizontal
                      keyExtractor={item => item.id.toString()}
                      contentContainerStyle={{ paddingHorizontal: 15 }}
                      renderItem={({ item }) => (
                        <View style={styles.summaryCard}>
                          <View style={styles.cardHeader}>
                            <Icon
                              name={
                                item.type === 'pending'
                                  ? 'pending'
                                  : 'countertops'
                              }
                              size={28}
                              color={AppColors.link}
                            />
                            <Text style={styles.cardTitle}>{item.title}</Text>
                          </View>
                          <Text style={styles.cardValue}>
                            {formatNumber(item.value)}
                          </Text>

                          {/* Subtitle */}
                          <Text style={styles.cardSubtitle}>
                            {item.subtitle}
                          </Text>
                        </View>
                      )}
                    />
                  </View>
                  {/* ------------------------------------------------------- */}
                  <View style={styles.statuslistView}>
                    <FlatList
                      data={[
                        'All',
                        'verified',
                        'Pending',
                        'Overdue',
                        'Requested',
                      ]}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => {
                        const isSelected = selectedStatus === item;
                        return (
                          <TouchableOpacity
                            style={[
                              styles.statusList,
                              isSelected && styles.activeStatusList,
                            ]}
                            onPress={() => setSelectedStatus(item)}
                          >
                            <View style={styles.statusView}>
                              <Text
                                style={[
                                  styles.status,
                                  isSelected && styles.activeStatusText,
                                ]}
                              >
                                {item}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                </>
              }
              //----------------------------------------------
              keyExtractor={item => item?.payment_id?.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.cards}
                  onPress={() =>
                    navigation.navigate('PaymentDetails', { item: item })
                  }
                >
                  <View style={styles.left}>
                    <Text style={styles.name}>{item.payment_by}</Text>
                    <Text style={styles.fund}>{item.committe_name}</Text>

                    <View style={styles.amountView}>
                      <Text style={styles.amount}>Paid Amount :</Text>
                      <Text style={styles.amount2}>
                        {formatNumber(item.paid_amount)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.right}>
                    <View
                      style={[
                        item?.status?.toLowerCase() === 'verified'
                          ? styles.paid
                          : item?.status?.toLowerCase() === 'pending'
                          ? styles.pending
                          : item?.status?.toLowerCase() === 'Overdue'
                          ? styles.overDue
                          : item?.status?.toLowerCase() === 'requested'
                          ? styles.requested
                          : null,
                      ]}
                    >
                      <Text
                        style={[
                          styles.CardStatus,
                          {
                            color:
                              item?.status?.toLowerCase() === 'Overdue'
                                ? AppColors.bodyText
                                : AppColors.title,
                          },
                        ]}
                      >
                        {item.status}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.date}>{''}</Text>
                    </View>
                    <View style={styles.dateView}>
                      <Text style={styles.date}>Date :</Text>

                      <Text style={styles.date2}>{item.pay_date}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '50%',
  },
  h1: {
    fontSize: moderateScale(24),
    color: AppColors.title,
    fontWeight: '600',
    paddingLeft: 15,
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
  //---------------------------------

  summaryCard: {
    width: 200,
    height: 130,
    backgroundColor: AppColors.background,
    padding: 15,
    borderRadius: 15,
    elevation: 5,
    margin: 5,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardHeader: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    width: 28,
    resizeMode: 'contain',
  },
  cardTitle: {
    color: AppColors.blackText,
    fontSize: moderateScale(18),
    fontWeight: '600',
    paddingLeft: 3,
  },
  cardValue: {
    color: AppColors.link,
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  cardSubtitle: {
    color: AppColors.bodyText,
    fontSize: moderateScale(14),
  },
  //----------------------------------
  statuslistView: {
    padding: 8,
  },
  statusList: {
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
    width: 115,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    // marginLeft: 5,
    margin: 5,
  },

  activeStatusList: {
    backgroundColor: AppColors.primary,
  },

  status: {
    color: AppColors.blackText,
    fontSize: moderateScale(18),
    fontWeight: '500',
  },

  activeStatusText: {
    color: '#fff',
  },
  //--------------------------------------
  cardView: {
    marginTop: 5,
  },
  cards: {
    width: '95%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: AppColors.background,
    // margin: 10,
    marginTop: 10,
    padding: 15,
    borderRadius: 15,
    elevation: 3,
    borderWidth: 1,
    borderColor: AppColors.primary,
  },
  name: {
    fontSize: moderateScale(16),
    color: AppColors.bodyText,
    padding: 5,
  },

  fund: {
    fontSize: moderateScale(16),
    color: AppColors.bodyText,
    padding: 5,
  },
  amount: {
    fontSize: moderateScale(16),
    color: AppColors.bodyText,
    padding: 5,
  },
  amount2: {
    fontSize: moderateScale(16),
    color: AppColors.link,
    padding: 5,
  },
  amountView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  right: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  paid: {
    backgroundColor: 'green',

    borderRadius: 25,
    width: 100,
    elevation: 3,
  },
  pending: {
    backgroundColor: '#FFA800',
    borderRadius: 25,
    width: 100,
    elevation: 3,
  },
  overDue: {
    backgroundColor: AppColors.cardLight,
    borderRadius: 25,
    width: 100,
    elevation: 3,
  },
  requested: {
    backgroundColor: '#EC5800',
    borderRadius: 25,
    width: 100,
    elevation: 3,
  },
  CardStatus: {
    fontSize: moderateScale(16),
    padding: 5,
    textAlign: 'center',
  },
  dateView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: moderateScale(16),
    color: AppColors.bodyText,
    padding: 5,
  },
  date2: {
    fontSize: moderateScale(16),
    color: AppColors.link,
    padding: 5,
  },
});

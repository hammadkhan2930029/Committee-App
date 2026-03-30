// import React, { useCallback, useState } from 'react';
// import {
//   View,
//   StatusBar,
//   ImageBackground,
//   Image,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   FlatList,
// } from 'react-native';
// import { moderateScale, ScaledSheet } from 'react-native-size-matters';
// import { AppColors } from '../../../constant/appColors';
// import { AppImages } from '../../../constant/appImages';
// import { AppIcons } from '../../../constant/appIcons';
// import { date } from 'yup';
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import { api } from '../../../services/api';
// import { getStoredUser } from '../../../Utils/getUser';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

// export const Payments = ({ route }) => {
//   //----------------------------------------------------

//   const navigation = useNavigation();
//   const [selectedStatus, setSelectedStatus] = useState('All');
//   const [paymentList, setPaymentList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   console.log('status check :', selectedStatus);
//   //----------------------------------------------------
//   const [userData, setUserData] = useState(null);

//   useFocusEffect(
//     useCallback(() => {
//       const loadUser = async () => {
//         const user = await getStoredUser();
//         if (user) {
//           setUserData(user);
//           console.log(user.full_name, user.user_id);
//         }
//       };
//       loadUser();
//     }, []),
//   );

//   //-----------------------------------------------------
//   const formatNumber = value => {
//     if (value === null || value === undefined) return '';

//     return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//   };
//   //---------------------------------------------------

//   const AdminpaymentList = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get(
//         `/admin/view-committee-payments/list/${userData.user_id}`,
//       );

//       setPaymentList(response?.data?.msg || []);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useFocusEffect(
//     useCallback(() => {
//       if (userData?.user_id) {
//         AdminpaymentList();
//       }
//     }, [userData]),
//   );

//   console.log('paymentList :', paymentList[0]?.response);

//   //---------------------------------------------
//   const validPayments = paymentList.filter(
//     item => Number(item?.paid_amount) > 0,
//   );

//   const hasPayments = validPayments.length > 0;
//   //------------------------------------------------
//   const filterData =
//     selectedStatus === 'All'
//       ? validPayments
//       : validPayments.filter(
//         item => item?.status?.toLowerCase() === selectedStatus.toLowerCase(),
//       );

//   //----------------------------------------------

//   const requestedlist = paymentList.filter(
//     item => item?.status?.toLowerCase() === 'requested',
//   );

//   //------------------pending----------------------------

//   const pendingList = paymentList.filter(
//     item => item?.status?.toLowerCase() === 'pending',
//   );
//   const pendingAmount = hasPayments
//     ? pendingList?.reduce((sum, item) => {
//       return sum + Number(item?.paid_amount || 0);
//     }, 0)
//     : 0;

//   //-----------------paid----------------------------------

//   const paidList = paymentList.filter(
//     item => item?.status?.toLowerCase() === 'paid',
//   );
//   const paidAmount = hasPayments
//     ? paidList.reduce((sum, item) => {
//       return sum + Number(item?.paid_amount || 0);
//     }, 0)
//     : 0;

//   //-----------------------------------------------
//   const summaryData = [
//     {
//       id: 2,
//       title: 'Pending Amount',
//       value: pendingAmount,
//       subtitle: 'Awaiting payments',
//       type: 'pending',
//     },
//     {
//       id: 3,
//       title: 'Pending Count',
//       value: pendingList?.length || 0,
//       subtitle: 'Awaiting payments',
//       type: 'pending_count',
//     },
//   ];
//   //-------------first letter capital-----------------------
//   const capitalizeFirstLetter = (text) => {
//     if (!text) return '';
//     return text.charAt(0).toUpperCase() + text.slice(1)
//   }

//   //-----------------------------------------------------


//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />
//       <View style={styles.scrollView}>

//         {!hasPayments ? (
//           <View style={{ alignItems: 'center', marginTop: 40 }}>
//             <Text
//               style={{
//                 fontSize: moderateScale(16),
//                 color: AppColors.bodyText,
//               }}
//             >
//               No payments available yet
//             </Text>
//           </View>
//         ) : (
//           <View style={styles.cardView}>
//             <FlatList
//               data={filterData}
//               ListHeaderComponent={<View style={{ backgroundColor: AppColors.background }}>
//                 <ImageBackground
//                   source={AppImages.Rectangle2}
//                   style={styles.RectangleImg}
//                 >
//                   <View style={styles.main}>
//                     <View style={styles.TopView}>
//                       <View style={styles.backAndText}>
//                         <TouchableOpacity onPress={() => navigation.goBack()}>
//                           <Icon
//                             name="arrow-circle-left"
//                             size={28}
//                             color={AppColors.title}
//                           />
//                         </TouchableOpacity>
//                         <Text style={styles.h1}>Payments</Text>
//                       </View>
//                       <TouchableOpacity
//                         onPress={() => navigation.navigate('AdminProfile')}
//                       >
//                         <Image
//                           source={AppImages.profileAvatar}
//                           style={styles.avatar}
//                         />
//                       </TouchableOpacity>
//                     </View>
//                     <View style={styles.textView}>
//                       <Text style={styles.h4}>Monitor all committee payments </Text>
//                       <Text style={styles.h4}>and pending amounts.</Text>
//                     </View>
//                   </View>
//                 </ImageBackground>
//                 {/* ------------------------------------- */}
//                 <View style={styles.horizontalCards}>
//                   {summaryData.map((item, index) => {
//                     return (
//                       <View style={styles.summaryCard} key={index}>
//                         <View style={styles.cardHeader}>
//                           <Icon
//                             name={
//                               item.type === 'pending'
//                                 ? 'pending'
//                                 : 'countertops'
//                             }
//                             size={28}
//                             color={AppColors.link}
//                           />
//                           <Text style={styles.cardTitle}>{item.title}</Text>
//                         </View>
//                         <Text style={styles.cardValue}>
//                           {formatNumber(item.value)}
//                         </Text>

//                         <Text style={styles.cardSubtitle}>
//                           {item.subtitle}
//                         </Text>
//                       </View>
//                     );
//                   })}
//                 </View>

//                 {/* ------------------------------------------------------- */}
//                 <View style={styles.statuslistView}>
//                   <FlatList
//                     data={[
//                       'All',
//                       'Verified',
//                       'Pending',
//                       'Overdue',
//                       'Requested',
//                     ]}
//                     horizontal
//                     showsHorizontalScrollIndicator={false}
//                     keyExtractor={(item, index) => index.toString()}
//                     renderItem={({ item }) => {
//                       const isSelected = selectedStatus === item;
//                       return (
//                         <TouchableOpacity
//                           style={[
//                             styles.statusList,
//                             isSelected && styles.activeStatusList,
//                           ]}
//                           onPress={() => setSelectedStatus(item)}
//                         >
//                           <View style={styles.statusView}>
//                             <Text
//                               style={[
//                                 styles.status,
//                                 isSelected && styles.activeStatusText,
//                               ]}
//                             >
//                               {item}
//                             </Text>
//                           </View>
//                         </TouchableOpacity>
//                       );
//                     }}
//                   />
//                 </View>
//               </View>}
//               //----------------------------------------------
//               keyExtractor={item => item?.payment_id?.toString()}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={styles.cards}
//                   onPress={() =>
//                     navigation.navigate('PaymentDetails', { item: item })
//                   }
//                 >
//                   <View style={styles.left}>
//                     <Text style={styles.name}>{capitalizeFirstLetter(item.payment_by)}</Text>
//                     <Text style={styles.fund}>{capitalizeFirstLetter(item.committe_name)}</Text>

//                     <View style={styles.amountView}>
//                       <Text style={styles.amount}>Paid Amount :</Text>
//                       <Text style={styles.amount2}>
//                         {formatNumber(item.paid_amount)}
//                       </Text>
//                     </View>
//                   </View>
//                   <View style={styles.right}>
//                     <View
//                       style={[
//                         item?.status?.toLowerCase() === 'verified'
//                           ? styles.paid
//                           : item?.status?.toLowerCase() === 'pending'
//                             ? styles.pending

//                             : item?.status?.toLowerCase() === 'requested'
//                               ? styles.requested
//                               : null,
//                       ]}
//                     >
//                       <Text
//                         style={[
//                           styles.CardStatus,
//                           {
//                             color:
//                               item?.status?.toLowerCase() === 'Overdue'
//                                 ? AppColors.bodyText
//                                 : AppColors.title,
//                           },
//                         ]}
//                       >
//                         {capitalizeFirstLetter(item.status)}
//                       </Text>
//                     </View>
//                     <View>
//                       <Text style={styles.date}>{''}</Text>
//                     </View>
//                     <View style={styles.dateView}>
//                       <Text style={styles.date}>Date :</Text>

//                       <Text style={styles.date2}>{item.pay_date}</Text>
//                     </View>
//                   </View>
//                 </TouchableOpacity>
//               )}
//             />
//           </View>
//         )}
//       </View>
//     </View>
//   );
// };


// const styles = ScaledSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: AppColors.background,
//   },
//   scrollView: {
//     marginBottom: 66,
//   },
//   arrowBack: {
//     width: 28,
//     height: 28,
//   },
//   RectangleImg: {
//     width: wp('100%'),
//     height: hp('25%'),
//     resizeMode: 'contain',
//   },
//   TopView: {
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     flexDirection: 'row',
//     marginTop: 5,
//     alignSelf: 'center',
//     width: '100%',
//     padding: 15,
//     marginTop: 20,
//   },
//   backAndText: {
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   h1: {
//     fontSize: moderateScale(24),
//     color: AppColors.title,
//     fontWeight: '600',
//     paddingLeft: 6,
//   },
//   avatar: {
//     width: 60,
//     height: 60,
//     elevation: 5,
//   },
//   textView: {
//     paddingLeft: 8,
//   },

//   h4: {
//     color: AppColors.title,
//     fontSize: moderateScale(16),
//     opacity: 0.9,
//     padding: 3,
//   },
//   //---------------------------------

//   horizontalCards: {
//     width: wp('100%'),
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   summaryCard: {
//     width: wp('48%'),
//     backgroundColor: AppColors.background,
//     padding: 10,
//     borderRadius: 15,
//     elevation: 5,
//     flexDirection: 'column',
//     justifyContent: 'space-around',
//   },
//   cardHeader: {
//     justifyContent: 'flex-start',
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     padding: 5,
//   },
//   cardIcon: {
//     width: 28,
//     resizeMode: 'contain',
//   },
//   cardTitle: {
//     color: AppColors.blackText,
//     fontSize: moderateScale(15),
//     fontWeight: '600',
//     padding: 5,
//   },
//   cardValue: {
//     color: AppColors.link,
//     fontSize: moderateScale(16),
//     fontWeight: '600',
//     paddingLeft: 5,
//   },
//   cardSubtitle: {
//     color: AppColors.bodyText,
//     fontSize: moderateScale(14),
//     padding: 5,
//   },
//   //----------------------------------
//   statuslistView: {
//     padding: 8,
//   },
//   statusList: {
//     borderRadius: 20,
//     backgroundColor: AppColors.background,
//     width: 115,
//     padding: 6,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 3,
//     margin: 5,
//     borderWidth: 1,
//     borderColor: AppColors.primary,
//   },

//   activeStatusList: {
//     backgroundColor: AppColors.primary,
//   },

//   status: {
//     color: AppColors.blackText,
//     fontSize: moderateScale(16),
//     fontWeight: '500',
//   },

//   activeStatusText: {
//     color: '#fff',
//   },
//   //--------------------------------------

//   cards: {
//     width: '98%',
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//     flexDirection: 'row',
//     alignSelf: 'center',
//     backgroundColor: AppColors.background,
//     marginTop: 10,
//     padding: 8,
//     borderRadius: 15,
//     elevation: 3,
//     borderWidth: 1,
//     borderColor: AppColors.primary,
//   },
//   name: {
//     fontSize: moderateScale(16),
//     color: AppColors.bodyText,
//     padding: 5,
//   },

//   fund: {
//     fontSize: moderateScale(16),
//     color: AppColors.bodyText,
//     padding: 5,
//   },
//   amount: {
//     fontSize: moderateScale(16),
//     color: AppColors.bodyText,
//     padding: 5,
//   },
//   amount2: {
//     fontSize: moderateScale(16),
//     color: AppColors.link,
//     padding: 5,
//   },
//   amountView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   left: {},
//   right: {
//     flexDirection: 'column',
//     alignItems: 'flex-end',
//     justifyContent: 'space-between',
//   },
//   paid: {
//     backgroundColor: 'green',

//     borderRadius: 25,
//     width: 100,
//     elevation: 3,
//   },
//   pending: {
//     backgroundColor: '#FFA800',
//     borderRadius: 25,
//     width: 100,
//     elevation: 3,
//   },
//   overDue: {
//     backgroundColor: AppColors.cardLight,
//     borderRadius: 25,
//     width: 100,
//     elevation: 3,
//   },
//   requested: {
//     backgroundColor: '#EC5800',
//     borderRadius: 25,
//     width: 100,
//     elevation: 3,
//   },
//   CardStatus: {
//     fontSize: moderateScale(16),
//     padding: 5,
//     textAlign: 'center',
//   },
//   dateView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   date: {
//     fontSize: moderateScale(16),
//     color: AppColors.bodyText,
//     padding: 5,
//   },
//   date2: {
//     fontSize: moderateScale(16),
//     color: AppColors.link,
//     padding: 5,
//   },
// });




import React, { useCallback, useState } from 'react';
import {
  View,
  StatusBar,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
// ScaledSheet aur scales ka sahi istemal
import { moderateScale, ScaledSheet, s, vs } from 'react-native-size-matters';
import { AppColors } from '../../../constant/appColors';
import { AppImages } from '../../../constant/appImages';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { api } from '../../../services/api';
import { getStoredUser } from '../../../Utils/getUser';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Payments = () => {
  const navigation = useNavigation();
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [paymentList, setPaymentList] = useState([]);
  const [userData, setUserData] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const loadUser = async () => {
        const user = await getStoredUser();
        if (user) setUserData(user);
      };
      loadUser();
    }, []),
  );

  const AdminpaymentList = async () => {
    if (!userData?.user_id) return;
    try {
      const response = await api.get(`/admin/view-committee-payments/list/${userData.user_id}`);
      setPaymentList(response?.data?.msg || []);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      AdminpaymentList();
    }, [userData]),
  );

  const formatNumber = value => value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || '0';
  const capitalize = text => text ? text.charAt(0).toUpperCase() + text.slice(1) : '';

  const validPayments = paymentList.filter(item => Number(item?.paid_amount) > 0);
  const filterData = selectedStatus === 'All'
    ? validPayments
    : validPayments.filter(item => item?.status?.toLowerCase() === selectedStatus.toLowerCase());

  const pendingList = paymentList.filter(item => item?.status?.toLowerCase() === 'pending' && item.paid_amount);
  const pendingAmount = pendingList.reduce((sum, item) => sum + Number(item?.paid_amount || 0), 0);
  console.log("pending list : ", pendingList)
  const summaryData = [
    { id: 1, title: 'Pending Amount', value: pendingAmount, subtitle: 'Awaiting', type: 'pending' },
    { id: 2, title: 'Pending Count', value: pendingList.length, subtitle: 'Total Items', type: 'count' },
  ];

  const renderHeader = () => (
    <View style={{ backgroundColor: AppColors.background }}>
      <ImageBackground source={AppImages.Rectangle2} style={styles.RectangleImg}>
        <View style={styles.headerContent}>
          <View style={styles.TopView}>
            <View style={styles.backAndText}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={28} color={AppColors.title} />
              </TouchableOpacity>
              <Text style={styles.h1}>Payments</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('AdminProfile')}>
              <Image source={AppImages.profileAvatar} style={styles.avatar} />
            </TouchableOpacity>
          </View>
          <View style={styles.textView}>
            <Text style={styles.h4}>Monitor all committee payments</Text>
            <Text style={styles.h4}>and pending amounts.</Text>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.horizontalCards}>
        {summaryData.map((item) => (
          <View style={styles.summaryCard} key={item.id}>
            <View style={styles.cardHeader}>
              <Icon name={item.type === 'pending' ? 'pending' : 'countertops'} size={moderateScale(22)} color={AppColors.link} />
              <Text style={styles.cardTitle}>{item.title}</Text>
            </View>
            <Text style={styles.cardValue}>{formatNumber(item.value)}</Text>
            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
          </View>
        ))}
      </View>

      <View style={styles.statuslistView}>
        <FlatList
          data={['All', 'Verified', 'Pending', 'Requested']}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.statusTab, selectedStatus === item && styles.activeStatusTab]}
              onPress={() => setSelectedStatus(item)}
            >
              <Text style={[styles.statusTabText, selectedStatus === item && styles.activeStatusTabText]}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={i => i}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />
      <View style={styles.viewMain}>
        <FlatList
          data={filterData}
          keyExtractor={item => item?.payment_id?.toString()}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{ paddingBottom: vs(20) }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.paymentCard}
              onPress={() => navigation.navigate('PaymentDetails', { item })}
            >
              <View style={styles.cardLeft}>
                <Text style={styles.userName}>{capitalize(item.payment_by)}</Text>
                <Text style={styles.committeeName}>{capitalize(item.committe_name)}</Text>
                <View style={styles.row}>
                  <Text style={styles.label}>Paid: </Text>
                  <Text style={styles.amountValue}>{formatNumber(item.paid_amount)}</Text>
                </View>
              </View>

              <View style={styles.cardRight}>
                <View style={[
                  styles.badge,
                  item?.status?.toLowerCase() === 'verified' ? { backgroundColor: 'green' } :
                    item?.status?.toLowerCase() === 'pending' ? { backgroundColor: '#FFA800' } :
                      { backgroundColor: '#EC5800' }
                ]}>
                  <Text style={styles.badgeText}>{capitalize(item.status)}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Date: </Text>
                  <Text style={styles.dateValue}>{item.pay_date}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: { flex: 1, backgroundColor: AppColors.background },
  viewMain: {
    marginBottom: 50,
  },
  RectangleImg: { width: '100%', height: '200@vs' },

  headerContent: { paddingHorizontal: '20@s', paddingTop: '20@vs' },

  TopView: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

  backAndText: { flexDirection: 'row', alignItems: 'center' },

  h1: { fontSize: '26@ms0.7', color: AppColors.title, fontWeight: '700', marginLeft: '10@s' },

  avatar: { width: '55@s', height: '55@s', borderRadius: '27.5@s' },

  textView: { marginTop: '15@vs' },

  h4: { color: AppColors.title, fontSize: '16@ms0.7', opacity: 0.9, lineHeight: '22@ms' },

  horizontalCards: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: '-40@vs'
  },

  summaryCard: {
    width: '46%',
    backgroundColor: AppColors.background,
    padding: '15@ms',
    borderRadius: '15@ms',
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },

  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: '5@vs' },

  cardTitle: { fontSize: '14@ms0.7', fontWeight: '600', marginLeft: '6@s', color: '#333' },

  cardValue: { fontSize: '18@ms0.7', color: AppColors.link, fontWeight: 'bold', marginVertical: '5@vs' },

  cardSubtitle: { fontSize: '13@ms0.7', color: '#666' },

  statuslistView: { paddingVertical: '20@vs', paddingHorizontal: '10@s' },

  activeStatusTab: {
    backgroundColor: AppColors.primary,
  },

  activeStatusTabText: {
    color: '#fff',
  },

  statusTab: {
    paddingHorizontal: '18@s',
    height: '42@vs',
    justifyContent: 'center',
    borderRadius: '21@s',
    backgroundColor: AppColors.background,
    marginHorizontal: '6@s',
    borderWidth: 1.5,
    borderColor: AppColors.primary,
    elevation: 3,
  },

  statusTabText: { fontSize: '15@ms0.7', fontWeight: '600', color: '#000000' },

  paymentCard: {
    width: '94%',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: AppColors.background,
    marginVertical: '8@vs',
    padding: '15@ms',
    borderRadius: '16@ms',
    elevation: 5,
    borderWidth: 0.8,
    borderColor: '#eee'
  },

  cardLeft: { flex: 1.6 },
  cardRight: { justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' },


  userName: { fontSize: '17@ms0.7', fontWeight: 'bold', color: '#222' },

  committeeName: { fontSize: '15@ms0.7', color: '#555', marginVertical: '4@vs' },

  label: { fontSize: '14@ms0.7', color: '#777', fontWeight: 'bold' },

  amountValue: { fontSize: '14@ms0.8', color: AppColors.link, fontWeight: 'bold' },

  badge: {
    paddingHorizontal: '12@s',
    paddingVertical: '6@vs',
    borderRadius: '14@ms',
    minWidth: '90@s',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  badgeText: { color: '#fff', fontSize: '14@ms0.7', fontWeight: 'bold' },

  dateValue: { fontSize: '14@ms0.7', color: AppColors.link, fontWeight: '600' },
});
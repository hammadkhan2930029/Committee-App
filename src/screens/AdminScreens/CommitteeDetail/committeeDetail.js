// import React, { useState, useEffect, useCallback } from 'react';
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import {
//   View,
//   Text,
//   StatusBar,
//   TouchableOpacity,
//   ImageBackground,
//   Image,
//   ScrollView,
//   Dimensions,
//   StyleSheet
// } from 'react-native';
// import { moderateScale, ScaledSheet } from 'react-native-size-matters';
// import { AppColors } from '../../../constant/appColors';
// import { AppImages } from '../../../constant/appImages';
// import { AppIcons } from '../../../constant/appIcons';
// import { CustomButton } from '../../../components/customButton';
// import { CustomButtonLight } from '../../../components/customeButtonLight';
// import { navigate } from '../../../navigations/navigationService';
// import { api } from '../../../services/api';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { Loader } from '../../Loader/loader';
// import Toast from 'react-native-toast-message';
// import { RFValue } from 'react-native-responsive-fontsize';
// import dayjs from 'dayjs';
// import customParseFormat from 'dayjs/plugin/customParseFormat';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
// import { getStoredUser } from '../../../Utils/getUser';
// dayjs.extend(customParseFormat);

// export const CommitteeDetails = ({ route }) => {
//   //-----------------------------------------------------------------------

//   const { id } = route.params;
//   console.log('ID :', id);

//   //-----------------------------------------------------------------------

//   const [userdata, setUserData] = useState([]);

//   useFocusEffect(
//     useCallback(() => {
//       const loadUser = async () => {
//         const user = await getStoredUser();
//         if (user) {
//           setUserData(user);
//         }
//       };
//       loadUser();
//     }, []),
//   );
//   //-----------------------------------------------------------------------

//   const navigation = useNavigation();
//   const [details, setDetails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [roundList, setRoundList] = useState([]);
//   const [multipleData, setMultipleData] = useState([]);
//   const [paymentList, setPaymentList] = useState([]);
//   const [isverified, setIsVerified] = useState(false);

//   //-----------------------------------------------------------------------

//   const formatNumber = value => {
//     if (!value) return '';
//     return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//   };

//   //-----------------------------------------------------------------------

//   const committeeDetails = async () => {
//     try {
//       const response = await api.get(`/user/view-committee-detail/${id}`);
//       console.log('committee details :', response.data);
//       if (response?.data?.code === '200') {
//         setDetails(response.data.msg[0]);
//         setMultipleData(response.data);
//       }
//     } catch (error) {
//       console.log('Try catch error :', error);
//     }
//   };
//   useFocusEffect(
//     useCallback(() => {
//       committeeDetails();
//     }, [id]),
//   );
//   console.log('committee details 2:', details);

//   //----------------delete committee--------------------------------------

//   const deleteCommittee = async () => {
//     setLoading(true);
//     try {
//       const response = await api.delete(
//         `/user/delete-committee/${details.committee_id}`,
//       );
//       const result = response?.data?.msg[0]?.response;

//       if (response?.data?.code === '200' && result) {
//         Toast.show({
//           type: 'customToast',
//           text1: 'Success',
//           text2: result,
//           props: {
//             bgColor: AppColors.background,
//             borderColor: 'green',
//           },
//         });
//         navigation.goBack();
//         setLoading(false);
//       } else {
//         Toast.show({
//           type: 'customToast',
//           text1: 'Warning',
//           text2: 'something error',
//           props: {
//             bgColor: AppColors.background,
//             borderColor: 'orange',
//           },
//         });
//       }
//       console.log('delete :', response);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   //-------------user view committee rounds--------------------------

//   const viewCommitteeRound = async () => {
//     try {
//       const response = await api.get(
//         `/user/view-committee-rounds/${details.committee_id}`,
//       );
//       const result = await response.data?.msg;
//       setRoundList(result);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useFocusEffect(
//     useCallback(() => {
//       viewCommitteeRound();
//     }, [details.committee_id]),
//   );

//   //-----------------------------------------------------------------------

//   const hasAnyPaid = roundList.some(
//     item => item.status?.toLowerCase() === 'paid',
//   );
//   //-----------------------------------------------------------------------

//   const getFormattedDate = dateStr => {
//     if (!dateStr) return '';

//     const parsed = dayjs(
//       dateStr,
//       ['D MMM YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY'],
//       true,
//     );
//     return parsed.isValid() ? parsed.format('YYYY-MM-DD') : dateStr;
//   };
//   const startDate = getFormattedDate(details.start_date);
//   const dueOn = getFormattedDate(details.due_on);

//   //-----------------------------------------------------------------------

//   const AdminpaymentList = async () => {
//     try {
//       const response = await api.get(
//         `/admin/view-committee-payments/list/${userdata.user_id}`,
//       );
//       const allPayments = response?.data?.msg || [];
//       console.log('All payment :', allPayments);

//       const filteredPayments = allPayments.filter(
//         item => item.committe_id === details?.committee_id,
//       );

//       const isVerified = filteredPayments.some(
//         item => item.status.toLowerCase() === 'verified',
//       );
//       const paymentsWithVerification = filteredPayments.map(item => ({
//         ...item,
//         isVerified: item.status.toLowerCase() === 'verified',
//       }));
//       setIsVerified(isVerified);

//       console.log('Is Verified:', isVerified);
//       setPaymentList(paymentsWithVerification);
//     } catch (error) {
//       console.log(error);
//     } finally {
//     }
//   };
//   useFocusEffect(
//     useCallback(() => {
//       if (userdata?.user_id) {
//         AdminpaymentList();
//       }
//     }, [userdata, details]),
//   );
//   console.log('user data :', userdata);
//   console.log('Is verified :', isverified);

//   //-----------------------------------------------------------
//   const CommitteeDetailsSkeleton = () => {
//     return (
//       <SkeletonPlaceholder borderRadius={8}>
//         {/* Card */}
//         <View style={styles.Skeletoncard}>
//           {Array.from({ length: 9 }).map((_, index) => (
//             <View key={index} style={styles.Skeletonrow}>
//               <View style={styles.Skeletonleft} />
//               <View style={styles.Skeletonright} />
//             </View>
//           ))}
//         </View>

//         {/* Buttons */}
//         <View style={styles.Skeletonbuttons}>
//           <View style={styles.Skeletonbtn} />
//           <View style={styles.Skeletonbtn} />
//           <View style={styles.Skeletonbtn} />
//           <View style={styles.Skeletonbtn} />
//         </View>
//       </SkeletonPlaceholder>
//     );
//   };
//   //-----------------------------------------------------------
//   useEffect(() => {
//     if (!details?.committee_id) {
//       setTimeout(() => {
//         setLoading(false);
//       }, 2000);
//     }
//   }, [details]);

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />
//       <ScrollView>
//         <View>
//           <ImageBackground
//             source={AppImages.Rectangle2}
//             style={styles.RectangleImg}
//           >
//             <View style={styles.main}>
//               <View style={styles.TopView}>
//                 <View style={styles.backAndText}>
//                   <TouchableOpacity onPress={() => navigation.goBack()}>
//                     <Icon
//                       name="arrow-circle-left"
//                       size={28}
//                       color={AppColors.title}
//                     />
//                   </TouchableOpacity>
//                   <Text style={styles.h1}>Committee Details</Text>
//                 </View>
//               </View>
//               <View style={styles.textView}>
//                 <Text style={styles.h4}>{details.name}</Text>

//                 <View style={styles.activeBtn}>
//                   <Text style={styles.active}>{details.status}</Text>
//                 </View>
//               </View>
//             </View>
//           </ImageBackground>
//         </View>
//         {loading ? (
//           <CommitteeDetailsSkeleton />
//         ) : (
//           <View>
//             <View style={styles.BCDetails}>
//               <View style={styles.row}>
//                 <Text style={styles.text1}>Total Members</Text>
//                 <Text style={styles.text2}>{details.total_member}</Text>
//               </View>
//               <View style={styles.row}>
//                 <Text style={styles.text1}>Total Rounds</Text>
//                 <Text style={styles.text2}>{details.total_rounds}</Text>
//               </View>
//               <View style={styles.row}>
//                 <Text style={styles.text1}>Round(s) Per Month</Text>
//                 <Text style={styles.text2}>{details.rounds_per_month}</Text>
//               </View>
//               <View style={styles.row}>
//                 <Text style={styles.text1}>No. of Months</Text>
//                 <Text style={styles.text2}>{details.no_of_month}</Text>
//               </View>
//               <View style={styles.row}>
//                 <Text style={styles.text1}>Amount Per Member</Text>
//                 <Text style={styles.text2}>
//                   PKR {formatNumber(details.amount_per_member)}
//                 </Text>
//               </View>
//               <View style={styles.row}>
//                 <Text style={styles.text1}>Total Amount</Text>
//                 <Text style={styles.text2}>
//                   PKR {formatNumber(details.total)}
//                 </Text>
//               </View>
//               <View style={styles.row}>
//                 <Text style={styles.text1}>Start Date</Text>
//                 <Text style={styles.text2}>{startDate}</Text>
//               </View>
//               <View style={styles.row}>
//                 <Text style={styles.text1}>Start Month</Text>
//                 <Text style={styles.text2}>{details.start_month}</Text>
//               </View>
//               <View style={styles.row}>
//                 <Text style={styles.text1}>Due On</Text>
//                 <Text style={styles.text2}>{dueOn}</Text>
//               </View>
//             </View>

//             <View style={styles.buttons}>
//               <View style={styles.btnView}>
//                 <TouchableOpacity
//                   disabled={hasAnyPaid || isverified}
//                   style={[
//                     styles.deleteBTN,
//                     {
//                       backgroundColor:
//                         hasAnyPaid || isverified
//                           ? AppColors.placeholder
//                           : AppColors.primary,
//                     },
//                   ]}
//                   onPress={() =>
//                     navigate('EditCommittee', {
//                       details: details,
//                       start: startDate,
//                       due: dueOn,
//                     })
//                   }
//                 >
//                   <Text style={styles.text}>Edit</Text>
//                   <Icon name="edit" size={18} color={AppColors.title} />
//                 </TouchableOpacity>
//               </View>
//               <View style={styles.btnView}>
//                 <TouchableOpacity
//                   disabled={hasAnyPaid || isverified}
//                   style={[
//                     styles.deleteBTN,
//                     {
//                       backgroundColor:
//                         hasAnyPaid || isverified
//                           ? AppColors.placeholder
//                           : AppColors.primary,
//                     },
//                   ]}
//                   onPress={() => deleteCommittee()}
//                 >
//                   <Text style={styles.text}>Delete</Text>
//                   <Icon name="delete" size={18} color={AppColors.title} />
//                 </TouchableOpacity>
//               </View>
//               <View style={styles.btnView}>
//                 <CustomButtonLight
//                   title="Add Members"
//                   onPress={() =>
//                     navigate('AddCommitteeMembers', {
//                       multipleData: multipleData,
//                     })
//                   }
//                 />
//               </View>
//               <View style={styles.btnView}>
//                 <CustomButtonLight
//                   title="Assign Rounds"
//                   onPress={() =>
//                     navigate('AssignRounds', { multipleData: multipleData })
//                   }
//                 />
//               </View>
//             </View>
//           </View>
//         )}
//       </ScrollView>
//       {/* <Loader visible={loading} /> */}
//     </View>
//   );
// };
// const styles = ScaledSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: AppColors.background,
//   },
//   arrowBack: {
//     width: 28,
//     height: 28,
//   },
//   RectangleImg: {
//     width: '100%',
//     height: 200,
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
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     flexDirection: 'row',
//     padding: 10,
//   },
//   h1: {
//     fontSize: moderateScale(24),
//     color: AppColors.title,
//     fontWeight: '600',
//     marginLeft: 10,
//   },

//   textView: {
//     padding: 15,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     flexDirection: 'row',
//   },

//   h4: {
//     color: AppColors.title,
//     fontSize: moderateScale(20),
//     padding: 5,
//     fontWeight: '500'
//   },
//   activeBtn: {
//     backgroundColor: AppColors.background,
//     paddingLeft: 10,
//     paddingRight: 10,
//     borderRadius: 20,
//   },
//   active: {
//     fontSize: moderateScale(16),
//     color: AppColors.link,
//     textAlign: 'center',
//     padding: 3,
//   },
//   //----------------------------------
//   BCDetails: {
//     width: '95%',
//     alignSelf: 'center',
//     padding: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: AppColors.background,
//     elevation: 5,
//     borderRadius: 10,
//   },
//   row: {
//     width: '100%',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     flexDirection: 'row',
//     padding: 6,
//     borderBottomColor: AppColors.primary,
//     borderBottomWidth: 2,
//   },
//   text1: {
//     color: AppColors.blackText,
//     fontSize: RFValue(15),
//     fontWeight: '600'
//   },
//   text2: {
//     color: AppColors.bodyText,
//     fontSize: RFValue(14),

//   },
//   buttons: {
//     width: '100%',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     padding: 15,
//   },
//   btnView: {
//     width: '47%',
//     marginTop: 10,
//   },
//   deleteIconView: {
//     width: '100%',
//     justifyContent: 'flex-end',
//     alignItems: 'flex-end',
//     padding: 15,
//   },
//   paymentHistoryView: {
//     backgroundColor: AppColors.background,
//     paddingLeft: 15,
//     paddingRight: 15,
//     borderRadius: 30,
//   },
//   paymentHistory: {
//     width: 50,
//     height: 50,
//     resizeMode: 'contain',
//   },
//   //-----------------------------------
//   deleteBTN: {
//     padding: 12,
//     borderRadius: 15,
//     alignItems: 'center',
//     elevation: 5,
//     backgroundColor: AppColors.primary,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   //------skeletone---------------------------
//   Skeletonheader: {
//     height: 180,
//     padding: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   SkeletonbackIcon: {
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//   },
//   Skeletontitle: {
//     width: 180,
//     height: 25,
//     marginLeft: 15,
//   },
//   Skeletoncard: {
//     marginTop: 50,
//     width: '95%',
//     alignSelf: 'center',
//     padding: 20,
//   },
//   Skeletonrow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 12,
//   },
//   Skeletonleft: {
//     width: '45%',
//     height: 16,
//   },
//   Skeletonright: {
//     width: '35%',
//     height: 16,
//   },
//   Skeletonbuttons: {
//     marginTop: 20,
//     paddingHorizontal: 15,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   Skeletonbtn: {
//     width: '47%',
//     height: 45,
//     borderRadius: 15,
//     marginBottom: 12,
//   },
//   //-----------------------------------------------
// });

import { AnimatedCircularProgress } from 'react-native-circular-progress';
import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet
} from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { AppColors } from '../../../constant/appColors';
import { AppImages } from '../../../constant/appImages';
import { AppIcons } from '../../../constant/appIcons';
import { CustomButton } from '../../../components/customButton';
import { CustomButtonLight } from '../../../components/customeButtonLight';
import { navigate } from '../../../navigations/navigationService';
import { api } from '../../../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Loader } from '../../Loader/loader';
import Toast from 'react-native-toast-message';
import { RFValue } from 'react-native-responsive-fontsize';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { getStoredUser } from '../../../Utils/getUser';
dayjs.extend(customParseFormat);

const { width } = Dimensions.get('window');

const Card = ({ children, style }) => (
  <View style={[styles.card, style]}>{children}</View>
);
//--------------------------------------------------------------------
const ProgressCircle = ({ value, total, color }) => {
  const percentage = (value / total) * 100;

  return (
    <View style={{ alignItems: 'center' }}>
      <AnimatedCircularProgress
        size={120}
        width={10}
        fill={percentage}
        tintColor={color}
        backgroundColor="#E5E5E5"
        lineCap="round"
      >
        {() => (
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.bigText}>{value}</Text>
            <Text>{value} / {total}</Text>
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};
//------------------------------------------------------------------------
const CommitteeDetailsSkeleton = () => {
  return (
    <SkeletonPlaceholder
      borderRadius={10}
      backgroundColor="#E1E9EE"
      highlightColor="#F2F8FC">

      {/* Header */}
      <View style={styles.skHeader}>
        <View style={styles.skTitle} />
        <View style={styles.skSubTitle} />
      </View>

      {/* Progress Section */}
      <View style={styles.skProgressRow}>
        <View style={styles.skProgressHalf}>
          <View style={styles.skCircle} />
          <View style={styles.skText} />
          <View style={styles.skSmallText} />
        </View>

        <View style={styles.skDivider} />

        <View style={styles.skProgressHalf}>
          <View style={styles.skCircle} />
          <View style={styles.skText} />
          <View style={styles.skSmallText} />
        </View>
      </View>

      {/* Grid Cards */}
      <View style={styles.skGrid}>
        {[1, 2, 3, 4].map((_, i) => (
          <View key={i} style={styles.skGridItem}>
            <View style={styles.skCard} />
          </View>
        ))}
      </View>

      {/* Current Month */}
      <View style={styles.skSection}>
        <View style={styles.skBigCard} />
      </View>

      {/* Timeline */}
      <View style={styles.skSection}>
        <View style={styles.skBigCard} />
      </View>

      {/* Buttons */}
      <View style={styles.skButtons}>
        {[1, 2, 3, 4].map((_, i) => (
          <View key={i} style={styles.skBtn} />
        ))}
      </View>

    </SkeletonPlaceholder>
  );
};
// -----------------------------------------------------------------------
export const CommitteeDetails = ({ route }) => {
  //-----------------------------------------------------------------------

  const { id } = route.params;
  console.log('ID :', id);

  //-----------------------------------------------------------------------

  const [userdata, setUserData] = useState([]);

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
  //-----------------------------------------------------------------------
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roundList, setRoundList] = useState([]);
  const [multipleData, setMultipleData] = useState([]);
  const [paymentList, setPaymentList] = useState([]);
  const [isverified, setIsVerified] = useState(false);
  const [currentMonthData, setCurrentMonthData] = useState([])
  const [currMonth, setCurrMOnth] = useState('')


  //-----------------------------------------------------------------------

  const formatNumber = (value) => {
    if (value === null || value === undefined) return '';

    const number = typeof value === 'number' ? value : Number(value);

    if (isNaN(number)) return value;

    return number.toLocaleString('en-US');
  };

  //-----------------------------------------------------------------------

  const committeeDetails = async () => {
    try {
      const response = await api.get(`/user/view-committee-detail/${id}`);
      console.log('committee details :', response.data);
      if (response?.data?.code === '200') {
        setDetails(response.data.msg[0]);
        setMultipleData(response.data);
      }
    } catch (error) {
      console.log('Try catch error :', error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      committeeDetails();
    }, [id]),
  );


  //----------------delete committee--------------------------------------

  const deleteCommittee = async () => {
    setLoading(true);
    try {
      const response = await api.delete(
        `/user/delete-committee/${details.committee_id}`,
      );
      const result = response?.data?.msg[0]?.response;

      if (response?.data?.code === '200' && result) {
        Toast.show({
          type: 'customToast',
          text1: 'Success',
          text2: result,
          props: {
            bgColor: AppColors.background,
            borderColor: 'green',
          },
        });
        navigation.goBack();
        setLoading(false);
      } else {
        Toast.show({
          type: 'customToast',
          text1: 'Warning',
          text2: 'something error',
          props: {
            bgColor: AppColors.background,
            borderColor: 'orange',
          },
        });
      }
      // console.log('delete :', response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  //-------------user view committee rounds--------------------------

  const viewCommitteeRound = async () => {
    try {
      const response = await api.get(
        `/user/view-committee-rounds/${details.committee_id}`,
      );
      const result = await response.data?.msg;
      setRoundList(result);
    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      viewCommitteeRound();
    }, [details.committee_id]),
  );

  //--------------------------------------------------------------
  const paidRounds = roundList?.filter(item => item.status === 'Paid').length
  const pendingsRounds = roundList?.filter(item => item.status === 'Pending').length
  const visibleData = expanded ? roundList : roundList.slice(0, 4);
  // console.log('Round list :', roundList)
  // console.log('Round list paid:', paidRounds)
  // console.log('Round list pending:', pendingsRounds.length)



  //-----------------------------------------------------------------------

  const hasAnyPaid = roundList.some(
    item => item.status?.toLowerCase() === 'paid',
  );
  //-----------------------------------------------------------------------

  const getFormattedDate = dateStr => {
    if (!dateStr) return '';

    const parsed = dayjs(
      dateStr,
      ['D MMM YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY'],
      true,
    );
    return parsed.isValid() ? parsed.format('YYYY-MM-DD') : dateStr;
  };
  const startDate = getFormattedDate(details.start_date);
  const dueOn = getFormattedDate(details.due_on);
  //-----------------------------------------------------------------------

  const getCurrentDateFormatted = () => {
    const date = new Date();

    const formatted = date.toLocaleString('en-US', {
      month: 'short',
      year: 'numeric',
    });

    setCurrMOnth(formatted)
  };
  useEffect(() => {

    getCurrentDateFormatted()
  }, [userdata, details])
  //-----------------------------------------------------------------------

  const AdminpaymentList = async () => {
    try {
      const response = await api.get(
        `/admin/view-committee-payments/list/${userdata.user_id}`,
      );
      const allPayments = response?.data?.msg || [];


      const filteredPayments = allPayments.filter(
        item => item.committe_id === details?.committee_id,
      );


      const isVerified = filteredPayments.some(
        item => item.status.toLowerCase() === 'verified',
      );
      const paymentsWithVerification = filteredPayments.map(item => ({
        ...item,
        isVerified: item.status.toLowerCase() === 'verified',
      }));
      setIsVerified(isVerified);


      setPaymentList(paymentsWithVerification);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  useFocusEffect(
    useCallback(() => {
      if (userdata?.user_id) {
        AdminpaymentList();
      }
    }, [userdata, details]),
  );



  //-----------------------------------------------------------
  useEffect(() => {
    if (!details?.committee_id) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [details]);

  //--------------current month progress-------------------------------
  const currentMonthDetails = async () => {
    try {
      const res = await api.get(`/user/view-committee-payment/current-month/${details?.committee_id}/${currMonth}`)
      const result = res.data.msg[0]
      console.log('result :', result)
      if (result && res.data.code == 200) {
        setCurrentMonthData(result)

      }

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (details) {

      currentMonthDetails()
    }
  }, [details])



  const paidAmount = currentMonthData.round_payment_paid

  const total = details.total;

  const percentage = (paidAmount / total) * 100;

  const pendingAmount = paidAmount - total

  //------------------------------------------------------------
  if (loading) {
    return <CommitteeDetailsSkeleton />;
  }

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={AppImages.Rectangle2}
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
              <Text style={styles.h1}>Committee Details</Text>
            </View>
          </View>
          <View style={styles.textView}>
            <Text style={styles.h4}>{details.name}</Text>

            <View style={styles.activeBtn}>
              <Text style={styles.active}>{details.status}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.sub_container}>

        {/* Top Progress Section */}
        <Card style={styles.row}>
          <View style={styles.half}>
            <ProgressCircle value={paidRounds} total={details.total_rounds} color='#02af4a' />
            <Text style={styles.title}>Rounds Completed</Text>
            <Text style={styles.bold}>{paidRounds} / {details.total_rounds}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.half}>
            <ProgressCircle value={pendingsRounds} total={details.total_rounds} color={AppColors.primary} />
            <Text style={styles.title}>Rounds Remaining</Text>
            <Text style={styles.bold}>{pendingsRounds} / {details.total_rounds}</Text>
          </View>
        </Card>


        {/* Info Cards */}
        <View style={styles.gridView}>
          <View style={styles.grid2}>
            <Card style={styles.smallCard}>
              <Icon name="group" size={28} color={AppColors.primary} />
              <Text>Total Members</Text>
              <Text style={styles.bold}>{details.total_member}</Text>
            </Card>

            <Card style={styles.smallCard}>
              <Icon name="calendar-today" size={28} color={AppColors.primary} />
              <Text>Rounds / Month</Text>
              <Text style={styles.bold}>{details.total_rounds}</Text>
            </Card>
          </View>
          <View style={styles.grid2}>
            <Card style={styles.smallCard}>
              <Icon name="account-balance-wallet" size={28} color={AppColors.primary} />
              <Text>Amount / Member</Text>
              <Text style={styles.bold}>{details.committee_currency} {formatNumber(details.amount_per_member)}</Text>
            </Card>

            <Card style={styles.smallCard}>
              <Icon name="payments" size={28} color={AppColors.primary} />
              <Text>Total Amount</Text>
              <Text style={styles.bold}>{details.committee_currency} {formatNumber(details.total)}</Text>
            </Card>
          </View>
        </View>

        {/* Current Month */}

        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.icon}><Icon name="calendar-month" size={24} color={AppColors.link} /></Text>
            <Text style={styles.title}>Current Month Details</Text>
          </View>

          {/* Row */}
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Round</Text>
              <Text style={styles.value}>
                {currentMonthData.round_pay_by} / {details.total_rounds}
              </Text>
            </View>

            <View style={styles.col}>
              <Text style={styles.label}>Date</Text>
              <Text style={styles.value}>{currMonth}</Text>
            </View>

            <View style={styles.col}>
              <Text style={styles.label}>Pending Amount</Text>
              <Text style={styles.amount}>
                {details.committee_currency} {formatNumber(pendingAmount)}
              </Text>
            </View>
          </View>

          {/* Progress */}
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${percentage}%` }]} />
          </View>

          <Text style={styles.bottomText}>
           {details.committee_currency} {formatNumber(paidAmount)} of {details.committee_currency} {formatNumber(details.total)}
          </Text>
        </View>

        {/* Timeline */}

        <Card>
          <View style={styles.timelineView}>
            <Text style={styles.sectionTitle}>Timeline</Text>
            <View>
              {roundList.length > 4 && (
                <TouchableOpacity
                  style={styles.showMoreBtn}
                  onPress={() => setExpanded(!expanded)}>
                  <Text style={styles.showMoreText}>
                    {expanded ? <Icon name="keyboard-arrow-up" size={24} color={AppColors.link} /> : <Icon name="keyboard-arrow-down" size={24} color={AppColors.link} />}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {visibleData.map((item, index) => {
            return (
              <View key={index} style={styles.rowItem}>
                <Text
                  style={{
                    color: item.status === 'Paid' ? AppColors.link : '#000',
                  }}>
                  {`${item.status === 'Paid' ? '✔' : '○'} ${item.round_month} - ${item.status === 'Paid' ? 'Collected' : 'Upcoming'
                    }`}
                </Text>
              </View>
            );
          })}


        </Card>
        {/* ------------------------------------------ */}
        <View style={styles.buttonRow}>

          <TouchableOpacity
            disabled={hasAnyPaid || isverified}
            style={[
              styles.btn, styles.editBtn,
              {
                backgroundColor:
                  hasAnyPaid || isverified
                    ? AppColors.placeholder
                    : AppColors.primary,
              },
            ]}
            onPress={() =>
              navigate('EditCommittee', {
                details: details,
                start: startDate,
                due: dueOn,
              })
            }
          >
            <Text style={styles.btnText}>Edit</Text>
          </TouchableOpacity>
          {/* ---------------------------------------------- */}

          <TouchableOpacity
            disabled={hasAnyPaid || isverified}
            style={[
              styles.btn, styles.deleteBtn,
              {
                backgroundColor:
                  hasAnyPaid || isverified
                    ? AppColors.placeholder
                    : AppColors.primary,
              },
            ]}
            onPress={() => deleteCommittee()}
          >
            <Text style={styles.btnText}>Delete</Text>
          </TouchableOpacity>
          {/* ---------------------------------------------- */}

          <TouchableOpacity style={[styles.btn, styles.lightBtn]}
            onPress={() =>
              navigate('AddCommitteeMembers', {
                multipleData: multipleData,
              })
            }
          >
            <Text style={styles.lightText}>Add Members</Text>
          </TouchableOpacity>
          {/* ---------------------------------------------- */}

          <TouchableOpacity style={[styles.btn, styles.lightBtn]}
            onPress={() =>
              navigate('AssignRounds', { multipleData: multipleData })
            }>
            <Text style={styles.lightText}>Assign Rounds</Text>
          </TouchableOpacity>

        </View>


      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
  },
  sub_container: {


  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  half: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: '80%',
    backgroundColor: '#ddd',
  },
  title: {
    marginTop: 10,
    fontSize: 14,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  bigText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  gridView: {
    width: '100%',

  },
  grid2: {
    flexDirection: 'row',

  },
  smallCard: {
    width: width * 0.43,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#02af4a',
  },
  //---------------------------
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
    padding: 10,
  },
  h1: {
    fontSize: moderateScale(24),
    color: AppColors.title,
    fontWeight: '600',
    marginLeft: 10,
  },

  textView: {
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },

  h4: {
    color: AppColors.title,
    fontSize: moderateScale(20),
    padding: 5,
    fontWeight: '500'
  },
  activeBtn: {
    backgroundColor: AppColors.background,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
  },
  active: {
    fontSize: moderateScale(16),
    color: AppColors.link,
    textAlign: 'center',
    padding: 3,
  },
  //------------------------------
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
    padding: 10
  },

  btn: {
    width: width * 0.45,
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
  },

  editBtn: {
    backgroundColor: AppColors.primary,
  },

  deleteBtn: {
    backgroundColor: '#BDBDBD',
  },

  lightBtn: {
    backgroundColor: '#FFE5D9',
  },

  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  lightText: {
    color: AppColors.link,
    fontWeight: 'bold',
  },
  //------------------skeleton-----------------------
  skHeader: {
    padding: 15,
  },

  skTitle: {
    width: 180,
    height: 25,
    marginBottom: 10,
  },

  skSubTitle: {
    width: 100,
    height: 20,
  },

  skProgressRow: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },

  skProgressHalf: {
    flex: 1,
    alignItems: 'center',
  },

  skCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },

  skText: {
    width: 100,
    height: 15,
    marginTop: 10,
  },

  skSmallText: {
    width: 80,
    height: 15,
    marginTop: 5,
  },

  skDivider: {
    width: 1,
    height: 120,
    marginHorizontal: 10,
  },

  skGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  skGridItem: {
    width: width * 0.45,
    marginBottom: 10,
  },

  skCard: {
    height: 100,
    borderRadius: 15,
  },

  skSection: {
    padding: 10,
  },

  skBigCard: {
    height: 120,
    borderRadius: 15,
  },

  skButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },

  skBtn: {
    width: width * 0.45,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  //------------------------------------
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    margin: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  icon: {
    fontSize: 18,
    marginRight: 6,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  col: {
    flex: 1,
  },

  label: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },

  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
  },

  amount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#02af4a',
  },

  progressBar: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 8,
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#5c9d8b',
    borderRadius: 10,
  },

  bottomText: {
    fontSize: 12,
    color: '#666',
  },
  //-------------------------------------------
  rowItem: {
    paddingVertical: 6,
  },

  showMoreBtn: {
    alignItems: 'center',
  },

  showMoreText: {
    color: AppColors.link,
    fontWeight: '600',
  },
  timelineView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  }
});


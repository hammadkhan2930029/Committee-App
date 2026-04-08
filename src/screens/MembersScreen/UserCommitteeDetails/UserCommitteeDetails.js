import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { AppColors } from '../../../constant/appColors';
import { AppImages } from '../../../constant/appImages';
import { AppIcons } from '../../../constant/appIcons';
import { CustomButton } from '../../../components/customButton';
import { api } from '../../../services/api';
import { useCallback, useEffect, useState } from 'react';
import { DisabledButton } from '../../../components/disabledButton';
import { Loader } from '../../Loader/loader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { getStoredUser } from '../../../Utils/getUser';
const { width } = Dimensions.get('window');

//-------------------------------------------------------------
const Card = ({ children, style }) => (
  <View style={[styles.card, style]}>{children}</View>
);

//-------------------------------------------------------------
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
//-----------------------------------------------------------------------
export const UserCommitteeDetails = ({ route }) => {


  const { data } = route.params;
  const [details, setDetails] = useState([]);
  const [roundList, setRoundList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [currentMonthData, setCurrentMonthData] = useState([])
  const [currMonth, setCurrMOnth] = useState('')
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

  const formatNumber = value => {
    if (value === null || value === undefined) return '';

    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  //----------committee details--------------------------------------------

  const committeeDetails = async () => {
    try {
      const response = await api.get(
        `/user/view-committee-detail/${data?.committee_id}`,
      );

      const result = response?.data?.msg[0];
      const rounds = response?.data?.rounds;
      console.log('data :', rounds)
      if (result) {
        setDetails(result);
        setRoundList(rounds);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (data.committee_id) {
      committeeDetails();
    }
  }, [data]);
  const paidRounds = roundList?.filter(item => item.status === 'Paid').length
  const pendingsRounds = roundList?.filter(item => item.status === 'Pending').length
  // const visibleData = expanded ? roundList : roundList.slice(0, 4);

  //-------------------------------------------------

  const now = new Date();
  const month = now.toLocaleString('en-us', {
    month: 'short',
    year: 'numeric',
  });

  //------------------------------------------------
  const memberCountMap = roundList.reduce((acc, item) => {
    const id = item?.committee_member_id;
    if (!id) return acc;
    acc[id] = (acc[id] || 0) + 1;
    let count = acc;
    return count;
  }, {});
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



  return (
    <View style={styles.container}>
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
                      name="arrow-back"
                      size={28}
                      color={AppColors.title}
                    />
                  </TouchableOpacity>
                  <Text style={styles.h1}>Committee Details</Text>
                </View>
              </View>
              <View style={styles.textView}>
                <Text style={styles.h4}>{details?.name}</Text>
                <View style={styles.activeBtn}>
                  <Text style={styles.active}>{details?.status}</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        {/* ---------------------------------------------------------------- */}
        <View >

          {/* ===== TOP PROGRESS SECTION ===== */}
          <View style={styles.topCard}>

            <View style={styles.progressBox}>
              <ProgressCircle value={paidRounds} total={details.total_rounds} color='#02af4a' />
              <Text style={styles.progressSub}>{paidRounds} / {pendingsRounds}</Text>
              <Text style={styles.progressLabel}>Rounds Completed</Text>
            </View>


          </View>

          {/* ===== SMALL CARDS ===== */}
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


          {/* ===== CURRENT MONTH ===== */}
          <View style={styles.bigCard}>
            <Text style={styles.sectionTitle}>Current Month Details</Text>

            <View style={styles.rowBetween}>
              <Text>Round: {paidRounds} / {pendingsRounds}</Text>
              {/* <Text>Feb 26, 2026</Text> */}
              <Text style={{ color: 'green' }}>PKR {formatNumber(details?.total)}</Text>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${percentage}` }]} />
            </View>

            <Text style={{ textAlign: 'right', marginTop: 5 }}>
              PKR {formatNumber(paidAmount)} of PKR {formatNumber(pendingAmount)}
            </Text>
          </View>



        </View>
        {/* ------------------------------------------------------------------------ */}

        {/* -----------------------Submitted---------------------------------- */}
        <FlatList
          data={roundList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={item => {
            const data = item?.item;

            return (
              <View style={styles.paymentStatus_view}>
                <View style={styles.paymentStatus}>
                  <View style={styles.cardHeader}>
                    <View>
                      <Text style={styles.status}>Your Payment Status</Text>
                    </View>
                    <View style={styles.statustype}>
                      <Text style={styles.statustypeText}>{data.status}</Text>
                    </View>
                  </View>
                  <View style={styles.paymentCardRow}>
                    <Text style={styles.label}>Round No.</Text>
                    <Text style={styles.value}>{data.round_no}</Text>
                  </View>
                  <View style={styles.paymentCardRow}>
                    <Text style={styles.label}>Name</Text>
                    <Text style={styles.value}>
                      {data?.committee_member_name
                        ? data?.committee_member_name
                        : 'User Not Assigned'}
                    </Text>
                  </View>
                  <View style={styles.paymentCardRow}>
                    <Text style={styles.label}>Month</Text>
                    <Text style={styles.value}>{data.round_month}</Text>
                  </View>

                  <View style={styles.paymentBTN}>
                    {month === data.round_month &&
                      data.status.toLowerCase() !== 'paid' ? (
                      <CustomButton
                        title="Payment Now"
                        onPress={() =>
                          navigation.navigate('UploadSlip', {
                            singleRoundAmount: details?.amount_per_member,
                            amount:
                              details?.amount_per_member *
                              (memberCountMap[data.committee_member_id] || 1),

                            memberCount:
                              memberCountMap[data.committee_member_id] || 1,

                            data: data,
                          })
                        }
                      />
                    ) : (
                      <DisabledButton title="Payment Now" />
                    )}
                  </View>
                </View>
              </View>
            );
          }}
        />
        {/* ---------------------------------------------------------------- */}
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginTop: 20,
  },

  backAndText: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  h1: {
    fontSize: moderateScale(24),
    color: AppColors.title,
    fontWeight: '600',
    marginLeft: 6,
  },

  textView: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  h4: {
    color: AppColors.title,
    fontSize: moderateScale(20),
  },

  activeBtn: {
    backgroundColor: AppColors.background,
    paddingHorizontal: 10,
    borderRadius: 20,
  },

  active: {
    fontSize: moderateScale(16),
    color: AppColors.link,
  },

  // ===== TOP CARD =====
  topCard: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 15,
    padding: 20,
    elevation: 5,
  },

  progressBox: {
    alignItems: 'center',
  },

  progressSub: {
    fontSize: 14,
    color: '#666',
  },

  progressLabel: {
    marginTop: 5,
    fontSize: 14,
  },

  bigText: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  // ===== GRID CARDS =====
  gridView: {
    width: '100%',
  },

  grid2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  smallCard: {
    width: '47%',
    alignItems: 'center',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    elevation: 3,
  },

  bold: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  // ===== CURRENT MONTH =====
  bigCard: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 15,
    padding: 15,
    elevation: 3,
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

  progressBarBg: {
    height: 8,
    backgroundColor: '#ddd',
    borderRadius: 10,
  },

  progressBarFill: {
    height: 8,
    backgroundColor: '#02af4a',
    borderRadius: 10,
  },

  // ===== PAYMENT CARD =====
  paymentStatus_view: {
    alignItems: 'center',
    padding: 5,
  },

  paymentStatus: {
    backgroundColor: AppColors.background,
    width: '98%',
    borderRadius: 20,
    borderColor: AppColors.primary,
    borderWidth: 1,
    elevation: 5,
    marginTop: 5,
  },

  cardHeader: {
    backgroundColor: AppColors.primary,
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  status: {
    color: AppColors.title,
    fontSize: moderateScale(18),
  },

  statustype: {
    backgroundColor: AppColors.background,
    width: 80,
    padding: 3,
    borderRadius: 15,
  },

  statustypeText: {
    textAlign: 'center',
    fontSize: moderateScale(14),
    color: AppColors.link,
  },

  paymentCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    marginTop: 5,
  },

  label: {
    fontSize: moderateScale(16),
  },

  value: {
    fontSize: moderateScale(16),
    color: AppColors.placeholder,
  },

  paymentBTN: {
    padding: 15,
  },
});

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
//     height: '250@vs',
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
//     marginLeft: 6,
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
//     width: '100%',

//     padding: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
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
//     fontSize: moderateScale(18),
//   },
//   text2: {
//     color: AppColors.bodyText,
//     fontSize: moderateScale(15),
//   },
//   buttons: {
//     width: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   btnView: {
//     width: '50%',
//     margin: 5,
//   },
//   //--------------------------
//   paymentStatus_view: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 5,
//   },
//   paymentStatus: {
//     backgroundColor: AppColors.background,
//     width: '98%',
//     borderRadius: 20,
//     borderColor: AppColors.primary,
//     borderWidth: 1,
//     elevation: 5,
//     marginTop: 5,
//   },
//   cardHeader: {
//     width: '100%',
//     backgroundColor: AppColors.primary,
//     padding: 15,
//     borderTopRightRadius: 20,
//     borderTopLeftRadius: 20,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   status: {
//     color: AppColors.title,
//     fontSize: moderateScale(18),
//   },
//   statustype: {
//     backgroundColor: AppColors.background,
//     width: 80,
//     padding: 3,
//     borderRadius: 15,
//   },
//   statustype_paid: {
//     backgroundColor: '#008200',
//     width: 80,
//     padding: 3,
//     borderRadius: 15,
//   },
//   statustype_Overdue: {
//     backgroundColor: '#DE3163',
//     width: 80,
//     padding: 3,
//     borderRadius: 15,
//   },
//   statustype_Rejected: {
//     backgroundColor: '#ec0936ff',
//     width: 80,
//     padding: 3,
//     borderRadius: 15,
//   },
//   statustypeText: {
//     textAlign: 'center',
//     fontSize: moderateScale(14),
//     color: AppColors.link,
//   },
//   paymentCardRow: {
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     flexDirection: 'row',
//     padding: 5,
//     marginTop: 5,
//   },
//   label: {
//     fontSize: moderateScale(16),
//     padding: 3,
//   },
//   value: {
//     fontSize: moderateScale(16),

//     textAlign: 'center',
//     color: AppColors.placeholder,
//     padding: 3,
//     textAlign: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   value_slip: {
//     fontSize: moderateScale(16),

//     textAlign: 'center',
//     color: AppColors.link,
//     padding: 3,
//     textAlign: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   slipView: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   paymentBTN: {
//     // backgroundColor:'green',
//     padding: 15,
//   },
//   //-------------------------------------------
//   topCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor: '#fff',
//     margin: 10,
//     borderRadius: 15,
//     padding: 20,
//     elevation: 5,
//   },

//   progressBox: {
//     alignItems: 'center',
//     flex: 1,
//   },

//   progressNumber: {
//     fontSize: 28,
//     fontWeight: 'bold',
//   },

//   progressSub: {
//     fontSize: 14,
//     color: '#666',
//   },

//   progressLabel: {
//     marginTop: 5,
//     fontSize: 14,
//   },

//   divider: {
//     width: 1,
//     backgroundColor: '#ddd',
//   },

//   cardsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//   },

//   card: {
//     width: '47%',
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     padding: 15,
//     marginVertical: 8,
//     elevation: 3,
//   },

//   cardTitle: {
//     color: '#888',
//     fontSize: 13,
//   },

//   cardValue: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginTop: 5,
//   },

//   bigCard: {
//     backgroundColor: '#fff',
//     margin: 10,
//     borderRadius: 15,
//     padding: 15,
//     elevation: 3,
//   },

//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 10,
//   },

//   rowBetween: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },

//   progressBarBg: {
//     height: 8,
//     backgroundColor: '#ddd',
//     borderRadius: 10,
//     marginTop: 10,
//   },

//   progressBarFill: {
//     height: 8,
//     backgroundColor: 'green',
//     borderRadius: 10,
//   },

//   timelineItem: {
//     marginVertical: 5,
//   },

//   btnRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginVertical: 20,
//   },

//   editBtn: {
//     backgroundColor: '#ff5a1f',
//     padding: 12,
//     borderRadius: 10,
//     width: '40%',
//     alignItems: 'center',
//   },

//   deleteBtn: {
//     backgroundColor: '#ccc',
//     padding: 12,
//     borderRadius: 10,
//     width: '40%',
//     alignItems: 'center',
//   },

//   btnText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
//   //----------------------------------
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     padding: 15,
//     marginBottom: 12,
//     elevation: 3,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   half: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   divider: {
//     width: 1,
//     height: '80%',
//     backgroundColor: '#ddd',
//   },
//   title: {
//     marginTop: 10,
//     fontSize: 14,
//   },
//   bold: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   bigText: {
//     fontSize: 28,
//     fontWeight: 'bold',
//   },
//   gridView: {
//     width: '100%',

//   },
//   grid2: {
//     width: '100%',
//     justifyContent: 'space-around',
//     flexDirection: 'row',


//   },
//   smallCard: {
//     width: '47%',
//     alignItems: 'center',
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   rowBetween: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   progressBar: {
//     height: 8,
//     backgroundColor: '#ddd',
//     borderRadius: 10,
//     overflow: 'hidden',
//     marginBottom: 5,
//   },
//   progressFill: {
//     height: '100%',
//     backgroundColor: '#02af4a',
//   },
// });

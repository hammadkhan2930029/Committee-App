import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { AppColors } from '../../../constant/appColors';
import { AppImages } from '../../../constant/appImages';
import { AppIcons } from '../../../constant/appIcons';
import { CustomButton } from '../../../components/customButton';
import { api } from '../../../services/api';
import { useEffect, useState } from 'react';
import { DisabledButton } from '../../../components/disabledButton';
import { Loader } from '../../Loader/loader';

export const UserCommitteeDetails = ({ route }) => {
  //---------------------------------------------

  const { data } = route.params;
  const [details, setDetails] = useState([]);
  const [roundList, setRoundList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  //----------------------------------------------

  const formatNumber = value => {
    if (value === null || value === undefined) return '';

    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  //----------committee details---------------------------

  const committeeDetails = async () => {
    try {
      const response = await api.get(
        `/user/view-committee-detail/${data?.committee_id}`,
      );
      console.log('response :', response);
      const result = response?.data?.msg[0];
      const rounds = response?.data?.rounds;
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
  console.log('roundList', roundList);

  //-------------------------------------------------

  const now = new Date();
  const month = now.toLocaleString('en-us', {
    month: 'short',
    year: 'numeric',
  });
  console.log('date :', month);

  //------------------------------------------------
  const memberCountMap  = roundList.reduce((acc, item) => {
    const id = item?.committee_member_id;
    if (!id) return acc;
    acc[id] = (acc[id] || 0) + 1;
    let count = acc;
    return count;
  }, {});

  console.log('filter :', memberCountMap);

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
                    <Image
                      source={AppIcons.arrowBack}
                      style={styles.arrowBack}
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
        <View style={styles.BCDetails}>
          <View style={styles.row}>
            <Text style={styles.text1}>Total Members</Text>
            <Text style={styles.text2}>{details?.total_member}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text1}>Total Rounds</Text>
            <Text style={styles.text2}>{details?.total_rounds}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text1}>Rounds Per Month</Text>
            <Text style={styles.text2}>{details?.rounds_per_month}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text1}>Amount Per Member</Text>
            <Text style={styles.text2}>
              PKR {formatNumber(details?.amount_per_member)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text1}>Total Amount</Text>
            <Text style={styles.text2}>PKR {formatNumber(details?.total)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text1}>Start Date</Text>
            <Text style={styles.text2}>{details?.start_date}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text1}>Due On</Text>
            <Text style={styles.text2}>{details?.due_on}</Text>
          </View>
        </View>
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
                        : 'null'}
                    </Text>
                  </View>
                  <View style={styles.paymentCardRow}>
                    <Text style={styles.label}>Month</Text>
                    <Text style={styles.value}>{data.round_month}</Text>
                  </View>

                  <View style={styles.paymentBTN}>
                    {month === data.round_month ? (
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
  },

  arrowBack: {
    width: 28,
    height: 28,
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
  //----------------------------------
  BCDetails: {
    width: '100%',

    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 6,
    borderBottomColor: AppColors.primary,
    borderBottomWidth: 2,
  },
  text1: {
    color: AppColors.blackText,
    fontSize: moderateScale(18),
  },
  text2: {
    color: AppColors.bodyText,
    fontSize: moderateScale(15),
  },
  buttons: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnView: {
    width: '50%',
    margin: 5,
  },
  //--------------------------
  paymentStatus_view: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  paymentStatus: {
    backgroundColor: AppColors.background,
    width: '90%',
    borderRadius: 20,
    borderColor: AppColors.primary,
    borderWidth: 1,
    elevation: 5,
    marginTop: 5,
  },
  cardHeader: {
    width: '100%',
    backgroundColor: AppColors.primary,
    padding: 15,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
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
  statustype_paid: {
    backgroundColor: '#008200',
    width: 80,
    padding: 3,
    borderRadius: 15,
  },
  statustype_Overdue: {
    backgroundColor: '#DE3163',
    width: 80,
    padding: 3,
    borderRadius: 15,
  },
  statustype_Rejected: {
    backgroundColor: '#ec0936ff',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
    marginTop: 5,
  },
  label: {
    fontSize: moderateScale(16),
    padding: 3,
  },
  value: {
    fontSize: moderateScale(16),

    textAlign: 'center',
    color: AppColors.placeholder,
    padding: 3,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  value_slip: {
    fontSize: moderateScale(16),

    textAlign: 'center',
    color: AppColors.link,
    padding: 3,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slipView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paymentBTN: {
    // backgroundColor:'green',
    padding: 15,
  },
});

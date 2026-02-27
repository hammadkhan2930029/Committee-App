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

  const navigation = useNavigation();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roundList, setRoundList] = useState([]);
  const [multipleData, setMultipleData] = useState([]);
  const [paymentList, setPaymentList] = useState([]);
  const [isverified, setIsVerified] = useState(false);

  //-----------------------------------------------------------------------

  const formatNumber = value => {
    if (!value) return '';
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
  console.log('committee details 2:', details);

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
      console.log('delete :', response);
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

  const AdminpaymentList = async () => {
    try {
      const response = await api.get(
        `/admin/view-committee-payments/list/${userdata.user_id}`,
      );
      const allPayments = response?.data?.msg || [];
      console.log('All payment :', allPayments);

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

      console.log('Is Verified:', isVerified);
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
  console.log('user data :', userdata);
  console.log('Is verified :', isverified);

  //-----------------------------------------------------------
  const CommitteeDetailsSkeleton = () => {
    return (
      <SkeletonPlaceholder borderRadius={8}>
        {/* Card */}
        <View style={styles.Skeletoncard}>
          {Array.from({ length: 9 }).map((_, index) => (
            <View key={index} style={styles.Skeletonrow}>
              <View style={styles.Skeletonleft} />
              <View style={styles.Skeletonright} />
            </View>
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.Skeletonbuttons}>
          <View style={styles.Skeletonbtn} />
          <View style={styles.Skeletonbtn} />
          <View style={styles.Skeletonbtn} />
          <View style={styles.Skeletonbtn} />
        </View>
      </SkeletonPlaceholder>
    );
  };
  //-----------------------------------------------------------
  useEffect(() => {
    if (!details?.committee_id) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [details]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />
      <ScrollView>
        <View>
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
        </View>
        {loading ? (
          <CommitteeDetailsSkeleton />
        ) : (
          <View>
            <View style={styles.BCDetails}>
              <View style={styles.row}>
                <Text style={styles.text1}>Total Members</Text>
                <Text style={styles.text2}>{details.total_member}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text1}>Total Rounds</Text>
                <Text style={styles.text2}>{details.total_rounds}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text1}>Round(s) Per Month</Text>
                <Text style={styles.text2}>{details.rounds_per_month}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text1}>No. of Months</Text>
                <Text style={styles.text2}>{details.no_of_month}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text1}>Amount Per Member</Text>
                <Text style={styles.text2}>
                  PKR {formatNumber(details.amount_per_member)}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text1}>Total Amount</Text>
                <Text style={styles.text2}>
                  PKR {formatNumber(details.total)}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text1}>Start Date</Text>
                <Text style={styles.text2}>{startDate}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text1}>Start Month</Text>
                <Text style={styles.text2}>{details.start_month}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text1}>Due On</Text>
                <Text style={styles.text2}>{dueOn}</Text>
              </View>
            </View>

            <View style={styles.buttons}>
              <View style={styles.btnView}>
                <TouchableOpacity
                  style={styles.deleteBTN}
                  onPress={() =>
                    navigate('EditCommittee', {
                      details: details,
                      start: startDate,
                      due: dueOn,
                    })
                  }
                >
                  <Text style={styles.text}>Edit</Text>
                  <Icon name="edit" size={18} color={AppColors.title} />
                </TouchableOpacity>
              </View>
              <View style={styles.btnView}>
                <TouchableOpacity
                  disabled={hasAnyPaid || isverified}
                  style={[
                    styles.deleteBTN,
                    {
                      backgroundColor:
                        hasAnyPaid || isverified
                          ? AppColors.placeholder
                          : AppColors.primary,
                    },
                  ]}
                  onPress={() => deleteCommittee()}
                >
                  <Text style={styles.text}>Delete</Text>
                  <Icon name="delete" size={18} color={AppColors.title} />
                </TouchableOpacity>
              </View>
              <View style={styles.btnView}>
                <CustomButtonLight
                  title="Add Members"
                  onPress={() =>
                    navigate('AddCommitteeMembers', {
                      multipleData: multipleData,
                    })
                  }
                />
              </View>
              <View style={styles.btnView}>
                <CustomButtonLight
                  title="Assign Rounds"
                  onPress={() =>
                    navigate('AssignRounds', { multipleData: multipleData })
                  }
                />
              </View>
            </View>
          </View>
        )}
      </ScrollView>
      {/* <Loader visible={loading} /> */}
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
    width: '95%',
    alignSelf: 'center',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.background,
    elevation: 5,
    borderRadius: 10,
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
    fontSize: RFValue(16),
  },
  text2: {
    color: AppColors.bodyText,
    fontSize: RFValue(14),
  },
  buttons: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
  },
  btnView: {
    width: '47%',
    marginTop: 10,
  },
  deleteIconView: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 15,
  },
  paymentHistoryView: {
    backgroundColor: AppColors.background,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 30,
  },
  paymentHistory: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  //-----------------------------------
  deleteBTN: {
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
    backgroundColor: AppColors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  //------skeletone---------------------------
  Skeletonheader: {
    height: 180,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  SkeletonbackIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  Skeletontitle: {
    width: 180,
    height: 25,
    marginLeft: 15,
  },
  Skeletoncard: {
    marginTop: 50,
    width: '95%',
    alignSelf: 'center',
    padding: 20,
  },
  Skeletonrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  Skeletonleft: {
    width: '45%',
    height: 16,
  },
  Skeletonright: {
    width: '35%',
    height: 16,
  },
  Skeletonbuttons: {
    marginTop: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  Skeletonbtn: {
    width: '47%',
    height: 45,
    borderRadius: 15,
    marginBottom: 12,
  },
  //-----------------------------------------------
});

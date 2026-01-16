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


export const CommitteeDetails = ({ route }) => {
  const { id } = route.params;
  console.log('ID :', id);
  const navigation = useNavigation();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const [multipleData, setMultipleData] = useState([]);

  //---thousand separator---only display ke liye-------
  const formatNumber = value => {
    if (!value) return '';
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  //------------------------------------------------
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
  console.log('committee details 2:', details.committee_id);
  //----------------delete committee-------------------
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
                    <Image
                      source={AppIcons.arrowBack}
                      style={styles.arrowBack}
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

        <View style={styles.BCDetails}>
          <View style={styles.deleteIconView}>
            <TouchableOpacity onPress={() => deleteCommittee()}>
              <Icon name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Text style={styles.text1}>Total Members</Text>
            <Text style={styles.text2}>{details.total_member}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text1}>Total Rounds</Text>
            <Text style={styles.text2}>{details.total_rounds}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text1}>Rounds Per Month</Text>
            <Text style={styles.text2}>{details.rounds_per_month}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text1}>No. of Month</Text>
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
            <Text style={styles.text2}>PKR {formatNumber(details.total)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text1}>Start Date</Text>
            <Text style={styles.text2}>{details.start_date}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text1}>Start Month</Text>
            <Text style={styles.text2}>{details.start_month}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text1}>Due On</Text>
            <Text style={styles.text2}>{details.due_on}</Text>
          </View>
        </View>

        <View></View>
        <View style={styles.buttons}>
          <View style={styles.btnView}>
            <CustomButton
              title="Edit Committee"
              onPress={() => navigate('EditCommittee', { details: details })}
            />
          </View>
          <View style={styles.btnView}>
            <CustomButtonLight
              title="Add Members"
              onPress={() =>
                navigate('AddCommitteeMembers', { multipleData: multipleData })
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
    // backgroundColor: 'green',
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
    marginTop: 15,
  },
  deleteIconView: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
  },
});

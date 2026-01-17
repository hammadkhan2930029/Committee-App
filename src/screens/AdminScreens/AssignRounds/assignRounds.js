import { useFocusEffect, useNavigation } from '@react-navigation/native';
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
import DropDownPicker from 'react-native-dropdown-picker';
import { useCallback, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { api } from '../../../services/api';
import Toast from 'react-native-toast-message';

export const AssignRounds = ({ route }) => {
  const [roundList, setRoundList] = useState([]);
  //---------------------------------------------
  const navigation = useNavigation();
  const { multipleData } = route.params;
  const committeeMembers = multipleData.members || [];
  const committeeRounds = multipleData.rounds || [];
  const committeeID = multipleData.msg[0].committee_id;
  // console.log('multi :', multipleData.msg[0].committee_id);
  // console.log('committeeMembers', committeeMembers);
  // console.log('committeeMemcommitteeRoundsbers', committeeRounds);

  // ---------- Members Dropdown ----------
  const [openMember, setOpenMember] = useState(false);
  const [memberValue, setMemberValue] = useState(null);
  const [memberItems, setMemberItems] = useState(
    committeeMembers.map(item => ({
      label: item.user_name,
      value: item.committe_member_id,
    })),
  );
  // console.log('members value :', memberValue);
  // ---------- Rounds Dropdown ----------
  const [openRound, setOpenRound] = useState(false);
  const [roundValue, setRoundValue] = useState(null);
  const [roundItems, setRoundItems] = useState(
    committeeRounds.map(item => ({
      label: item.round_no,
      value: item.committee_round_id,
    })),
  );
  //-------------user view committee rounds--------------------------
  const viewCommitteeRound = async () => {
    try {
      const response = await api.get(
        `/user/view-committee-rounds/${committeeID}`,
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
    }, []),
  );
  console.log('view committee round:', roundList);

  //--------------------assign round api--------------------------
  const roundApi = async () => {
    try {
      const formData = new FormData();
      formData.append('committee_round_id[]', roundValue);
      formData.append('committee_member_id[]', memberValue);

      const res = await api.post('/user/assign-rounds-to-members', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('FULL RESPONSE:', res.data);

      if (res?.data?.code === '200') {
        console.log('SUCCESS MSG:', res.data.msg[0].response);
      }

      const data = res?.data?.msg[0]?.response;

      if (data && res?.data?.code === '200') {
        Toast.show({
          type: 'customToast',
          text1: 'Success',
          text2: data,
          props: {
            bgColor: AppColors.background,
            borderColor: 'green',
          },
        });
        viewCommitteeRound();
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
    } catch (error) {
      console.log('error :', error);
      Toast.show({
        type: 'customToast',
        text1: 'Error',
        text2: 'Server error, please try again',
        props: {
          bgColor: AppColors.background,
          borderColor: '#ff5252',
        },
      });
    }
  };

  //----------------------delete committee round ----------------------
  const deleteCommitteeRound = async roundID => {
    try {
      const response = await api.delete(
        `/user/delete-committee-round/${roundID}`,
      );
      const result = await response.data.msg[0].response;
      viewCommitteeRound();
      console.log(result);
    } catch (error) {
      console.log(error);
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
                  <Text style={styles.h1}>Assign Rounds To Member</Text>
                </View>
              </View>
              <View style={styles.textView}>
                <Text style={styles.h4}>
                  Select a user from the list to add into this committee
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View>
          <View style={[styles.dropDownView, { zIndex: 2000 }]}>
            <Text style={styles.label}>Select Committee Member</Text>
            <DropDownPicker
              open={openMember}
              value={memberValue}
              items={memberItems}
              setOpen={setOpenMember}
              setValue={setMemberValue}
              setItems={setMemberItems}
              placeholder="Choose member"
              listMode="MODAL"
              modalTitle="Select Committee No"
              modalProps={{
                animationType: 'slide',
              }}
              modalContentContainerStyle={{
                backgroundColor: '#ffffff',
              }}
              style={styles.dropDown}
              dropDownContainerStyle={styles.dropDown}
              ArrowDownIconComponent={() => (
                <Icon name="arrow-drop-down" size={24} color="#666" />
              )}
              ArrowUpIconComponent={() => (
                <Icon name="arrow-drop-up" size={24} color="#666" />
              )}
            />
          </View>
          <View style={[styles.dropDownView, { zIndex: 1000 }]}>
            <Text style={styles.label}>Select Round</Text>
            <DropDownPicker
              open={openRound}
              value={roundValue}
              items={roundItems}
              setOpen={setOpenRound}
              setValue={setRoundValue}
              setItems={setRoundItems}
              placeholder="Choose round"
              listMode="MODAL"
              modalTitle="Select Committee No"
              modalProps={{
                animationType: 'slide',
              }}
              modalContentContainerStyle={{
                backgroundColor: '#ffffff',
              }}
              style={styles.dropDown}
              dropDownContainerStyle={styles.dropDown}
              ArrowDownIconComponent={() => (
                <Icon name="arrow-drop-down" size={24} color="#666" />
              )}
              ArrowUpIconComponent={() => (
                <Icon name="arrow-drop-up" size={24} color="#666" />
              )}
            />
          </View>
        </View>

        <View style={styles.buttons}>
          <View style={styles.btnView}>
            <CustomButton title="Assign Round" onPress={() => roundApi()} />
          </View>
        </View>
        {/* ------------------------------------------------------------------- */}
        <View style={styles.tableMainView}>
          <View style={styles.tableHeader}>
            <View style={styles.cell}>
              <Text style={styles.headerText}>Round no </Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.headerText}>Name </Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.headerText}>Action </Text>
            </View>
          </View>
          <FlatList
            data={roundList}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.tableRow,
                  { display: item.committe_member_name ? 'flex' : 'none' },
                ]}
              >
                <View style={styles.Rowcell}>
                  <Text style={styles.text}>{item.round_no}</Text>
                </View>
                <View style={styles.Rowcell}>
                  <Text style={styles.text}>{item.committe_member_name}</Text>
                </View>
                <View style={styles.Rowcell}>
                  <TouchableOpacity
                    onPress={() =>
                      deleteCommitteeRound(item.committee_round_id)
                    }
                  >
                    <Icon name="delete" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
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
    fontSize: moderateScale(16),
    opacity: 0.9,
    padding: 3,
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
  label: {
    marginBottom: '5@ms',
    fontSize: '14@ms',
    color: '#333',
  },
  dropDown: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: '10@ms',
    backgroundColor: '#f7f4f4ff',
    paddingHorizontal: '10@ms',
  },
  dropDownView: {
    width: '100%',
    padding: 15,
  },
  textInput: {
    width: '100%',
    padding: 15,
  },
  //---------table-------------------
  tableMainView: {
    width: '100%',
    marginTop: 15,
    backgroundColor: AppColors.background,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
  },

  tableHeader: {
    backgroundColor: AppColors.primary,
    width: '100%',
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
  },

  cell: {
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerText: {
    fontSize: moderateScale(17),
    fontWeight: '600',
    color: AppColors.title,
  },

  tableRow: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: AppColors.background,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.placeholder + '40',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
  },

  Rowcell: {
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: moderateScale(15),
    color: AppColors.bodyText,
  },
});

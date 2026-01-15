import { useNavigation } from '@react-navigation/native';
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
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { api } from '../../../services/api';
import Toast from 'react-native-toast-message';

export const AssignRounds = ({ route }) => {
  //---------------------------------------------
  const navigation = useNavigation();
  const { multipleData } = route.params;
  const committeeMembers = multipleData.members || [];
  const committeeRounds = multipleData.rounds || [];
  console.log('committeeMembers', committeeMembers);
  console.log('committeeMemcommitteeRoundsbers', committeeRounds);

  // ---------- Members Dropdown ----------
  const [openMember, setOpenMember] = useState(false);
  const [memberValue, setMemberValue] = useState(null);
  const [memberItems, setMemberItems] = useState(
    committeeMembers.map(item => ({
      label: item.user_name,
      value: item.user_id,
    })),
  );
  console.log('members value :', memberValue);
  // ---------- Rounds Dropdown ----------
  const [openRound, setOpenRound] = useState(false);
  const [roundValue, setRoundValue] = useState(null);
  const [roundItems, setRoundItems] = useState(
    committeeRounds.map(item => ({
      label: item.round_no,
      value: item.committee_round_id,
    })),
  );
  console.log('round value :', roundValue);

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
      if (res?.data?.code === '200') {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res.data.msg[0].response,
        });
      }
    } catch (error) {
      console.log('error :', error);
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
              // listMode="SCROLLVIEW"
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
              // listMode="SCROLLVIEW"
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
      </ScrollView>
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
});

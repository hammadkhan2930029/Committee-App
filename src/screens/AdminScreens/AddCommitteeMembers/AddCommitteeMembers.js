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
import { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { api } from '../../../services/api';
import { getStoredUser } from '../../../Utils/getUser';
import Toast from 'react-native-toast-message';
import { RFValue } from 'react-native-responsive-fontsize';
import { Dropdown } from 'react-native-element-dropdown';
import { isDisabled } from 'react-native/types_generated/Libraries/LogBox/Data/LogBoxData';

export const AddCommitteeMembers = ({ route }) => {
  //-------------------------------------------

  const [userdata, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [membersList, setMembersList] = useState([]);

  //--------------dropdown 1-----------------------------------

  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([]);
  const [isFocus1, setIsFocus1] = useState(false);

  //------------------dropdown 2----------------------

  const [items2, setItems2] = useState([]);
  const [value2, setValue2] = useState(null);
  const [isFocus2, setIsFocus2] = useState(false);

  //---------select members ID dropdown 2------------------------

  const { multipleData } = route.params;

  const committeeID = multipleData?.msg[0]?.committee_id;

  const membersID = multipleData.members.map(item => item);

  console.log('committee multipleData :', membersID);
  useEffect(() => {
    if (multipleData?.members?.length) {
      const dropdownItems = multipleData.members.map((item, index) => ({
        label: `${index + 1}`,
        value: item.committe_member_id,
      }));
      setItems1(dropdownItems);
    }
  }, []);
  //--------------------members api---------------------------------------
  const membersApi = async () => {
    try {
      const response = await api.get(
        `/user/view-committee-members/${committeeID}`,
      );
      const data = response?.data?.msg;
      setMembersList(data);
    } catch (error) {
      console.log('members api error:', error);
    }
  };
  useEffect(() => {
    membersApi();
  }, [committeeID]);
  console.log('member api :', membersList);
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

  //-----------------user list------------------------

  const userViewUsers = async () => {
    if (!userdata?.user_id) return;

    try {
      const response = await api.get(`/user/view-users/${userdata.user_id}`);
      if (Array.isArray(response.data.msg)) {
        const dropdownItems = response.data.msg.map(user => ({
          label: user.name,
          value: user.user_id,
        }));
        setItems2(dropdownItems);
      } else {
        setUserList([]);
        setItems2([]);
      }
    } catch (error) {
      console.log('error :', error);
    }
  };

  useEffect(() => {
    if (userdata?.user_id) {
      userViewUsers();
    }
  }, [userdata]);

  //-------------------add members api---------------------------

  const addCommitteeMember = async () => {
    try {
      var formData = new FormData();
      formData.append('committee_member_id[]', value1);
      formData.append('user_id[]', value2);

      const res = await api.post('/user/update/committee-members', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const response = res?.data;
      console.log('response :', response);
      if (response.code === '200' && response.msg[0].response) {
        Toast.show({
          type: 'customToast',
          text1: 'Success',
          text2: response.msg[0].response,
          props: {
            bgColor: AppColors.background,
            borderColor: 'green',
          },
        });
        membersApi();
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
      console.log(error);
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
  console.log('value 1 :', value1);
  console.log('value 2 :', value2);

  //-------------------------delete member api---------------------------
  const deleteCommitteeMember = async committeeMemberID => {
    try {
      const response = await api.delete(
        `/user/delete-committee-member/${committeeMemberID}`,
      );
      const result = response?.data;
      if (result.code === '200' && result.msg[0].response) {
        Toast.show({
          type: 'customToast',
          text1: 'Success',
          text2: result.msg[0].response,
          props: {
            bgColor: AppColors.background,
            borderColor: 'green',
          },
        });
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
      membersApi();
      console.log('delete Committee Member :', response);
    } catch (error) {
      console.log(error);
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
  };
  //----------------------------------------------------------------

  const renderLabel1 = () => {
    if (value1 || isFocus1) {
      return (
        <Text style={[styles.label, isFocus1 && { color: AppColors.primary }]}>
          Select Committee no
        </Text>
      );
    }
    return null;
  };
  //----------------------------------------------------------------

  const renderLabel2 = () => {
    if (value2 || isFocus2) {
      return (
        <Text style={[styles.label, isFocus2 && { color: AppColors.primary }]}>
          Select Member
        </Text>
      );
    }
    return null;
  };
  const isDataEmpty = !items2 || items2.length === 0;

  //------------------------------------------------------------

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        keyboardShouldPersistTaps="handled"
      >
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
                  <Text style={styles.h1}>Add Committee Members</Text>
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
        {/* ------------------------------------------------------------------ */}
        <View style={styles.dropdownMain}>
          <View style={styles.DropDowncontainer}>
            {renderLabel1()}
            <Dropdown
              style={[
                styles.dropdown,
                isFocus1 && { borderColor: AppColors.primary },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={items1}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus1 ? 'Select Committee no' : '...'}
              value={value1}
              onFocus={() => setIsFocus1(true)}
              onBlur={() => setIsFocus1(false)}
              onChange={item => {
                setValue1(item.value);
                setIsFocus1(false);
              }}
              renderLeftIcon={() => (
                <Icon
                  style={styles.icon}
                  color={isFocus1 ? AppColors.primary : 'black'}
                  name="playlist-add"
                  size={20}
                />
              )}
            />
          </View>

          {/* ------------------------------------------------------------------ */}
          <View style={styles.DropDowncontainer}>
            {renderLabel2()}
            <Dropdown
              disable={isDataEmpty}
              style={[
                styles.dropdown,
                isFocus2 && { borderColor: AppColors.primary },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={items2}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus2 ? 'Select Member' : '...'}
              searchPlaceholder="Search..."
              value={value2}
              onFocus={() => setIsFocus2(true)}
              onBlur={() => setIsFocus2(false)}
              onChange={item => {
                setValue2(item.value);
                setIsFocus2(false);
              }}
              renderLeftIcon={() => (
                <Icon
                  style={styles.icon}
                  color={isFocus2 ? AppColors.primary : 'black'}
                  name="person-add"
                  size={20}
                />
              )}
            />
          </View>
        </View>
        {/* ---------------------------------------------------------------- */}

        <View style={styles.buttons}>
          <View style={styles.btnView}>
            <CustomButton
              title="Add Member"
              onPress={() => addCommitteeMember()}
            />
          </View>
        </View>
        {/* ------------------------------------------------------------------- */}

        <View style={styles.tableMainView}>
          <FlatList
            data={membersList}
            ListHeaderComponent={
              <View style={styles.tableHeader}>
                <View style={styles.cell}>
                  <Text style={styles.headerText}>Member # </Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.headerText}>Name </Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.headerText}>Action </Text>
                </View>
              </View>
            }
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.tableRow,
                  { display: item.user_name ? 'flex' : 'none' },
                ]}
              >
                <View style={styles.Rowcell}>
                  <Text style={styles.text}>{index + 1}</Text>
                </View>
                <View style={styles.Rowcell}>
                  <Text style={styles.text}>{item.user_name}</Text>
                </View>
                <View style={styles.Rowcell}>
                  <TouchableOpacity
                    onPress={() =>
                      deleteCommitteeMember(item.committe_member_id)
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
    fontSize: RFValue(20),
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
    margin: 10,
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
    borderRadius: 10,
    backgroundColor: '#f7f4f4ff',
    paddingHorizontal: '10@ms',
  },
  dropdownMain: {
    backgroundColor: AppColors.background,
    width: '95%',
    padding: 15,
    elevation: 5,
    zIndex: 3000,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 15,
  },
  dropDownView: {
    backgroundColor: AppColors.background,
    width: '100%',
    padding: 5,
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
  //---------------------------------
  DropDowncontainer: {
    backgroundColor: 'white',
    padding: 10,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

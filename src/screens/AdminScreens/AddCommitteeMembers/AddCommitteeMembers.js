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
import DropDownPicker from 'react-native-dropdown-picker';
import { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { api } from '../../../services/api';
import { getStoredUser } from '../../../Utils/getUser';
import Toast from 'react-native-toast-message';

export const AddCommitteeMembers = ({ route }) => {
  //-------------------------------------------

  const [userdata, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  //------------------dropdown 1----------------------

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  //--------------dropdown 2-----------------------------------

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([]);

  //-------------------select members ID dropdown 2------------------------

  const { multipleData } = route.params;
  const membersID = multipleData.members.map(item => item);

  console.log('committee multipleData :', membersID);
  useEffect(() => {
    if (multipleData?.members?.length) {
      const dropdownItems = multipleData.members.map((item, index) => ({
        label: `${index + 1}`,
        value: item.committe_member_id,
      }));
      setItems2(dropdownItems);
    }
  }, []);
  console.log('committe member id already created :', value2);

  //-----------------get user data --------------------

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
  console.log('user id', userdata.user_id);

  //-----------------user list------------------------

  const userViewUsers = async () => {
    if (!userdata?.user_id) return;

    console.log(userdata.user_id);

    try {
      const response = await api.get(`/user/view-users/${userdata.user_id}`);
      console.log('response:', response.data.msg);
      if (Array.isArray(response.data.msg)) {
        const dropdownItems = response.data.msg.map(user => ({
          label: user.name,
          value: user.user_id,
        }));
        // setUserList(response.data.msg);
        setItems(dropdownItems);
      } else {
        setUserList([]);
        setItems([]);
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
  console.log('user list:', items);

  //-------------------add members api---------------------------

  const addCommitteeMember = async () => {
    try {
      var formData = new FormData();
      formData.append('committee_member_id[]', value2);
      formData.append('user_id[]', value);

      const res = await api.post('/user/update/committee-members', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const response = res?.data;
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

      console.log('Add committee member response:', res);
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
  console.log('set value :', value);
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
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image source={AppIcons.arrowBack} style={styles.arrowBack} />
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
        <View style={[styles.dropDownView, { zIndex: 2000 }]}>
          <Text style={styles.label}>Select Committee no</Text>
          <DropDownPicker
            open={open2}
            items={items2}
            setOpen={setOpen2}
            value={value2}
            setValue={setValue2}
            setItems={setItems2}
            placeholder="Choose members ID"
            style={styles.dropDown}
            // maxHeight={300}
            dropDownContainerStyle={{
              // maxHeight: 300,
              borderColor: '#ccc',
              borderRadius: 10,
              backgroundColor: '#f7f4f4ff',
              color: '#000',
            }}
            // flatListProps={{
            //   nestedScrollEnabled: true,
            //   showsVerticalScrollIndicator: true,
            // }}
            // listMode="SCROLLVIEW"
            // listMode="MODAL" // 🔥 KEY FIX
            // modalTitle="Select Committee No"
            // modalProps={{
            //   animationType: 'slide',
            // }}
            // modalContentContainerStyle={{
            //   backgroundColor: '#fff',
            // }}
            ArrowDownIconComponent={() => (
              <Icon name="arrow-drop-down" size={24} color="#666" />
            )}
            ArrowUpIconComponent={() => (
              <Icon name="arrow-drop-up" size={24} color="#666" />
            )}
          />
        </View>
        {/* ------------------------------------------------------------------ */}
        <View style={[styles.dropDownView, { zIndex: 1000 }]}>
          <Text style={styles.label}>Select Member</Text>
          <DropDownPicker
            open={open}
            items={items}
            setOpen={setOpen}
            value={value}
            setValue={setValue}
            setItems={setItems}
            placeholder="Choose user"
            style={styles.dropDown}
            // maxHeight={300}
            dropDownContainerStyle={{
              // maxHeight: 300,
              borderColor: '#ccc',
              borderRadius: 10,
              backgroundColor: '#f7f4f4ff',
              color: '#000',
            }}
            // flatListProps={{
            //   nestedScrollEnabled: true,
            //   showsVerticalScrollIndicator: true,
            // }}
            // listMode="FLATLIST"
            // listMode="MODAL"
            // modalTitle="Select Committee No"
            // modalProps={{
            //   animationType: 'slide',
            // }}
            // modalContentContainerStyle={{
            //   backgroundColor: '#fff',
            // }}
            ArrowDownIconComponent={() => (
              <Icon name="arrow-drop-down" size={24} color="#666" />
            )}
            ArrowUpIconComponent={() => (
              <Icon name="arrow-drop-up" size={24} color="#666" />
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
        <View style={styles.tableHeader}>
          <View style={styles.cell}>
            <Text style={styles.headerText}>Member # </Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.headerText}>Name </Text>
          </View>
        </View>
        {/* {multipleData.members.map(item => (
          <View style={styles.tableRow} key={item.committe_member_id}>
            <View style={styles.Rowcell}>
              <Text style={styles.text}>Member {item.committe_member_id}</Text>
            </View>
            <View style={styles.Rowcell}>
              <Text style={styles.text}>{item.user_name}</Text>
            </View>
          </View>
        ))} */}
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.background,
    padding: 10,
    elevation: 5,
  },
  tableHeader: {
    // backgroundColor:AppColors.primary,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
  },
  cell: {
    width: '50%',
    backgroundColor: AppColors.primary,
    margin: 2,
    borderRadius: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: moderateScale(20),
    padding: 5,
    color: AppColors.title,
  },
  tableRow: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: moderateScale(20),
    padding: 5,
    color: AppColors.bodyText,
  },
  Rowcell: {
    width: '50%',
    margin: 2,
    borderRadius: 10,
  },
});

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

export const AddCommitteeMembers = () => {
  const [userdata, setUserData] = useState([]);
  const [userList, setUserList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  //----------------------------------------
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);

  const [items, setItems] = useState([]);

  //-----------------get data--------------------

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

  //-----------------user list------------------------
  const userViewUsers = async () => {
    if (!userdata?.user_id) return; // safeguard

    console.log(userdata.user_id);

    try {
      const response = await api.get(`/user/view-users/${userdata.user_id}`);
      console.log('response:', response.data.msg);
      if (Array.isArray(response.data.msg)) {
        const dropdownItems = response.data.msg.map(user => ({
          label: user.name, // jo screen par dikhana hai
          value: user.user_id, // jo backend me bhejna hai
        }));
        setUserList(response.data.msg); // original list optional
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
  console.log('add members committee :', items);

  //----------------------------------------------
  const addCommitteeMember = async () => {
    try {
      var formData = new FormData();
      formData.append('committee_member_id[]', value);
      formData.append('user_id[]', userdata.user_id);

      const response = await api.post(
        '/user/update/committee-members',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
      console.log('Add committee member response:', response);
    } catch (error) {
      console.log(error);
    }
  };
  console.log('set value :', value);
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
        <View style={styles.dropDownView}>
          <Text style={styles.label}>Select Member</Text>
          <DropDownPicker
            open={open}
            items={items}
            setOpen={setOpen}
            value={value}
            setValue={setValue}
            setItems={setItems}
            placeholder="Choose member"
            style={styles.dropDown}
            dropDownContainerStyle={{
              borderColor: '#ccc',
              borderRadius: 10,
              backgroundColor: '#f7f4f4ff',
              paddingHorizontal: '10@ms',
              color: '#000',
            }}
            listMode="SCROLLVIEW"
            ArrowDownIconComponent={() => (
              <Icon name="arrow-drop-down" size={24} color="#666" />
            )}
            ArrowUpIconComponent={() => (
              <Icon name="arrow-drop-up" size={24} color="#666" />
            )}
          />
        </View>

        <View style={styles.buttons}>
          <View style={styles.btnView}>
            <CustomButton
              title="Add Member"
              onPress={() => addCommitteeMember()}
            />
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
});

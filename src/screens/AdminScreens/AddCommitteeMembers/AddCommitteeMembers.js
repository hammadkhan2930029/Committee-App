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
import { CustomButton } from '../../../components/customButton';
import { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { api } from '../../../services/api';
import { getStoredUser } from '../../../Utils/getUser';
import Toast from 'react-native-toast-message';
import { RFValue } from 'react-native-responsive-fontsize';
import { CustomInputWithIcon } from '../../../components/customInputWithIcon';



export const AddCommitteeMembers = ({ route }) => {
    //-------------------------------------------

    const [userdata, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const [membersList, setMembersList] = useState([]);
    const [membersidList, setMembersidList] = useState([]);
    const [selectCode, setselectCode] = useState();

    //--------------------------------------------------------
    const [paymentList, setPaymentList] = useState([]);
    const [isverified, setIsVerified] = useState();

    //---------select members ID dropdown 2------------------------

    const { multipleData } = route.params;

    const committeeID = multipleData?.msg[0]?.committee_id;

    const membersID = multipleData.members.map(item => item);

    //---------------member list ma user_id null ho ----------------------

    const findMemberID = membersidList?.find(item => item.user_id === null);

    const filteredMemberID = findMemberID?.committe_member_id;

    //---------member list ma koi bhi user id khali nh ho usko check karna hy-----------

    const memberIdAndLenght = membersidList?.every(
        item => item.user_id !== null && item.user_id !== undefined,
    )
        ? 1
        : 0;

    //--------------------members api---------------------------------------
    const membersApi = async () => {
        try {
            const response = await api.get(
                `/user/view-committee-members/${committeeID}`,
            );
            const data = response?.data?.msg || [];

            setMembersidList(data);
            const filtered = data?.filter(item => item.user_name);
            setMembersList(filtered);
        } catch (error) {
            console.log('members api error:', error);
        }
    };
    useEffect(() => {
        membersApi();
    }, [committeeID]);

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

    //-------------------add members api---------------------------

    const addMember = async () => {
        try {
            var formData = new FormData();
            formData.append('committee_id', committeeID);
            formData.append('committee_member_id', filteredMemberID);
            formData.append('reg_code', selectCode);

            const response = await api.post(
                `/user/update/committee-members`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                },
            );
            const result = response.data.msg[0].response;


            if (response.data.code === '200' && result) {
                Toast.show({
                    type: 'customToast',
                    text1: 'Success',
                    text2: result,
                    props: {
                        bgColor: AppColors.background,
                        borderColor: 'green',
                    },
                });
            }
            if (response.data.code === '201' && result) {
                Toast.show({
                    type: 'customToast',
                    text1: 'Warning',
                    text2: result,
                    props: {
                        bgColor: AppColors.background,
                        borderColor: 'orange',
                    },
                });
            }
            membersApi();
            setselectCode();
        } catch (error) {
            console.log(error);
        }
    };


    //-------------------------delete member api---------------------------

    const deleteCommitteeMember = async committeeMemberID => {
        try {
            const response = await api.delete(
                `/user/delete-committee-member/${committeeMemberID}`,
            );
            const result = response?.data?.msg[0].response;

            if (response.data.code === '200' && result) {
                Toast.show({
                    type: 'customToast',
                    text1: 'Success',
                    text2: result,
                    props: {
                        bgColor: AppColors.background,
                        borderColor: 'green',
                    },
                });
            }
            if (response.data.code === '201' && result) {
                Toast.show({
                    type: 'customToast',
                    text1: 'Warning',
                    text2: result,
                    props: {
                        bgColor: AppColors.background,
                        borderColor: 'orange',
                    },
                });
            }
            membersApi();
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


    //------------------------------------------------------------
    const committee_id_filter = membersID[0].committee_id;

    const AdminpaymentList = async () => {
        try {
            const response = await api.get(
                `/admin/view-committee-payments/list/${userdata.user_id}`,
            );
            const allPayments = response?.data?.msg || [];

            const filteredPayments = allPayments.filter(
                item => item.committe_id === committee_id_filter,
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
        }, [userdata]),
    );
    //------------------------------------------------------------

    const len = membersidList.length;
    const emptyValue = membersidList.filter(item => item.user_id === null).length;

    //------------------------------------------------------------
    const [error, setError] = useState('');


    const handleChange = text => {
        setselectCode(text);


    };
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
                                        <Icon name="arrow-back" size={24} color="#fff" />
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

                <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                        {len - emptyValue}
                        <Text style={styles.badgeMuted}> / {len} Members</Text>
                    </Text>
                </View>

                <View style={styles.dropdownMain}>
                    <View>
                        <CustomInputWithIcon
                            label="Registerd Code"
                            type="text"
                            placeholder="Enter code e.g (9DK42B)"
                            value={selectCode}
                            onChangeText={handleChange}
                        />
                        {error.length > 0 && <Text style={styles.error}>{error}</Text>}
                    </View>

                </View>
                {/* ---------------------------------------------------------------- */}

                <View style={styles.buttons}>
                    <View style={styles.btnView}>
                        <CustomButton
                            title="Add Member"
                            disabled={memberIdAndLenght === 1}
                            onPress={addMember}
                        />
                    </View>
                </View>
                {/* ------------------------------------------------------------------- */}

                <View style={styles.tableMainView}>
                    <FlatList
                        data={membersList}
                        extraData={membersList}
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
                        keyExtractor={(item, index) => item.committe_member_id.toString()}
                        scrollEnabled={false}
                        renderItem={({ item, index }) => {
                            console.log('add memnber :', item);
                            return (
                                <View style={styles.tableRow}>
                                    <View style={styles.Rowcell}>
                                        <Text style={styles.text}>{index + 1}</Text>
                                    </View>
                                    <View style={styles.Rowcell}>
                                        <Text style={styles.text}>{item.user_name}</Text>
                                    </View>
                                    <View style={styles.Rowcell}>
                                        <TouchableOpacity
                                            disabled={isverified}
                                            onPress={() =>
                                                deleteCommitteeMember(item.committe_member_id)
                                            }
                                        >
                                            <Icon
                                                name="delete"
                                                size={24}
                                                color={isverified ? 'gray' : 'red'}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        }}
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
        marginLeft: 6,
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
    //-----------------------------
    badge: {
        backgroundColor: AppColors.primary,
        borderRadius: 30,
        paddingVertical: 8,
        paddingHorizontal: 18,
        alignSelf: 'flex-end',
        elevation: 3,
        margin: 5,
    },
    badgeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: AppColors.title,
    },
    badgeMuted: {
        color: AppColors.title,
        fontSize: 14,
    },
    error: {
        color: "red",
        marginTop: 5,
        fontSize: 14,
    },
});

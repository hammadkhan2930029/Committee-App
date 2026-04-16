
import React, { useCallback, useState } from 'react';
import {
    Image,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
} from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { AppColors } from '../../constant/appColors';
import { AppImages } from '../../constant/appImages';
import { CustomButton } from '../../components/customButton';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loader } from '../Loader/loader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CommonActions } from '@react-navigation/native';
import { CustomButtonLight } from '../../components/customeButtonLight';
import { getStoredUser } from '../../Utils/getUser';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const { width } = Dimensions.get('window');

export const AdminProfile = () => {
    const [userdata, setUserData] = useState(null);
    const [isLodaing, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false)
    //--------------------------------------------
    const toggleMenu = () => {
        setVisible(!visible);
    };

    const handleOption = (type) => {
        setVisible(false);

        if (type === 'ChangePassword') {
            navigation.navigate('ChangePassword')

        } else if (type === 'suggestion') {
            navigation.navigate('SuggestionScreen')
        } else if (type === 'support') {
            navigation.navigate('SupportTeam')
        }
    };
    //--------------------------------------------

    useFocusEffect(
        useCallback(() => {
            const loadUser = async () => {
                const user = await getStoredUser();
                if (user) {
                    setUserData(user);
                    // console.log(user.full_name, user.user_id);
                }
            };
            loadUser();
        }, []),
    );

    const logout = async () => {
        setIsLoading(true);
        await AsyncStorage.multiRemove(['user', 'token', 'ModalClosed']);

        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'AuthStack' }],
            }),
        );

        setIsLoading(false);
    };

    if (!userdata) return <Loader visible />;

    //---------------------------------------------------------

    const copyToClipboard = (value) => {
        Clipboard.setString(value);

        Toast.show({
            type: 'customToast',
            text1: 'Copied',
            text2: 'Code copied successfully ✅',
            props: {
                bgColor: AppColors.background,
                borderColor: 'green',
            },
        });
    };

    //---------------------------------------------------------

    const renderRow = (label, value, isCopy = false) => (
        <View style={styles.row}>
            <Text style={styles.label}>{label}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.value}>{value}</Text>

                {isCopy && (
                    <TouchableOpacity onPress={() => copyToClipboard(value)}>
                        <MaterialIcons
                            name="content-copy"
                            size={18}
                            color={AppColors.primary}
                            style={{ marginLeft: 8 }}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    //---------------------------------------------------------


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />

            <ScrollView contentContainerStyle={styles.scroll}>

                {/* HEADER */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={26} color="#fff" />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>My Profile</Text>
                    <TouchableOpacity onPress={toggleMenu}>

                        <Icon name="settings" size={24} color="#fff" />
                    </TouchableOpacity>


                    {/* DROPDOWN */}
                    {visible && (
                        <View style={styles.dropdown}>
                            <TouchableOpacity onPress={() => handleOption('ChangePassword')} style={styles.item}>
                                <Icon name="password" size={24} color={AppColors.link} />
                                <Text style={styles.text}>Change Password</Text>
                            </TouchableOpacity>

                            
                        </View>
                    )}
                </View>

                {/* PROFILE CARD */}
                <View style={styles.card}>
                    <Image
                        source={
                            userdata?.image
                                ? { uri: userdata.image }
                                : AppImages.profileAvatar
                        }
                        style={styles.image}
                    />

                    <Text style={styles.name}>{userdata?.full_name}</Text>
                    <Text style={styles.role}>Administrator</Text>
                </View>

                {/* INFO CARD */}
                <View style={styles.infoCard}>
                    {renderRow('Full Name', userdata?.full_name)}
                    {renderRow('Phone', userdata?.phone)}
                    {renderRow('Email', userdata?.email)}
                    {renderRow('User Code', userdata?.reg_code, true)}

                </View>

                {/* BUTTONS */}
                <View style={styles.btnWrap}>
                    <CustomButton
                        title="Edit Profile"
                        onPress={() =>
                            navigation.navigate('AdminEditProfile', { user: userdata })
                        }
                    />
                    <View style={styles.btnView}>

                        <CustomButtonLight
                            title='Log Out'
                            onPress={logout}
                        />
                    </View>


                </View>
            </ScrollView>

            <Loader visible={isLodaing} />
        </View>
    );
};



//-----------------------------------------------------------------

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.background,

    },

    scroll: {
        paddingBottom: '30@ms',
    },

    header: {
        backgroundColor: AppColors.primary,
        padding: '25@ms',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomLeftRadius: '45@ms',
        borderBottomRightRadius: '45@ms',
        elevation: 8,
        position: 'relative',
        zIndex: 50

    },

    headerTitle: {
        color: '#fff',
        fontSize: '18@ms',
        fontWeight: '600',
    },

    card: {
        alignItems: 'center',
        marginTop: '20@ms',
        backgroundColor: AppColors.primary,
        marginHorizontal: '20@ms',
        padding: '20@ms',
        borderRadius: '20@ms',
        elevation: 6,
    },

    image: {
        width: width * 0.28,
        height: width * 0.28,
        borderRadius: (width * 0.28) / 2,
        marginBottom: '10@ms',
        elevation: 5
    },

    name: {
        fontSize: '20@ms',
        fontWeight: '700',
        color: '#fff'
    },

    role: {
        fontSize: '14@ms',
        color: AppColors.cardLight,
        marginTop: '4@ms',
    },

    infoCard: {
        backgroundColor: AppColors.cardLight,
        margin: '20@ms',
        padding: '15@ms',
        borderRadius: '15@ms',
        elevation: 4,

    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: '10@ms',
        borderBottomWidth: 0.5,
        borderColor: '#dfc2b6',
    },

    label: {
        fontSize: '15@ms',
        fontWeight: '600',

        color: AppColors.primary

    },

    value: {
        fontSize: '15@ms',
        fontWeight: '400',
        color: AppColors.primary

    },

    btnWrap: {
        marginHorizontal: '20@ms',
    },
    btnView: {
        marginTop: 8
    },

    logoutBtn: {
        marginTop: '10@ms',
        padding: '12@ms',
        borderRadius: '12@ms',
        borderWidth: 1,
        borderColor: 'red',
        alignItems: 'center',
    },

    logoutText: {
        color: 'red',
        fontWeight: '600',
    },
    //-------------------------------------
    container3: {

        position: 'relative',
        paddingRight: 15
    },
    dropdown: {
        position: 'absolute',
        top: 55,
        right: 20,
        width: 180,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 8,
        elevation: 5,
        zIndex: 110
    },
    item: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontSize: 14,
        color: '#333',
        paddingLeft: 4
    },
});

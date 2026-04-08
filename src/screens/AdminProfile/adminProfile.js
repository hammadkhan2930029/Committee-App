
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

const { width } = Dimensions.get('window');

export const AdminProfile = () => {
    const [userdata, setUserData] = useState(null);
    const [isLodaing, setIsLoading] = useState(false);
    const navigation = useNavigation();

    const getData = async () => {
        const user = await AsyncStorage.getItem('user');
        if (user) setUserData(JSON.parse(user));
    };

    useFocusEffect(
        useCallback(() => {
            getData();
        }, []),
    );
    console.log("profile user", userdata)
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

    console.log('user data async :', userdata)
    if (!userdata) return <Loader visible />;

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

                    <Icon name="settings" size={24} color="#fff" />
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
                    {renderRow('Code', userdata?.reg_code)}
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

const renderRow = (label, value) => (
    <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
    </View>
);

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
});

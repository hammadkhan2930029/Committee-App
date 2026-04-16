import React, { useCallback, useState } from 'react';
import {
    View,
    StatusBar,
    ImageBackground,
    Image,
    Text,
    TouchableOpacity,
    FlatList,
} from 'react-native';
// ScaledSheet aur scales ka sahi istemal
import { moderateScale, ScaledSheet, s, vs } from 'react-native-size-matters';
import { AppColors } from '../../../constant/appColors';
import { AppImages } from '../../../constant/appImages';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { api } from '../../../services/api';
import { getStoredUser } from '../../../Utils/getUser';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Loader } from '../../Loader/loader';

export const Payments = () => {


    const navigation = useNavigation();
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [paymentList, setPaymentList] = useState([]);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    //-----------------------------------------------------------------------------

    useFocusEffect(
        useCallback(() => {
            const loadUser = async () => {
                const user = await getStoredUser();
                if (user) setUserData(user);
            };
            loadUser();
        }, []),
    );
    //-----------------------------------------------------------------------------

    const AdminpaymentList = async () => {
        if (!userData?.user_id) return;
        try {
            const response = await api.get(`/admin/view-committee-payments/list/${userData.user_id}`);
            if (response?.data?.msg) {
                setPaymentList(response?.data?.msg || []);
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            AdminpaymentList();
        }, [userData]),
    );
    console.log('Payment list :', paymentList)
    //-----------------------------------------------------------------------------
    const formatNumber = value => value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || '0';
    const capitalize = text => text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
    //-----------------------------------------------------------------------------

    const validPayments = paymentList.filter(item => Number(item?.paid_amount) >= 0);
    const filterData = selectedStatus === 'All'
        ? validPayments
        : validPayments.filter(item => item?.status?.toLowerCase() === selectedStatus.toLowerCase());
    //-----------------------------------------------------------------------------

    const pendingList = paymentList.filter(item => item?.status?.toLowerCase() === 'pending' && item.paid_amount);
    const pendingAmount = pendingList.reduce((sum, item) => sum + Number(item?.paid_amount || 0), 0);
    //-----------------------------------------------------------------------------

    console.log("pending list : ", pendingList)
    const summaryData = [
        { id: 1, title: 'Pending Amount', value: pendingAmount, subtitle: 'Awaiting', type: 'pending' },
        { id: 2, title: 'Pending Count', value: pendingList.length, subtitle: 'Total Items', type: 'count' },
    ];
    //-----------------------------------------------------------------------------

    const renderHeader = () => (
        <View style={{ backgroundColor: AppColors.background }}>
            <ImageBackground source={AppImages.Rectangle2} style={styles.RectangleImg}>
                <View style={styles.headerContent}>
                    <View style={styles.TopView}>
                        <View style={styles.backAndText}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Icon name="arrow-back" size={28} color={AppColors.title} />
                            </TouchableOpacity>
                            <Text style={styles.h1}>Payments</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('AdminProfile')}>
                            <Image source={
                                userData?.image
                                    ? { uri: userData.image }
                                    : AppImages.profileAvatar
                            }
                                style={styles.avatar}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textView}>
                        <Text style={styles.h4}>Monitor all committee payments</Text>
                        <Text style={styles.h4}>and pending amounts.</Text>
                    </View>
                </View>
            </ImageBackground>

            <View style={styles.horizontalCards}>
                {summaryData.map((item) => (
                    <View style={styles.summaryCard} key={item.id}>
                        <View style={styles.cardHeader}>
                            <Icon name={item.type === 'pending' ? 'pending' : 'countertops'} size={moderateScale(22)} color={AppColors.link} />
                            <Text style={styles.cardTitle}>{item.title}</Text>
                        </View>
                        <Text style={styles.cardValue}>{formatNumber(item.value)}</Text>
                        <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.statuslistView}>
                <FlatList
                    data={['All', 'Due', 'Verified', 'Pending', 'Requested']}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[styles.statusTab, selectedStatus === item && styles.activeStatusTab]}
                            onPress={() => setSelectedStatus(item)}
                        >
                            <Text style={[styles.statusTabText, selectedStatus === item && styles.activeStatusTabText]}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={i => i}
                />
            </View>
        </View>
    );
    //-----------------------------------------------------------------------------

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />
            <View style={styles.viewMain}>
                <FlatList
                    data={filterData}
                    keyExtractor={item => item?.payment_id?.toString()}
                    ListHeaderComponent={renderHeader}
                    contentContainerStyle={{ paddingBottom: vs(20) }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.paymentCard}
                            onPress={() => navigation.navigate('PaymentDetails', { item })}
                        >
                            <View style={styles.cardLeft}>
                                <Text style={styles.userName}>{capitalize(item.payment_by)}</Text>
                                <Text style={styles.committeeName}>{capitalize(item.committe_name)}</Text>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Paid: </Text>
                                    <Text style={styles.amountValue}>{formatNumber(item.paid_amount)}</Text>
                                </View>
                            </View>

                            <View style={styles.cardRight}>
                                <View style={[
                                    styles.badge,
                                    item?.status?.toLowerCase() === 'verified' ? { backgroundColor: 'green' } :
                                        item?.status?.toLowerCase() === 'pending' ? { backgroundColor: '#FFA800' } :
                                            { backgroundColor: '#EC5800' }
                                ]}>
                                    <Text style={styles.badgeText}>{capitalize(item.status)}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Date: </Text>
                                    <Text style={styles.dateValue}>{item.pay_date}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <Loader visible={loading} />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: { flex: 1, backgroundColor: AppColors.background },
    viewMain: {
        marginBottom: 50,
    },
    RectangleImg: { width: '100%', height: '200@vs' },

    headerContent: { paddingHorizontal: '20@s', paddingTop: '20@vs' },

    TopView: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

    backAndText: { flexDirection: 'row', alignItems: 'center' },


    h1: {
        fontSize: RFValue(22),
        color: AppColors.title,
        fontWeight: '600',
        paddingLeft: 6,
    },
    avatar: {
        width: wp('14%'),
        height: wp('14%'),
        elevation: 5,
        borderRadius: 50
    },

    textView: { marginTop: '15@vs' },

    h4: { color: AppColors.title, fontSize: '16@ms0.7', opacity: 0.9, lineHeight: '22@ms' },

    horizontalCards: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: '-40@vs'
    },

    summaryCard: {
        width: '45%',
        backgroundColor: AppColors.background,
        padding: '15@ms',
        borderRadius: '15@ms',
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
    },

    cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: '5@vs' },

    cardTitle: { fontSize: '13@ms0.7', fontWeight: '600', marginLeft: '6@s', color: '#333' },

    cardValue: { fontSize: '18@ms0.7', color: AppColors.link, fontWeight: 'bold', marginVertical: '5@vs' },

    cardSubtitle: { fontSize: '13@ms0.7', color: '#666' },

    statuslistView: { paddingVertical: '20@vs', paddingHorizontal: '10@s' },

    activeStatusTab: {
        backgroundColor: AppColors.primary,
    },

    activeStatusTabText: {
        color: '#fff',
    },

    statusTab: {
        paddingHorizontal: '18@s',
        height: '42@vs',
        justifyContent: 'center',
        borderRadius: '21@s',
        backgroundColor: AppColors.background,
        marginHorizontal: '6@s',
        borderWidth: 1,
        borderColor: AppColors.primary,
        elevation: 3,
    },

    statusTabText: { fontSize: '15@ms0.7', fontWeight: '600', color: '#000000' },

    paymentCard: {
        width: '94%',
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: AppColors.background,
        marginVertical: '8@vs',
        padding: '15@ms',
        borderRadius: '16@ms',
        elevation: 5,
        borderWidth: 0.8,
        borderColor: '#eee'
    },

    cardLeft: { flex: 1.6 },
    cardRight: { justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' },


    userName: { fontSize: '17@ms0.7', fontWeight: 'bold', color: '#222' },

    committeeName: { fontSize: '15@ms0.7', color: '#555', marginVertical: '4@vs' },

    label: { fontSize: '14@ms0.7', color: '#777', fontWeight: 'bold' },

    amountValue: { fontSize: '14@ms0.8', color: AppColors.link, fontWeight: 'bold' },

    badge: {
        paddingHorizontal: '12@s',
        paddingVertical: '6@vs',
        borderRadius: '14@ms',
        minWidth: '90@s',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    badgeText: { color: '#fff', fontSize: '14@ms0.7', fontWeight: 'bold' },

    dateValue: { fontSize: '14@ms0.7', color: AppColors.link, fontWeight: '600' },
});
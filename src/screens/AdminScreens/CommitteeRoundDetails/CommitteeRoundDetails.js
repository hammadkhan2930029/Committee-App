import React, { useCallback, useMemo, useState } from 'react';
import {
    FlatList,
    ImageBackground,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppColors } from '../../../constant/appColors';
import { AppImages } from '../../../constant/appImages';
import { api } from '../../../services/api';
import { Loader } from '../../Loader/loader';

const capitalize = text =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : '';

const formatNumber = value => {
    if (value === null || value === undefined || value === '') return '0';

    const number = Number(value);
    if (Number.isNaN(number)) return value;

    return number.toLocaleString('en-US');
};

export const CommitteeRoundDetails = ({ route }) => {


    const navigation = useNavigation();
    const { item, committeeId, committeeRoundId } = route.params || {};
    const currentCommitteeId = committeeId || item?.committee_id;
    const currentRoundId = committeeRoundId || item?.committee_round_id;
    console.log('items ::', item)

    const [loading, setLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [paymentList, setPaymentList] = useState([]);

    const getCommitteeRoundPayments = async () => {
        if (!currentCommitteeId || !currentRoundId) {
            setPaymentList([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const response = await api.get(
                `/admin/view-committee-round-payments/list/${currentCommitteeId}/${currentRoundId}`,
            );
            setPaymentList(response?.data?.msg || []);
            console.log('committe round details :', response)
        } catch (error) {
            console.log('committee round payments error:', error);
            setPaymentList([]);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            getCommitteeRoundPayments();
        }, [currentCommitteeId, currentRoundId]),
    );

    const statuses = useMemo(() => {
        const uniqueStatuses = paymentList
            .map(payment => capitalize(payment?.status))
            .filter(Boolean);

        return ['All', ...new Set(uniqueStatuses)];
    }, [paymentList]);

    const filteredPayments = useMemo(() => {
        if (selectedStatus === 'All') return paymentList;

        return paymentList.filter(
            payment =>
                payment?.status?.toLowerCase() === selectedStatus.toLowerCase(),
        );
    }, [paymentList, selectedStatus]);

    const verifiedPayments = paymentList.filter(
        payment => payment?.status?.toLowerCase() === 'verified',
    );
    const pendingPayments = paymentList.filter(
        payment => payment?.status?.toLowerCase() === 'pending',
    );
    const totalPaidAmount = paymentList.reduce(
        (sum, payment) => sum + Number(payment?.paid_amount || 0),
        0,
    );

    const summaryData = [
        {
            id: 'total',
            title: 'Total Payments',
            value: paymentList.length,
            icon: 'payments',
        },
        {
            id: 'verified',
            title: 'Verified',
            value: verifiedPayments.length,
            icon: 'check-circle',
        },
        {
            id: 'pending',
            title: 'Pending',
            value: pendingPayments.length,
            icon: 'schedule',
        },
        {
            id: 'amount',
            title: 'Collected',
            value: `${item?.committee_currency || ''} ${formatNumber(totalPaidAmount)}`.trim(),
            icon: 'account-balance-wallet',
        },
    ];

    const renderHeader = () => (
        <View>
            <ImageBackground source={AppImages.Rectangle2} style={styles.RectangleImg}>
                <View style={styles.headerContent}>
                    <View style={styles.backRow}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="arrow-back" size={28} color={AppColors.title} />
                        </TouchableOpacity>
                        <Text style={styles.h1}>Committee Round Details</Text>
                    </View>

                    <View style={styles.textView}>
                        <Text style={styles.h4}>
                            {item?.committe_member_name || 'Round payment details'}
                        </Text>
                        <Text style={styles.h5}>
                            Round #{item?.round_no || '-'} - {item?.round_month || 'N/A'}
                        </Text>
                    </View>
                </View>
            </ImageBackground>

            <View style={styles.summaryGrid}>
                {summaryData.map(card => (
                    <View key={card.id} style={styles.summaryCard}>
                        <Icon name={card.icon} size={22} color={AppColors.link} />
                        <Text style={styles.cardTitle}>{card.title}</Text>
                        <Text style={styles.cardValue}>{card.value}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.statuslistView}>
                <FlatList
                    data={statuses}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={status => status}
                    renderItem={({ item: status }) => (
                        <TouchableOpacity
                            style={[
                                styles.statusTab,
                                selectedStatus === status && styles.activeStatusTab,
                            ]}
                            onPress={() => setSelectedStatus(status)}
                        >
                            <Text
                                style={[
                                    styles.statusTabText,
                                    selectedStatus === status && styles.activeStatusTabText,
                                ]}
                            >
                                {status}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );

    const renderPaymentCard = ({ item: payment }) => {
        const status = payment?.status?.toLowerCase();
        const badgeStyle =
            status === 'verified'
                ? styles.verifiedBadge
                : status === 'pending'
                    ? styles.pendingBadge
                    : styles.defaultBadge;

        return (
            <TouchableOpacity
                style={styles.paymentCard}
                onPress={() => navigation.navigate('PaymentDetails', { item: payment })}
            >
                <View style={styles.cardLeft}>
                    <Text style={styles.userName}>
                        {capitalize(payment?.payment_by || payment?.member_name || 'Unknown')}
                    </Text>
                    <Text style={styles.committeeName}>
                        {payment?.committe_name || item?.name || 'Committee Payment'}
                    </Text>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Paid Amount: </Text>
                        <Text style={styles.amountValue}>
                            {item?.committee_currency || ''} {formatNumber(payment?.paid_amount)}
                        </Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Round Month: </Text>
                        <Text style={styles.dateValue}>
                            {payment?.round_month || item?.round_month || 'N/A'}
                        </Text>
                    </View>
                </View>

                <View style={styles.cardRight}>
                    <View style={[styles.badge, badgeStyle]}>
                        <Text style={styles.badgeText}>
                            {capitalize(payment?.status || 'pending')}
                        </Text>
                    </View>

                    <Text style={styles.dateValue}>{payment?.pay_date || 'No date'}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />

            <FlatList
                data={filteredPayments}
                keyExtractor={(payment, index) =>
                    payment?.payment_id?.toString() || `${payment?.committee_member_id}-${index}`
                }
                ListHeaderComponent={renderHeader}
                renderItem={renderPaymentCard}
                contentContainerStyle={styles.contentContainer}
                ListEmptyComponent={
                    !loading ? (
                        <View style={styles.emptyState}>
                            <Icon name="receipt-long" size={36} color="#B0B0B0" />
                            <Text style={styles.emptyTitle}>No payments found</Text>
                            <Text style={styles.emptyText}>
                                Is round ke liye abhi koi payment record available nahi hai.
                            </Text>
                        </View>
                    ) : null
                }
            />

            <Loader visible={loading} />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.background,
    },
    contentContainer: {
        paddingBottom: '24@vs',
    },
    RectangleImg: {
        width: '100%',
        height: '200@vs',
    },
    headerContent: {
        paddingHorizontal: '20@s',
        paddingTop: '26@vs',
    },
    backRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: '10@vs',
    },
    h1: {
        fontSize: moderateScale(24),
        color: AppColors.title,
        fontWeight: '600',
        marginLeft: '10@s',
    },
    textView: {
        marginTop: '18@vs',
    },
    h4: {
        color: AppColors.title,
        fontSize: '18@ms',
        fontWeight: '600',
    },
    h5: {
        color: AppColors.title,
        fontSize: '14@ms',
        opacity: 0.9,
        marginTop: '4@vs',
    },
    summaryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: '12@s',
        marginTop: '-32@vs',
    },
    summaryCard: {
        width: '48%',
        backgroundColor: AppColors.background,
        padding: '14@ms',
        borderRadius: '16@ms',
        marginBottom: '10@vs',
        elevation: 4,
    },
    cardTitle: {
        fontSize: '13@ms',
        color: '#555',
        marginTop: '8@vs',
    },
    cardValue: {
        fontSize: '18@ms',
        fontWeight: '700',
        color: AppColors.link,
        marginTop: '4@vs',
    },
    statuslistView: {
        paddingVertical: '10@vs',
        paddingHorizontal: '10@s',
    },
    statusTab: {
        paddingHorizontal: '18@s',
        height: '40@vs',
        justifyContent: 'center',
        borderRadius: '21@ms',
        backgroundColor: AppColors.background,
        marginHorizontal: '5@s',
        borderWidth: 1,
        borderColor: AppColors.primary,
        elevation: 2,
    },
    activeStatusTab: {
        backgroundColor: AppColors.primary,
    },
    statusTabText: {
        fontSize: '14@ms',
        fontWeight: '600',
        color: '#111',
    },
    activeStatusTabText: {
        color: '#fff',
    },
    paymentCard: {
        width: '94%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: AppColors.background,
        marginVertical: '7@vs',
        padding: '15@ms',
        borderRadius: '16@ms',
        elevation: 4,
        borderWidth: 0.8,
        borderColor: '#ECECEC',
    },
    cardLeft: {
        flex: 1.6,
        paddingRight: '10@s',
    },
    cardRight: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    userName: {
        fontSize: '17@ms',
        fontWeight: '700',
        color: '#222',
    },
    committeeName: {
        fontSize: '14@ms',
        color: '#666',
        marginVertical: '4@vs',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '4@vs',
        flexWrap: 'wrap',
    },
    label: {
        fontSize: '13@ms',
        color: '#777',
        fontWeight: '600',
    },
    amountValue: {
        fontSize: '13@ms',
        color: AppColors.link,
        fontWeight: '700',
    },
    dateValue: {
        fontSize: '13@ms',
        color: '#444',
        fontWeight: '500',
    },
    badge: {
        paddingHorizontal: '12@s',
        paddingVertical: '6@vs',
        borderRadius: '14@ms',
        minWidth: '86@s',
        alignItems: 'center',
        marginBottom: '10@vs',
    },
    verifiedBadge: {
        backgroundColor: 'green',
    },
    pendingBadge: {
        backgroundColor: '#FFA800',
    },
    defaultBadge: {
        backgroundColor: AppColors.primary,
    },
    badgeText: {
        color: '#fff',
        fontSize: '13@ms',
        fontWeight: '700',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '30@s',
        paddingVertical: '40@vs',
    },
    emptyTitle: {
        fontSize: '18@ms',
        fontWeight: '600',
        color: '#333',
        marginTop: '10@vs',
    },
    emptyText: {
        fontSize: '14@ms',
        color: '#777',
        textAlign: 'center',
        marginTop: '6@vs',
        lineHeight: '20@ms',
    },
});

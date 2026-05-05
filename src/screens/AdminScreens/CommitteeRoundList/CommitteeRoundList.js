import { AnimatedCircularProgress } from 'react-native-circular-progress';
import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView,
    Dimensions,
    StyleSheet
} from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { AppColors } from '../../../constant/appColors';
import { AppImages } from '../../../constant/appImages';
import { api } from '../../../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { getStoredUser } from '../../../Utils/getUser';
dayjs.extend(customParseFormat);

const { width } = Dimensions.get('window');

const Card = ({ children, style }) => (
    <View style={[styles.card, style]}>{children}</View>
);
//--------------------------------------------------------------------
const ProgressCircle = ({ value, total, color }) => {
    const percentage = (value / total) * 100;

    return (
        <View style={{ alignItems: 'center' }}>
            <AnimatedCircularProgress
                size={120}
                width={10}
                fill={percentage}
                tintColor={color}
                backgroundColor="#E5E5E5"
                lineCap="round"
            >
                {() => (
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.bigText}>{value}</Text>
                        <Text>{value} / {total}</Text>
                    </View>
                )}
            </AnimatedCircularProgress>
        </View>
    );
};
//------------------------------------------------------------------------
const CommitteeDetailsSkeleton = () => {
    return (
        <SkeletonPlaceholder
            borderRadius={10}
            backgroundColor="#E1E9EE"
            highlightColor="#F2F8FC">

            {/* Header */}
            <View style={styles.skHeader}>
                <View style={styles.skTitle} />
                <View style={styles.skSubTitle} />
            </View>

            {/* Progress Section */}
            <View style={styles.skProgressRow}>
                <View style={styles.skProgressHalf}>
                    <View style={styles.skCircle} />
                    <View style={styles.skText} />
                    <View style={styles.skSmallText} />
                </View>

                <View style={styles.skDivider} />

                <View style={styles.skProgressHalf}>
                    <View style={styles.skCircle} />
                    <View style={styles.skText} />
                    <View style={styles.skSmallText} />
                </View>
            </View>

            {/* Grid Cards */}
            <View style={styles.skGrid}>
                {[1, 2, 3, 4].map((_, i) => (
                    <View key={i} style={styles.skGridItem}>
                        <View style={styles.skCard} />
                    </View>
                ))}
            </View>

            {/* Current Month */}
            <View style={styles.skSection}>
                <View style={styles.skBigCard} />
            </View>

            {/* Timeline */}
            <View style={styles.skSection}>
                <View style={styles.skBigCard} />
            </View>

            {/* Buttons */}
            <View style={styles.skButtons}>
                {[1, 2, 3, 4].map((_, i) => (
                    <View key={i} style={styles.skBtn} />
                ))}
            </View>

        </SkeletonPlaceholder>
    );
};
// -----------------------------------------------------------------------
export const CommitteeRoundList = ({ route }) => {
    //-----------------------------------------------------------------------
    const [RoundList, setRoundList] = useState([])
    const { details } = route.params;
    const navigation = useNavigation();
    console.log('details :', details);

    //-----------------------------------------------------------------------

    const [userdata, setUserData] = useState([]);

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



    //-----------------------------------------------------------------------

    const formatNumber = (value) => {
        if (value === null || value === undefined) return '';

        const number = typeof value === 'number' ? value : Number(value);

        if (isNaN(number)) return value;

        return number.toLocaleString('en-US');
    };
    //-------------------------------------------------------------------------------

    const viewCommitteeRound = async () => {
        try {
            const response = await api.get(
                `/user/view-committee-rounds/${details.committee_id}`,
            );
            const result = await response.data?.msg;
            setRoundList(result);
            console.log('result :::', result)
        } catch (error) {
            console.log(error);
        }
    };
    useFocusEffect(
        useCallback(() => {
            viewCommitteeRound();
        }, [details.committee_id]),
    );


    //------------------------------------------------------------
    // Table Header Component
    const TableHeader = () => (
        <View style={styles.tableHeader}>
            <Text style={[styles.columnHeader, { flex: 0.8 }]}>Round</Text>
            <Text style={[styles.columnHeader, { flex: 2 }]}>Member Name</Text>
            <Text style={[styles.columnHeader, { flex: 1.5 }]}>Month</Text>
            <Text style={[styles.columnHeader, { flex: 1.2, textAlign: 'right' }]}>Status</Text>
        </View>
    );

    // Table Row Component
    const TableRow = ({ item, navigation }) => (
        <TouchableOpacity
            style={styles.tableRow}
            activeOpacity={0.7}
            onPress={() =>
                navigation.navigate('CommitteeRoundDetails', {
                    item,
                    committeeId: details.committee_id,
                    committeeRoundId: item.committee_round_id,
                })
            }
        >
            <Text style={[styles.cellText, { flex: 0.8, fontWeight: 'bold' }]}>#{item.round_no}</Text>

            <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.cellText} numberOfLines={1}>
                    {item.committe_member_name || 'Not Assigned'}
                </Text>
                {/* Clickable indicator icon */}
                <Icon name="chevron-right" size={16} color="#CBD5E0" />
            </View>

            <Text style={[styles.cellText, { flex: 1.5 }]}>{item.round_month}</Text>

            <View style={[{ flex: 1.2, alignItems: 'flex-end' }]}>
                <View style={[
                    styles.statusBadge,
                    { backgroundColor: item.status === 'Paid' ? '#E8F5E9' : '#FFEBEE' }
                ]}>
                    <Text style={[
                        styles.statusText,
                        { color: item.status === 'Paid' ? '#2E7D32' : '#C62828' }
                    ]}>
                        {item.status}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    //--------------------------------------------------------------------------------

    // if (loading) {
    //     return <CommitteeDetailsSkeleton />;
    // }

    return (
        <ScrollView style={styles.container}>
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
                            <Text style={styles.h1}>Committee Round List</Text>
                        </View>
                    </View>

                </View>
            </ImageBackground>

            <View style={styles.tableWrapper}>
                <TableHeader />
                {RoundList && RoundList.length > 0 ? (
                    RoundList.map((item, index) => (
                        <TableRow key={index} item={item} navigation={navigation} />
                    ))
                ) : (
                    <View style={styles.emptyView}>
                        <Text>No rounds found for this committee.</Text>
                    </View>
                )}
            </View>


        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#fff',
    },
    sub_container: {


    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        marginBottom: 12,
        elevation: 3,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    half: {
        flex: 1,
        alignItems: 'center',
    },
    divider: {
        width: 1,
        height: '80%',
        backgroundColor: '#ddd',
    },
    title: {
        marginTop: 10,
        fontSize: 14,
    },
    bold: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    bigText: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    gridView: {
        width: '100%',

    },
    grid2: {
        flexDirection: 'row',

    },
    smallCard: {
        width: width * 0.43,
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    progressBar: {
        height: 8,
        backgroundColor: '#ddd',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 5,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#02af4a',
    },
    //---------------------------
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
        fontSize: moderateScale(20),
        padding: 5,
        fontWeight: '500'
    },
    activeBtn: {
        backgroundColor: AppColors.background,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 20,
    },
    active: {
        fontSize: moderateScale(16),
        color: AppColors.link,
        textAlign: 'center',
        padding: 3,
    },
    //------------------------------
    tableWrapper: {
        marginTop: -30, // Background image ke upar thora overlap karne ke liye
        backgroundColor: '#fff',
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingTop: 25,
        elevation: 5,
        flex: 1,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#F5F7FA',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    columnHeader: {
        fontSize: moderateScale(13),
        fontWeight: '700',
        color: '#4A5568',
        textTransform: 'uppercase',
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EDF2F7',
    },
    cellText: {
        fontSize: moderateScale(13),
        color: '#2D3748',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    statusText: {
        fontSize: moderateScale(11),
        fontWeight: '600',
    },
    emptyView: {
        padding: 40,
        alignItems: 'center',
    }

});


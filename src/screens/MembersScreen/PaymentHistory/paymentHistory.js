import {
    StatusBar,
    View,
    ImageBackground,
    Image,
    Text,
    TouchableOpacity,
    Alert,
    Modal,
    TextInput,
    StyleSheet,
    ScrollView,
    FlatList,
    BackHandler,
} from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { AppColors } from '../../../constant/appColors';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppIcons } from '../../../constant/appIcons';
import { AppImages } from '../../../constant/appImages';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { api } from '../../../services/api';
import { useCallback, useEffect, useState } from 'react';
import { getStoredUser } from '../../../Utils/getUser';
import { Loader } from '../../Loader/loader';
import { CustomButton } from '../../../components/customButton';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const PaymentHistory = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState();
    const [history, setHistory] = useState([]);
    const [loading, setLoding] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState('All');

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
    const userID = userData?.user_id;
    //-----------------------------------------------------------------------------

    useFocusEffect(
        useCallback(() => {
            const backAction = () => {
                navigation.navigate('MembersDashboard')
                return true;
            }
            const backHandler = BackHandler.addEventListener('MembersDashboard', backAction)

            return () => backHandler.remove()

        }, [navigation])
    )

    //-----------------------------------------------------------------------------

    const capitalize = text => text ? text.charAt(0).toUpperCase() + text.slice(1) : '';

    //-----------------------------------------------------------------------------

    const formatNumber = value => {
        if (value === null || value === undefined) return '';

        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    //-----------------------------------------------------------------------------

    const UserPaymentHistory = async () => {
        try {
            const response = await api.get(
                `/user/view-committee-payments/list/${userID}`,
            );
            const result = response?.data?.msg;

            if (result) {
                setHistory(result);
                setLoding(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoding(false);
        }
    };
    useEffect(() => {
        if (userID) {
            UserPaymentHistory();
        }
    }, [userID]);

    console.log('payment history :', history);

    //----------------------Skeleton----------------------------------------------------

    const MySkeleton = () => {
        return (
            <View>
                {[...Array(6)].map((_, index) => (
                    <View
                        style={{
                            backgroundColor: AppColors.background,
                            padding: 10,
                            borderRadius: 20,
                            margin: 10,
                            borderColor: AppColors.placeholder,
                            borderWidth: 1,
                            width: '95%',
                            elevation: 5,
                        }}
                    >
                        <SkeletonPlaceholder>
                            <SkeletonPlaceholder.Item
                                justifyContent="center"
                                alignItems="center"
                                backgroundColor={AppColors.background}
                                elevation={5}
                            >
                                {/* Text */}
                                <SkeletonPlaceholder.Item
                                    width={'100%'}
                                    padding={10}
                                    flexDirection="row"
                                    justifyContent="space-between"
                                >
                                    <SkeletonPlaceholder.Item
                                        width={120}
                                        height={20}
                                        borderRadius={4}
                                    />
                                    <SkeletonPlaceholder.Item
                                        marginTop={6}
                                        width={80}
                                        height={20}
                                        borderRadius={10}
                                    />
                                </SkeletonPlaceholder.Item>
                                <SkeletonPlaceholder.Item
                                    width={'100%'}
                                    paddingLeft={10}
                                    paddingRight={10}
                                    flexDirection="row"
                                    justifyContent="space-between"
                                >
                                    <SkeletonPlaceholder.Item
                                        width={80}
                                        height={20}
                                        borderRadius={4}
                                    />
                                    <SkeletonPlaceholder.Item
                                        marginTop={6}
                                        width={60}
                                        height={20}
                                        borderRadius={4}
                                    />
                                </SkeletonPlaceholder.Item>
                                <SkeletonPlaceholder.Item
                                    width={'100%'}
                                    paddingLeft={10}
                                    paddingRight={10}
                                    paddingTop={8}
                                >
                                    <SkeletonPlaceholder.Item
                                        width={'100%'}
                                        height={3}
                                        borderRadius={4}
                                    />
                                </SkeletonPlaceholder.Item>
                                <SkeletonPlaceholder.Item
                                    width={'100%'}
                                    paddingLeft={10}
                                    paddingRight={10}
                                    paddingTop={8}
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <SkeletonPlaceholder.Item
                                        width={60}
                                        height={20}
                                        borderRadius={4}
                                    />
                                    <SkeletonPlaceholder.Item
                                        marginTop={6}
                                        width={120}
                                        height={20}
                                        borderRadius={4}
                                    />
                                </SkeletonPlaceholder.Item>
                                <SkeletonPlaceholder.Item
                                    width={'100%'}
                                    paddingLeft={10}
                                    paddingRight={10}
                                    paddingTop={8}
                                >
                                    <SkeletonPlaceholder.Item
                                        width={'100%'}
                                        height={35}
                                        borderRadius={10}
                                    />
                                </SkeletonPlaceholder.Item>
                            </SkeletonPlaceholder.Item>
                        </SkeletonPlaceholder>
                    </View>
                ))}
            </View>
        );
    };
    //------------------------------------------------------------------------------
    const validPayments = history.filter(item => Number(item?.paid_amount) >= 0);
    const filterData = selectedStatus === 'All'
        ? validPayments
        : validPayments.filter(item => item?.status?.toLowerCase() === selectedStatus.toLowerCase());
    //-----------------------------------------------------------------------------
    const renderHeader = () => (
        <View style={styles.statusBG}>

            <View style={styles.statuslistView}>
                <FlatList
                    data={['All', 'Requested', 'Due', 'Verified', 'Overdue',]}
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

    return (
        <View style={styles.conatiner}>
            <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />
            <ScrollView style={styles.scroll}>
                <View>
                    <ImageBackground
                        source={AppImages.Rectangle}
                        style={styles.RectangleImg}
                    >
                        <View style={styles.main}>
                            <View style={styles.TopView}>
                                <View style={styles.backAndText}>
                                    <TouchableOpacity onPress={() => navigation.navigate('MembersDashboard')}>
                                        <Icon
                                            name="arrow-back"
                                            size={28}
                                            color={AppColors.title}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.h1}>Payment History</Text>
                                </View>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.h4}>View all your past payments.</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                {loading ? (
                    <MySkeleton />
                ) : (
                    <View style={styles.pymentsCardView}>

                        <FlatList
                            data={filterData}
                            keyExtractor={(item, index) => index.toString()}
                            ListHeaderComponent={renderHeader}
                               ListEmptyComponent={
                                                    <View style={styles.emptyCard}>
                                                        <Icon
                                                            name="info-outline"
                                                            size={50}
                                                            color={AppColors.primary}
                                                        />
                            
                                                        <Text style={styles.emptyTitle}>
                                                            No Data Found
                                                        </Text>
                            
                                                        <Text style={styles.emptyText}>
                                                            No payments available in {selectedStatus}.
                                                        </Text>
                                                    </View>
                                                }
                            renderItem={item => {
                                const items = item?.item;
                                return (
                                    <View>
                                        <Text
                                            style={[
                                                styles.msg,
                                                { display: items.committe_name ? 'none' : 'flex' },
                                            ]}
                                        >
                                            Data not available
                                        </Text>

                                        <View
                                            style={[
                                                styles.card_view,
                                                { display: items.committe_name ? 'flex' : 'none' },
                                            ]}
                                        >
                                            <View style={styles.card}>
                                                <View style={styles.header}>
                                                    <View style={styles.cardHeader}>
                                                        <Text style={styles.name}>
                                                            {items.committe_name}
                                                        </Text>
                                                        <View style={[styles.status_view, { backgroundColor: items.status === 'verified' ? 'green' : AppColors.primary }]}>
                                                            <Text style={styles.status_text}>
                                                                {capitalize(items.status)}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.monthView}>
                                                        <Text style={styles.month}>
                                                            Round # {items.round_no}
                                                        </Text>
                                                        <Text style={styles.month}>
                                                            {items.round_month}
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={styles.cardMiddle}>
                                                    <Text style={styles.amountPermember}>
                                                        {formatNumber(items.amount_per_member)}
                                                    </Text>
                                                    <Text style={styles.amountPermemberText}>
                                                        Amount per Member
                                                    </Text>
                                                </View>

                                                <View style={styles.btnView}>
                                                    <CustomButton
                                                        title="Payment Details"
                                                        disabled={item.status == 'verified'}
                                                        onPress={() => navigation.navigate('UserPaymentDetails', { item: items })}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                );
                            }}
                        />
                    </View>
                )}
            </ScrollView>
        </View>
    );
};
const styles = ScaledSheet.create({
    conatiner: {
        flex: 1,
        backgroundColor: AppColors.background,
    },
    arrowBack: {
        backgroundColor: AppColors.background,
        width: 30,
        height: 30,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    RectangleImg: {
        width: '100%',
        height: '250@vs',
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
    //------------------------------
    pymentsCardView: {
        marginTop: -50,
    },
    card_view: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 10,
    },
    card: {
        width: '90%',
        backgroundColor: AppColors.background,
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 10,
        borderRadius: 20,
        borderColor: AppColors.primary,
        borderWidth: 1,
        marginTop: 8,
        elevation: 3,
    },

    //---------------------------------

    header: {
        borderBottomColor: AppColors.primary,
        borderBottomWidth: 1,
    },
    cardHeader: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
    },
    name: {
        color: AppColors.blackText,
        fontSize: moderateScale(18),
        fontWeight: '700',
    },
    status_view: {
        width: 80,
        backgroundColor: AppColors.primary,
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        elevation: 5,
    },
    status_text: {
        color: AppColors.title,
        fontSize: moderateScale(16),
    },
    monthView: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 5,
    },
    month: {
        fontSize: moderateScale(16),
        padding: 10,
    },
    amountPermember: {
        textAlign: 'center',
        fontSize: moderateScale(16),
        color: AppColors.link,
        padding: 3,
        fontWeight: '700',
    },
    amountPermemberText: {
        textAlign: 'center',
        fontSize: moderateScale(16),
        color: AppColors.bodyText,
        padding: 3,
    },
    btnView: {
        marginTop: 5,
    },
    msg: {
        textAlign: 'center',
        fontSize: moderateScale(16),
        padding: 15,
        color: AppColors.placeholder,
        marginTop: 50
    },
    scroll: {
        marginBottom: 65,
    },
    //------------------------------------------------------
    statusBG: {
        backgroundColor: AppColors.background,
         paddingVertical: '15@vs',
         marginTop:50

    },
    statuslistView: {
        //  paddingVertical: '15@vs',
        //   paddingHorizontal: '10@s' 
    },

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
     //---------------------------------------
    emptyCard: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '80@vs',
        padding: '20@ms',
    },

    emptyTitle: {
        fontSize: '18@ms',
        fontWeight: 'bold',
        color: '#222',
        marginTop: '10@vs',
    },

    emptyText: {
        fontSize: '14@ms',
        color: '#777',
        marginTop: '5@vs',
        textAlign: 'center',
    },
});

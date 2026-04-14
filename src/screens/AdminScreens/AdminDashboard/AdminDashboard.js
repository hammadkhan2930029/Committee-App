import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    StatusBar,
    ImageBackground,
    Image,
    Text,
    Share,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { AppColors } from '../../../constant/appColors';
import { AppImages } from '../../../constant/appImages';
import { CustomButton } from '../../../components/customButton';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { navigate } from '../../../navigations/navigationService';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getStoredUser } from '../../../Utils/getUser';
import { api } from '../../../services/api';
import { Loader } from '../../Loader/loader';
import { RFValue } from 'react-native-responsive-fontsize';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSequence,
} from 'react-native-reanimated';
export const AdminDashboard = () => {
    //--------------------------------------------
    // const [visible, setVisible] = useState(false);


    //-------------------------------------------------
    const navigation = useNavigation();
    const [Loading, setLoading] = useState(true);

    const [counter, setCounter] = useState([]);

    //----------------------------------------------
    const [userData, setUserData] = useState();
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
    // console.log('userData', userData);
    //---------------Total User total active bCs------------------------------
    const counterApi = async () => {
        try {
            const response = await api.get(
                `/user/dashboard-counters/${userData.user_id}`,
            );
            const result = response.data.msg[0];

            setCounter(result);
            if (result) {
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (userData?.user_id) {
            counterApi();
        }
    }, [userData]);
    // console.log('counter :', counter);

    //----------------------------------------------------------------------------
    const wave = useSharedValue(0);

    const triggerHandWave = () => {
        wave.value = withSequence(
            withTiming(-20, { duration: 150 }),
            withTiming(20, { duration: 150 }),
            withTiming(-15, { duration: 150 }),
            withTiming(15, { duration: 150 }),
            withTiming(-10, { duration: 150 }),
            withTiming(10, { duration: 150 }),
            withTiming(0, { duration: 150 }),

            // 2nd wave
            withTiming(-20, { duration: 150 }),
            withTiming(20, { duration: 150 }),
            withTiming(-15, { duration: 150 }),
            withTiming(15, { duration: 150 }),
            withTiming(-10, { duration: 150 }),
            withTiming(10, { duration: 150 }),
            withTiming(0, { duration: 150 }),

            // 3rd wave
            withTiming(-20, { duration: 150 }),
            withTiming(20, { duration: 150 }),
            withTiming(-15, { duration: 150 }),
            withTiming(15, { duration: 150 }),
            withTiming(-10, { duration: 150 }),
            withTiming(10, { duration: 150 }),
            withTiming(0, { duration: 150 }),
        );
    };
    const waveStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${wave.value}deg` }],
        };
    });
    useEffect(() => {
        triggerHandWave();
    }, []);
    //--------------------------------------------------------------

    // const toggleMenu = () => {
    //     setVisible(!visible);
    // };

    // const handleOption = (type) => {
    //     setVisible(false);

    //     if (type === 'share') {
    //         onShare()
    //     } else if (type === 'suggestion') {
    //         navigation.navigate('SuggestionScreen')
    //     } else if (type === 'support') {
    //         navigation.navigate('SupportTeam')
    //     }
    // };
    //---------------------------Share App------------------------------------
    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'Digital Bachat Committee Save Together, Grow Together!\n\nDownload now:\nhttps://play.google.com/store/apps/details?id=com.comitte',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                } else {
                }
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };
    //-----------------------------------------------------------------
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />
            <ScrollView style={styles.dashboardScroll}>
                <View>
                    <ImageBackground
                        source={AppImages.Rectangle}
                        style={styles.RectangleImg}
                        resizeMode="cover"
                    >
                        <View style={styles.main}>
                            <View style={styles.TopView}>
                                <Text style={styles.h1}>Dashboard</Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('AdminProfile')}
                                >
                                    <Image
                                        source={
                                            userData?.image
                                                ? { uri: userData.image }
                                                : AppImages.profileAvatar
                                        }
                                        style={styles.avatar}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.textandLink}>
                                <View style={styles.textView}>
                                    {userData?.full_name && (
                                        <Text style={styles.h2}>
                                            Hello,{userData.full_name}{' '}
                                            <Animated.View style={[waveStyle, { marginLeft: 5 }]}>
                                                <Icon name="waving-hand" size={30} color="#FED22D" />
                                            </Animated.View>
                                        </Text>
                                    )}
                                    <Text style={styles.h4}>Here’s your admin overview.</Text>
                                </View>

                                <View style={styles.container3}>
                                    <TouchableOpacity onPress={() => onShare('share')} style={styles.shareApp}>
                                        <Icon name="share" size={24} color={AppColors.link} />
                                        <Text style={styles.shareAppText}>Share App</Text>
                                    </TouchableOpacity>

                                    {/* 3 DOT ICON */}
                                    {/* <TouchableOpacity onPress={toggleMenu}>
                                        <MaterialCommunityIcons name="dots-horizontal" size={35} color="#fff" />
                                    </TouchableOpacity> */}

                                    {/* DROPDOWN */}
                                    {/* {visible && (
                                        <View style={styles.dropdown}>
                                            <TouchableOpacity onPress={() => handleOption('share')} style={styles.item}>
                                                <Icon name="share" size={24} color={AppColors.link} />
                                                <Text style={styles.text}>Share App</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={() => handleOption('suggestion')} style={styles.item}>
                                                <MaterialCommunityIcons name="lightbulb-outline" size={24} color={AppColors.link} />

                                                <Text style={styles.text}>Suggestion</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={() => handleOption('support')} style={styles.item}>
                                                <MaterialCommunityIcons name="comment-text-outline" size={24} color={AppColors.link} />

                                                <Text style={styles.text}>Support</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )} */}
                                </View>


                            </View>

                        </View>
                    </ImageBackground>
                </View>
                {/* ---------------------------------------------- */}
                <View style={{ paddingBottom: 20 }}>
                    <View style={styles.Dashboardcard_View}>
                        {/* -------Active BCs------- */}
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => navigation.navigate('CommitteeList')}
                        >
                            <View style={styles.Dashboardcard}>
                                <View>
                                    <View style={styles.imgText}>
                                        <Icon name="group-add" size={34} color={AppColors.link} />
                                        <Text style={styles.activeBC}>Active BCs</Text>
                                    </View>
                                    {/* <Text style={styles.activeBC_details}>
                    2 starting this month
                  </Text> */}
                                </View>
                                <View style={styles.counter}>
                                    <Text style={styles.counter_text}>
                                        {counter.total_active_committees ?? 0}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {/* -------Total Users------- */}
                        {/* <TouchableOpacity activeOpacity={0.7}>
              <View style={styles.Dashboardcard}>
                <View>
                  <View style={styles.imgText}>
                    <Icon name="groups" size={34} color={AppColors.link} />
                    <Text style={styles.activeBC}>Total Users</Text>
                  </View>
                  <Text style={styles.activeBC_details}>
                    3 joined this week{' '}
                  </Text>
                </View>
                <View style={styles.counter}>
                  <Text style={styles.counter_text}>{counter.total_users}</Text>
                </View>
              </View>
            </TouchableOpacity> */}
                        {/* -------Pending Payments------- */}
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => navigation.navigate('Payments')}
                        >
                            <View style={styles.Dashboardcard}>
                                <View>
                                    <View style={styles.imgText}>
                                        <Ionicons
                                            name="briefcase"
                                            size={34}
                                            color={AppColors.link}
                                        />
                                        <Text style={styles.activeBC}>Pending Payments</Text>
                                    </View>
                                </View>
                                <View style={styles.counter}>
                                    <Text style={styles.counter_text}>
                                        {counter.pending_payments}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.BtnView}>
                        <CustomButton
                            title="Create Committee"
                            style={styles.createCommittee}
                            onPress={() => navigate('CreateCommittee')}
                        />

                    </View>
                </View>
            </ScrollView>
            <Loader visible={Loading} />
        </View>
    );
};
const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.background,
    },
    dashboardScroll: {
        marginBottom: 65,
    },
    RectangleImg: {
        width: '100%',
        height: '250@vs',
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
    textView: {
        padding: 15,
    },
    wavingHand: {
        width: 28,
        height: 28,
    },
    h2: {
        color: AppColors.title,
        fontSize: moderateScale(20),
    },
    h4: {
        color: AppColors.title,
        fontSize: moderateScale(16),
        opacity: 0.9,
    },
    //----------------------------
    Dashboardcard_View: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -40,
    },
    Dashboardcard: {
        width: wp(90),
        backgroundColor: AppColors.background,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 20,
        elevation: 5,
        borderRadius: wp('5%'),
        borderWidth: 1,
        borderColor: AppColors.primary,
        margin: 10,
    },
    group: {
        width: 35,
        height: 35,
    },
    imgText: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeBC: {
        color: AppColors.blackText,
        fontSize: moderateScale(18),
        fontWeight: '500',
        padding: 5,
    },
    activeBC_details: {
        color: AppColors.blackText,
        fontSize: moderateScale(16),
        opacity: 0.7,
    },
    counter: {
        backgroundColor: AppColors.primary,
        borderRadius: 10,
    },
    counter_text: {
        fontSize: moderateScale(20),
        padding: 10,
        color: AppColors.title,
    },
    BtnView: {
        width: '70%',
        alignSelf: 'center',
    },

    CreateUser: {
        backgroundColor: AppColors.cardLight,
        padding: 12,
        borderRadius: 15,
        alignItems: 'center',
        elevation: 5,
        marginTop: 5,
    },
    CreateUser_text: {
        color: AppColors.primary,
        fontWeight: 'bold',
    },
    textandLink: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    linkView: {
        padding: 15,

    },
    //-------------------------------------
    container3: {

        position: 'relative',
        paddingRight: 15
    },
    shareApp: {
        backgroundColor: AppColors.background,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 50,
        elevation: 5
    },
    shareAppText: {
        fontSize: 14,
        color: AppColors.blackText
    }

    // dropdown: {
    //     position: 'absolute',
    //     top: 35,
    //     right: 5,
    //     width: 180,
    //     backgroundColor: '#fff',
    //     borderRadius: 12,
    //     paddingVertical: 8,
    //     elevation: 5,
    //     zIndex: 100
    // },
    // item: {
    //     paddingVertical: 10,
    //     paddingHorizontal: 15,
    //     flexDirection: 'row',
    //     alignItems: 'center'
    // },
    // text: {
    //     fontSize: 14,
    //     color: '#333',
    //     paddingLeft: 4
    // },
});

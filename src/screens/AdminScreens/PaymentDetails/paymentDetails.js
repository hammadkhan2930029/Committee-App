import { useNavigation } from '@react-navigation/native';
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView,
    Modal,
} from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { AppColors } from '../../../constant/appColors';
import { AppImages } from '../../../constant/appImages';
import { AppIcons } from '../../../constant/appIcons';
import { CustomButton } from '../../../components/customButton';
import { CustomButtonLight } from '../../../components/customeButtonLight';
import { navigate } from '../../../navigations/navigationService';
import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { Loader } from '../../Loader/loader';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialIcons';



export const PaymentDetails = ({ route }) => {
    //-------------------------------------------
    const [loading, setLoading] = useState(true);

    const [showImage, setShowImage] = useState(false);

    const { item } = route.params;
    console.log('payment details :', item);
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)

        }, 1000);
    }, [item.payment_by])

    //-------------------------------------------

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleVerifyPress = () => {
        setIsModalVisible(true);
    };

    const onPaymentSelect = (type) => {
        setIsModalVisible(false);
        // Yahan aap apni API call ya logic pass kar sakte hain
        if (type === 'full') {

            markPaymentVerified();
        } else if (type == 'partial') {
            PartialPayment()
        }
    };

    //-------------------full payment------------------------
    const markPaymentVerified = async () => {
        setLoading(true)
        try {
            const response = await api.get(
                `/user/mark-payment/verified-full/${item.payment_id}`,
            );
            const result = await response?.data?.msg[0]?.response;
            console.log('payment verified mark :', result);
            if (result) {
                Toast.show({
                    type: 'customToast',
                    text1: 'Success',
                    text2: result,
                    props: {
                        bgColor: AppColors.background,
                        borderColor: 'green',
                    },
                });
                navigation.goBack();
                setLoading(false);
            } else {
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
        } catch (error) {
            console.log(error);
        }
    };
    //-------------------------------------------------------
    const PartialPayment = async () => {
        setLoading(true)
        try {
            const response = await api.get(
                `/user/mark-payment/verified-partial/${item.payment_id}`,
            );
            const result = await response?.data?.msg[0]?.response;
            console.log('partial payment verified mark :', result);
            if (result) {
                Toast.show({
                    type: 'customToast',
                    text1: 'Success',
                    text2: result,
                    props: {
                        bgColor: AppColors.background,
                        borderColor: 'green',
                    },
                });
                navigation.goBack();
                setLoading(false);
            } else {
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
        } catch (error) {
            console.log(error);
        }
    };
    //-------------first letter capital-----------------------
    const capitalizeFirstLetter = (text) => {
        if (!text) return '';
        return text.charAt(0).toUpperCase() + text.slice(1)
    }

    //-----------------------------------------------------

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
                                        <Icon
                                            name="arrow-back"
                                            size={28}
                                            color={AppColors.title}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.h1}>Payment Details</Text>
                                </View>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.h4}>
                                    Review slip and update payment status.
                                </Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.BCDetails}>
                    <View style={styles.row}>
                        <Text style={styles.text1}>User Name</Text>
                        <Text style={styles.text2}>{capitalizeFirstLetter(item.payment_by)}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.text1}>Committee</Text>
                        <Text style={styles.text2}>{capitalizeFirstLetter(item.committe_name)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text1}>Round no</Text>
                        <Text style={styles.text2}>{item.round_no}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text1}>Round Month</Text>
                        <Text style={styles.text2}>{item.round_month}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text1}>Paid Amount</Text>
                        <Text style={styles.text2}>{item.paid_amount}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text1}>Status</Text>
                        <View style={[styles.activeBtn, { backgroundColor: item.status === 'verified' ? 'green' : AppColors.primary }]}>
                            <Text style={styles.active}>{capitalizeFirstLetter(item.status)}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.fullSlip_View}>
                    <View style={styles.fullSlip}>
                        {item?.pay_slip ? (
                            <TouchableOpacity onPress={() => setShowImage(true)}>
                                <Image source={{ uri: item.pay_slip }} style={styles.paySlip} />
                            </TouchableOpacity>
                        ) : (
                            <Text style={styles.tapText}>Pay Slip not available</Text>
                        )}
                    </View>
                </View>
                <View style={styles.buttons}>
                    <View style={styles.btnView}>
                        <CustomButton
                            title="Verify Payment"
                            // onPress={() => markPaymentVerified()}
                            onPress={handleVerifyPress}
                            disabled={item.status === 'verified'}
                        />
                    </View>
                    {/* ------------------------------------------------------------------------ */}
                    <Modal
                        visible={isModalVisible}
                        transparent={true}
                        animationType="fade"
                        onRequestClose={() => setIsModalVisible(false)}
                    >
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Select Payment Type</Text>
                                <Text style={styles.modalSubTitle}>Choose how you want to verify this payment</Text>

                                <View style={styles.modalBtnContainer}>
                                    <TouchableOpacity
                                        style={[styles.paymentBtn, { backgroundColor: AppColors.primary }]}
                                        onPress={() => onPaymentSelect('full')}
                                    >
                                        <Text style={styles.paymentBtnText}>Full Payment</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.paymentBtn, styles.partialBtn]}
                                        onPress={() => onPaymentSelect('partial')}
                                    >
                                        <Text style={[styles.paymentBtnText, { color: AppColors.primary }]}>Partial Payment</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.cancelBtn}
                                        onPress={() => setIsModalVisible(false)}
                                    >
                                        <Text style={styles.cancelText}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    {/* ------------------------------------------------------------------------- */}
                </View>
                <Modal
                    visible={showImage}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setShowImage(false)}
                >
                    <View style={styles.modalContainer}>
                        <TouchableOpacity
                            style={styles.modalClose}
                            onPress={() => setShowImage(false)}
                        >
                            <Text style={styles.closeText}>✕</Text>
                        </TouchableOpacity>

                        <Image source={{ uri: item.pay_slip }} style={styles.fullImage} />
                    </View>
                </Modal>
            </ScrollView>
            <Loader visible={loading} />
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
    activeBtn: {
        backgroundColor: AppColors.primary,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 20,
        elevation: 5
    },
    active: {
        fontSize: moderateScale(16),
        color: AppColors.title,
        textAlign: 'center',
        padding: 3,
    },
    //----------------------------------
    BCDetails: {
        width: '100%',

        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 6,
        borderBottomColor: AppColors.primary,
        borderBottomWidth: 1,
        // backgroundColor: 'green',
    },
    text1: {
        color: AppColors.blackText,
        fontSize: moderateScale(18),
    },
    text2: {
        color: AppColors.bodyText,
        fontSize: moderateScale(15),
    },
    buttons: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 20,
    },
    btnView: {
        width: '50%',
        margin: 5,
    },
    fullSlip_View: {
        width: '100%',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullSlip: {
        borderColor: AppColors.primary,
        borderWidth: 1,
        width: '100%',
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 10,
        borderRadius: 15,
    },
    empty: {
        backgroundColor: '#bbbbbbff',
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    tapText: {
        color: AppColors.link,
        fontSize: moderateScale(20),
    },
    //------------------------------
    paySlip: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalClose: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 10,
    },
    closeText: {
        color: '#fff',
        fontSize: moderateScale(28),
        fontWeight: 'bold',
    },
    fullImage: {
        width: '90%',
        height: '80%',
        resizeMode: 'contain',
    },
    //------modal style--------------------
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: '20@ms',
        padding: '20@ms',
        alignItems: 'center',
        elevation: 10,
    },
    modalTitle: {
        fontSize: '18@ms',
        fontWeight: '700',
        color: '#000',
        marginBottom: '5@ms',
    },
    modalSubTitle: {
        fontSize: '13@ms',
        color: '#666',
        textAlign: 'center',
        marginBottom: '20@ms',
    },
    modalBtnContainer: {
        width: '100%',
        gap: '10@ms', // Buttons ke darmiyan gap
    },
    paymentBtn: {
        width: '100%',
        height: '45@ms',
        borderRadius: '10@ms',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '10@ms',
    },
    partialBtn: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: AppColors.primary,
    },
    paymentBtnText: {
        color: '#fff',
        fontSize: '15@ms',
        fontWeight: '600',
    },
    cancelBtn: {
        marginTop: '5@ms',
        padding: '10@ms',
    },
    cancelText: {
        color: 'red',
        fontSize: '14@ms',
    },
});

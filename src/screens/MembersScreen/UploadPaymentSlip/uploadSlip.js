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
} from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { AppColors } from '../../../constant/appColors';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppIcons } from '../../../constant/appIcons';
import { AppImages } from '../../../constant/appImages';
import { CustomButton } from '../../../components/customButton';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useCallback, useEffect, useState } from 'react';
import { CustomInputWithIcon } from '../../../components/customInputWithIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import { getStoredUser } from '../../../Utils/getUser';
import { api } from '../../../services/api';
import { Loader } from '../../Loader/loader';
import { CustomInput } from '../../../components/customTextInput';
import { string } from 'yup';
import { DisabledButton } from '../../../components/disabledButton';

export const UploadSlip = ({ route }) => {
    //-------------------------------------------------
    const { amount, data, memberCount, singleRoundAmount } = route.params;
    const [amountError, setAmountError] = useState('');

    console.log('data', data);

    const navigation = useNavigation();
    //-------------------------------------------------
    const [imageUri, setImageUri] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userAmount, setUserAmount] = useState();

    //-------------------------------------------------
    const [userData, setUserData] = useState();

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
    // console.log('userID', userID);
    //-------------------------------------------------
    const options = {
        mediaType: 'photo',
        quality: 0.7,
        selectionLimit: 1,
    };
    //----------------------------------------------

    const formatNumber = value => {
        if (value === null || value === undefined) return '';

        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    //-------------------------------------------------
    const allowedTypes = ['image/jpg', 'image/png', 'image/webp'];

    const isValidImageType = asset => {
        if (!asset) return false;
        return allowedTypes.includes(asset.type);
    };
    //-------------------------------------------------
    const getFileExtension = filename =>
        filename?.split('.').pop()?.toLowerCase();

    const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];

    //-------------------------------------------------
    const openGallery = () => {
        setModalVisible(false);

        launchImageLibrary(options, response => {
            if (response.didCancel) return;

            if (response.errorCode) {
                Toast.show({
                    type: 'customToast',
                    text1: 'Warning',
                    text2: response.errorMessage,
                    props: {
                        bgColor: AppColors.background,
                        borderColor: 'orange',
                    },
                });
                return;
            }

            const asset = response?.assets?.[0];

            if (!asset) {
                Toast.show({
                    type: 'customToast',
                    text1: 'Error',
                    text2: 'No image selected',
                    props: {
                        bgColor: AppColors.background,
                        borderColor: 'red',
                    },
                });
                return;
            }

            // ✅ Extension check
            const ext = asset.fileName?.split('.').pop()?.toLowerCase();

            const validMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
            const validExtensions = ['jpg', 'jpeg', 'png', 'webp'];

            if (
                !validMimeTypes.includes(asset.type) &&
                !validExtensions.includes(ext)
            ) {
                Toast.show({
                    type: 'customToast',
                    text1: 'Invalid Format',
                    text2: 'Only JPG, PNG, and WEBP images are allowed.',
                    props: {
                        bgColor: AppColors.background,
                        borderColor: 'red',
                    },
                });
                return;
            }

            

            setImageUri(asset); 
        });
    };
    //------------------------------------------------

    //-------------------------------------------------
    const uploadPaymentSlip = async () => {

        console.log('user_id', userID);
        console.log('committee_round_id', data.committee_round_id);
        console.log('amount', userAmount);

        console.log('committee_id', data.committee_id);
        console.log('committee_member_id', data.committee_member_id);
        console.log('URI :', imageUri);

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('user_id', userID);
            formData.append('committee_round_id', data.committee_round_id);
            formData.append('amount', userAmount);

            formData.append('committee_id', data.committee_id);
            formData.append('committee_member_id', data.committee_member_id);
            // if (imageUri) {
            //     formData.append('pay_slip', imageUri);
            // }
            if (imageUri) {
                formData.append('pay_slip', {
                    uri: imageUri.uri,
                    name: imageUri.fileName || 'payment.jpg',
                    type: imageUri.type || 'image/jpeg',
                });
            }
            console.log('formData :', formData);

            const response = await api.post(
                '/user/send/committee-payment', formData,
                { headers: { 'Content-Type': 'multipart/form-data' } },

            );
            console.log('response :', response);
            Toast.show({
                type: 'customToast',
                text1: 'Success',
                text2: response?.data?.msg?.[0]?.response ,
                props: {
                    bgColor: AppColors.background,
                    borderColor: 'green',
                },
            });

            setImageUri(null);
            navigation.goBack();
        } catch (error) {
            console.log('error :', error)
            Toast.show({
                type: 'customToast',
                text1: 'Error',
                text2: 'Server error, please try again',
                props: {
                    bgColor: AppColors.background,
                    borderColor: '#ff5252',
                },
            });
        } finally {
            setLoading(false);
        }
    };

    const str = String(amount);
    //------------------------------------------------
    const handleChangemount = value => {
        if (value === '') {
            setUserAmount('');
            setAmountError('');
        }

        const numericValue = Number(value);
        if (isNaN(numericValue)) return;

        if (numericValue > amount) {
            setAmountError(
                `Amount cannot be greater than PKR ${formatNumber(amount)}`,
            );
            return;
        }
        setAmountError('');
        setUserAmount(numericValue);
    };


    return (
        <View style={styles.conatiner}>
            <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />
            <ScrollView>
                <View>
                    <ImageBackground
                        source={AppImages.Rectangle}
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
                                    <Text style={styles.h1}>Upload Payment Slip </Text>
                                </View>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.h4}>
                                    Submit your payment slip for this month.
                                </Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.details}>
                    <View style={styles.data}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Single Round Amount</Text>
                            <Text style={styles.value}>
                                PKR {formatNumber(singleRoundAmount)}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Round Month</Text>
                            <Text style={styles.value}>{data.round_month}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Total Rounds</Text>
                            <Text style={styles.value}>{memberCount}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Total Amount</Text>
                            <Text style={styles.value}>PKR {formatNumber(amount)}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Due Date</Text>
                            <Text style={styles.value}>{data.due_date}</Text>
                        </View>

                        <View style={styles.uploadSlip}>
                            <View
                                style={[
                                    styles.decView,
                                    { display: userAmount > 0 ? 'flex' : 'none' },
                                ]}
                            >
                                <Text style={styles.decValue}>{userAmount - amount}</Text>
                            </View>
                            <CustomInput
                                label="Amount"
                                type="numeric"
                                placeholder={formatNumber(str)}
                                value={userAmount?.toString()}
                                onChangeText={handleChangemount}
                            />
                            {amountError ? (
                                <Text style={{ color: 'red', marginTop: 4, fontSize: 12 }}>
                                    {amountError}
                                </Text>
                            ) : null}
                            <View>
                                <CustomInputWithIcon
                                    label="Choose File"
                                    placeholder="Choose File"
                                    editable={false}
                                    pointerEvents="none"
                                    rightIcon={<Icon name="file-upload" size={20} color="#666" />}
                                />

                                {/* Overlay Press Area */}
                                <TouchableOpacity
                                    style={StyleSheet.absoluteFill}
                                    onPress={() => setModalVisible(true)}
                                    activeOpacity={0.7}
                                />
                            </View>
                            {/* Agar imageUri khali hai ya null hai, to ye message dikhayega */}
                            {!imageUri && (
                                <View style={styles.errorContainer}>
                                    <Icon name="error-outline" size={16} color="red" />
                                    <Text style={styles.errorText}>Please upload a payment slip to continue</Text>
                                </View>
                            )}
                        </View>
                        <View style={styles.customBTN}>
                            {userAmount > 0 && userAmount <= amount && imageUri ? (
                                <CustomButton
                                    title="Submit"
                                    onPress={() => uploadPaymentSlip()}
                                />
                            ) : (
                                <DisabledButton title="Submit" />
                            )}
                        </View>
                        {/* ----------------------------- */}
                        <Modal
                            visible={modalVisible}
                            transparent
                            animationType="fade"
                            onRequestClose={() => setModalVisible(false)}
                        >
                            <View style={styles.overlay}>
                                <View style={styles.modalBox}>
                                    <View style={styles.modalHeader}>
                                        <Text style={styles.title}>Select Image</Text>
                                    </View>

                                    <TouchableOpacity
                                        style={styles.optionBtn}
                                        onPress={openGallery}
                                    >
                                        <Text style={styles.optionText}>🖼️ Gallery</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.cancelBtn}
                                        onPress={() => setModalVisible(false)}
                                    >
                                        <Text style={styles.cancelText}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>

                        {/* ----------------------------- */}

                        {/*imageUri && (
                            <Image source={{ uri: imageUri }} style={styles.image} />
                        )*/}
                        {imageUri?.uri && (
                            <Image source={{ uri: imageUri.uri }} style={styles.image} />
                        )}

                    </View>
                </View>
            </ScrollView>
            <Loader visible={loading} />
        </View>
    );
};
const styles = ScaledSheet.create({
    conatiner: {
        flex: 1,
        backgroundColor: AppColors.background,
    },
    arrowBack: {
        width: 28,
        height: 28,
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
    //---------------------------------
    details: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    data: {
        width: '90%',
        padding: 10,
    },
    row: {
        justifyContent: 'space-between',
        alignItems: 'center',

        flexDirection: 'row',
        padding: 5,
        borderBottomColor: AppColors.primary,
        borderBottomWidth: 2,
    },
    label: {
        fontSize: moderateScale(17),
        color: AppColors.blackText,
        fontWeight: '600',
        padding: 3,
    },
    value: {
        color: AppColors.label,
        fontSize: moderateScale(14),
    },
    btn: {
        backgroundColor: AppColors.primary,
        width: 80,
        borderRadius: 15,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontSize: moderateScale(14),
        color: AppColors.title,
    },
    customBTN: {
        width: '100%',
        padding: 20,
    },
    //--------------modal---------------------
    uploadBtn: {
        backgroundColor: '#1e90ff',
        borderRadius: 8,
        alignSelf: 'center',
        marginTop: 40,
    },
    uploadText: {
        color: '#fff',
        fontWeight: '600',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        backgroundColor: '#fff',
        width: '80%',
        height: 160,
        borderRadius: 12,
    },
    title: {
        fontSize: moderateScale(16),
        fontWeight: '700',
        textAlign: 'center',
        color: AppColors.title,
    },
    optionBtn: {
        paddingVertical: 12,
    },
    optionText: {
        fontSize: 15,
        textAlign: 'center',
    },
    cancelBtn: {
        marginTop: 10,
        borderTopWidth: 1,
        borderColor: '#ff7e43ff',
        paddingTop: 10,
    },
    cancelText: {
        textAlign: 'center',
        color: 'red',
        fontWeight: '700',
    },
    image: {
        width: '80%',
        height: 200,
        resizeMode: 'contain',
        marginTop: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
    modalHeader: {
        backgroundColor: AppColors.primary,
        padding: 20,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    decView: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    decValue: {
        color: 'red',
        marginBottom: -20,
        fontSize: moderateScale(14),
        padding: 5,
    },
    //---------------------------------
    errorText: {
        color: 'red',
        fontSize: '12@ms',
        marginLeft: '5@ms',
        fontWeight: '500',
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '8@ms',
        backgroundColor: '#ffe6e6', // Halka red background
        padding: '8@ms',
        borderRadius: '5@ms',
    }
});

import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    StatusBar,
    Image,
    TextBase,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ImageBackground
} from 'react-native';
import { AppColors } from '../../../constant/appColors';
import { AppIcons } from '../../../constant/appIcons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { ScaledSheet } from 'react-native-size-matters';
import { OtpInput } from 'react-native-otp-entry';
import { CustomButton } from '../../../components/customButton';
import { CustomInput } from '../../../components/customTextInput';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { api } from '../../../services/api';
import { AppImages } from '../../../constant/appImages';
import { getStoredUser } from '../../../Utils/getUser'
import { Loader } from '../../Loader/loader';
import Toast from 'react-native-toast-message';
import { CommonActions } from '@react-navigation/native';


export const ResetPassword = ({ route }) => {

    const { email } = route.params
    const navigation = useNavigation();
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(false);

    console.log('email resett:', email)


    //-------------------------------------------
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
    //--------------------------change password----------------------------------
    const changePassword = async (value) => {
        setLoading(true)
        try {
            var formData = new FormData()
            formData.append('email', email)
            formData.append('new_password', value.newPassword)
            formData.append('confirm_password', value.confirmPassword)

            const response = await api.post('/user/reset-password', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },

            })
            const result = response?.data?.msg[0]?.response
            console.log('changePassword', result)

            if (response?.data?.code === '200') {
                Toast.show({
                    type: 'customToast',
                    text1: 'Success',
                    text2: result,
                    props: {
                        bgColor: AppColors.background,
                        borderColor: 'green',
                    },
                });
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'AuthStack' }],
                    }),
                );
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
            console.log('Try Catch error', error)
            Toast.show({
                type: 'customToast',
                text1: 'Error',
                text2:
                    error?.response?.data?.message || 'Server error, please try again',
                props: {
                    bgColor: AppColors.background,
                    borderColor: '#ff5252',
                },
            });
        } finally {
            setLoading(false)
        }
    }
    //--------------------------------------------------------------------------



    return (
        <View style={styles.Container}>
            <StatusBar
                backgroundColor={AppColors.primary}
                barStyle="light-content"
            />
            <ScrollView>

                <View>
                    <ImageBackground
                        source={AppImages.Rectangle}
                        style={styles.RectangleImg}
                        resizeMode="cover"
                    >
                        <View style={styles.backgroundInnerView}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={styles.backbtn}
                            >
                                <Icon
                                    name="arrow-back"
                                    size={28}
                                    color={AppColors.title}
                                />
                            </TouchableOpacity>
                            <View style={styles.headingsAlign}>
                                <Text style={styles.h1}>Reset Password</Text>
                                <Text style={styles.h4}>
                                    Reset your account security
                                </Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.main}>

                    <View style={styles.formView}>
                        <Formik
                            initialValues={{
                                email,
                                newPassword: '',
                                confirmPassword: '',
                            }}
                            onSubmit={(values, { resetForm }) => {
                                changePassword(values)
                                // resetForm()

                            }}
                        >
                            {({
                                values,
                                handleBlur,
                                handleChange,
                                handleSubmit,
                                handleReset,
                                errors,
                            }) => (
                                <View>
                                    <View>
                                        <CustomInput
                                            label="Email"
                                            value={values.email}
                                            editable={false}
                                        />
                                        <CustomInput
                                            label="New Password"
                                            type="password"
                                            placeholder="Enter new password"
                                            value={values.newPassword}
                                            onChangeText={handleChange('newPassword')}
                                            onBlur={handleBlur('newPassword')}
                                        />
                                        <CustomInput
                                            label="Confirm Password"
                                            type="password"
                                            placeholder="Re-enter  password"
                                            value={values.confirmPassword}
                                            onChangeText={handleChange('confirmPassword')}
                                            onBlur={handleBlur('confirmPassword')}
                                        />
                                    </View>

                                    <View style={styles.btn}>
                                        <CustomButton
                                            title="Change Password"
                                            onPress={handleSubmit}
                                        />
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </View>


                </View>
            </ScrollView>
            <Loader visible={loading} />
        </View>
    );
};
const styles = ScaledSheet.create({
    Container: {
        flex: 1,
        backgroundColor: AppColors.background,
    },
    RectangleImg: {
        width: '100%',
        height: '250@vs',

        justifyContent: 'center',
    },
    main: {
        marginBottom: 20,
    },
    backgroundInnerView: {
        height: '150@vs',
    },
    backbtn: {
        marginLeft: 15,
    },
    headingsAlign: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    h1: {
        fontSize: moderateScale(24),
        color: AppColors.title,
        padding: 5,
        fontWeight: '700',
    },
    h4: {
        fontSize: moderateScale(18),
        color: AppColors.title,
        opacity: 0.8,
    },
    formView: {
        borderRadius: 20,
        marginTop: 25,
        backgroundColor: "#fff",
        // margin: 5,
        paddingHorizontal: 10,
        paddingVertical: 15,

        elevation: 5,
        width: '95%',
        alignSelf: 'center',
        // padding: 20,
        borderRadius: 10,
        marginTop: -35,

        elevation: 5
    },

    view: {
        padding: 10,
    },
    text1: {
        color: AppColors.bodyText,
        fontSize: moderateScale(16),
    },
    link: {
        color: AppColors.link,
    },

    btn: {
        padding: 20,
    },
    reciveCode: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
});

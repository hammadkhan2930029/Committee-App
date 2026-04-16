


import React, { useCallback, useState } from 'react';
import {
    Image,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Alert,
} from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { AppColors } from '../../constant/appColors';
import { AppImages } from '../../constant/appImages';
import { CustomButton } from '../../components/customButton';
import { CustomInput } from '../../components/customTextInput';
import { Formik } from 'formik';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../services/api';
import Toast from 'react-native-toast-message';
import { Loader } from '../Loader/loader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { getStoredUser } from '../../Utils/getUser';

const { width } = Dimensions.get('window');

export const AdminEditProfile = ({ route }) => {
    const { user } = route.params;
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [userData, setUserData] = useState()

    const navigation = useNavigation();
    //----------------------------------------------
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
    console.log('userData', userData);

    //------------------ Image Picker ------------------
    const pickImage = () => {
        launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, response => {
            if (!response.didCancel && !response.errorCode) {
                setImage(response.assets[0]);
            }
        });
    };


    const openCamera = () => {
        launchCamera({ mediaType: 'photo', quality: 0.7 }, response => {
            if (!response.didCancel && !response.errorCode) {
                setImage(response.assets[0]);
            }
        });
    };

    const chooseImage = () => {
        Alert.alert('Select Image', 'Choose option', [
            { text: 'Camera', onPress: openCamera },
            { text: 'Gallery', onPress: pickImage },
            { text: 'Cancel', style: 'cancel' },
        ]);
    };

    //------------------ Storage Update ------------------
    const updateUserInStorage = async updatedUser => {
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    };

    //------------------ API Call ------------------
    const editProfile = async value => {
        console.log('full_name', value.fullName || user.full_name);
        console.log('phone', value.phoneNumber || user.phone);
        console.log('user_id', user.user_id);
        console.log('email', value.email || user.email);
        console.log('image', image);


        setIsLoading(true);
        try {
            let formData = new FormData();


            formData.append('full_name', value.fullName || user.full_name);
            formData.append('phone', value.phoneNumber || user.phone);
            formData.append('user_id', user.user_id);
            formData.append('email', value.email || user.email);


            // IMAGE UPLOAD
            if (image) {
                formData.append('image', {
                    uri: image.uri,
                    type: image.type || 'image/jpeg',
                    name: image.fileName || 'profile.jpg',
                });
            }
            const res = await api.post('/user/edit-profile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },

            });
            console.log("response :", res)

            if (res?.data?.code === '200') {
                const updatedUser = {
                    ...user,
                    full_name: value.fullName || user.full_name,
                    phone: value.phoneNumber || user.phone,
                    image: image?.uri || user.image,
                    email: value.email || user.email// ✅ ADD THIS
                };

                await updateUserInStorage(updatedUser);

                Toast.show({
                    type: 'customToast',
                    text1: 'Success',
                    text2: res?.data?.msg?.[0].response || 'Profile updated',
                    props: {
                        bgColor: AppColors.background,
                        borderColor: 'green',
                    },
                });

                navigation.goBack();
            } else {
                Toast.show({
                    type: 'customToast',
                    text1: 'Warning',
                    text2: res?.data?.msg?.[0].response || 'Something went wrong',
                    props: {
                        bgColor: AppColors.background,
                        borderColor: 'orange',
                    },
                });
            }
        } catch (error) {
            console.log(error)
            Toast.show({
                type: 'customToast',
                text1: 'Error',
                text2:
                    error?.response?.data?.msg?.[0]?.response ||
                    'Server error, please try again',
                props: {
                    bgColor: AppColors.background,
                    borderColor: '#ff5252',
                },
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />

            <ScrollView contentContainerStyle={styles.scroll}>

                {/* HEADER */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={26} color="#fff" />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Edit Profile</Text>

                    <View style={{ width: 24 }} />
                </View>

                {/* PROFILE CARD */}
                <View style={styles.card}>
                    <View style={styles.imageWrapper}>
                        <Image
                            source={
                                image ? { uri: image.uri } : userData?.image ? { uri: userData.image } : AppImages.profileAvatar
                            }
                            style={styles.image}
                        />

                        {/* Edit Icon */}
                        <TouchableOpacity style={styles.editIcon} onPress={chooseImage}>
                            <Icon name="edit" size={18} color={AppColors.primary} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.name}>{user.full_name}</Text>
                    <Text style={styles.role}>Administrator</Text>
                </View>

                {/* FORM CARD */}
                <View style={styles.formCard}>
                    <Formik
                        initialValues={{
                            fullName: user.full_name || '',
                            phoneNumber: user.phone || '',
                            email: user.email || ''
                        }}
                        onSubmit={values => editProfile(values)}
                    >
                        {({ values, handleChange, handleBlur, handleSubmit }) => (
                            <View>

                                <CustomInput
                                    label="Full Name"
                                    placeholder="Enter full name"
                                    value={values.fullName}
                                    onChangeText={handleChange('fullName')}
                                    onBlur={handleBlur('fullName')}
                                />

                                <CustomInput
                                    label="Phone Number"
                                    placeholder="Enter phone number"
                                    value={values.phoneNumber}
                                    onChangeText={handleChange('phoneNumber')}
                                    onBlur={handleBlur('phoneNumber')}
                                />
                                <CustomInput
                                    label="Email"
                                    placeholder="Enter email"
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                />

                                <View style={styles.btn}>
                                    <CustomButton title="Update Profile" onPress={handleSubmit} />
                                </View>

                            </View>
                        )}
                    </Formik>
                </View>
            </ScrollView>

            <Loader visible={isLoading} />
        </View>
    );
};

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

    imageWrapper: {
        position: 'relative',
    },

    image: {
        width: width * 0.28,
        height: width * 0.28,
        borderRadius: (width * 0.28) / 2,
    },

    editIcon: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: AppColors.background,
        padding: 6,
        borderRadius: 20,
        elevation: 5,
    },

    name: {
        fontSize: '20@ms',
        fontWeight: '700',
        color: '#fff',
        marginTop: '10@ms',
    },

    role: {
        fontSize: '14@ms',
        color: AppColors.cardLight,
    },

    formCard: {
        backgroundColor: AppColors.cardLight,
        margin: '20@ms',
        padding: '15@ms',
        borderRadius: '15@ms',
        elevation: 4,
    },

    btn: {
        marginTop: '15@ms',
    },
});
import React, { useEffect } from 'react';
import {
    // StatusBar,
    StyleSheet,
    Text,
    View,
    // PermissionsAndroid,
    // Platform,
} from 'react-native';
import { AppNavigator } from './src/navigations/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/navigations/navigationService';
import Toast from 'react-native-toast-message';
import { AppColors } from './src/constant/appColors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import messaging from '@react-native-firebase/messaging';



const App = () => {

    //----------------------------------------------------
    // const requestPermission = async () => {
    //     if (Platform.OS === 'android') {
    //         await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    //         );
    //     }

    //     const authStatus = await messaging().requestPermission();
    //     console.log('Permission:', authStatus);
    // };
    // useEffect(() => {
    //     requestPermission();
    // }, []);

    // useEffect(() => {
    //     // --- 1. Permission Request (Android 13+ ke liye) ---
    //     const requestPermission = async () => {
    //         if (Platform.OS === 'android' && Platform.Version >= 33) {
    //             const granted = await PermissionsAndroid.request(
    //                 PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    //             );
    //             console.log("Permission status:", granted);
    //         }
    //     };

    //     requestPermission();

    //     // --- 2. Foreground Messages (Jab app khuli ho) ---
    //     const unsubscribe = messaging().onMessage(async remoteMessage => {
    //         Alert.alert(
    //             remoteMessage.notification?.title || 'Naya Message',
    //             remoteMessage.notification?.body || 'Aapko ek notification mila hai.'
    //         );
    //     });

    //     // --- 3. Background Click (Jab app background mein ho aur click karein) ---
    //     messaging().onNotificationOpenedApp(remoteMessage => {
    //         console.log('Background notification pe click hua:', remoteMessage.notification);
    //     });

    //     // --- 4. Quit State Click (Jab app bilkul band ho) ---
    //     messaging()
    //         .getInitialNotification()
    //         .then(remoteMessage => {
    //             if (remoteMessage) {
    //                 console.log('Band app notification se khuli:', remoteMessage.notification);
    //             }
    //         });

    //     return unsubscribe;
    // }, []);
    //------------------------------------------
    // const subscribeTopic = async () => {
    //     await messaging().subscribeToTopic('allUsers');
    //     console.log('Subscribed to allUsers topic');
    // };
    // useEffect(() => {
    //     subscribeTopic();
    // }, []);
    //-------------------------------------------------
    const toastConfig = {
        customToast: ({ text1, text2, props }) => {
            const backgroundColor = props?.bgColor || '#fff7f2';
            const accentColor = props?.borderColor || AppColors.primary;
            const isSuccess = accentColor === 'green';
            const isWarning = accentColor === 'orange';
            const iconName = isSuccess
                ? 'check-circle'
                : isWarning
                    ? 'warning-amber'
                    : 'error-outline';
            const iconBackground = isSuccess
                ? 'rgba(46, 125, 50, 0.12)'
                : isWarning
                    ? 'rgba(237, 108, 2, 0.12)'
                    : 'rgba(211, 47, 47, 0.12)';

            return (
                <View style={[styles.toastCard, { backgroundColor }]}>
                    <View
                        style={[
                            styles.toastAccent,
                            { backgroundColor: accentColor },
                        ]}
                    />
                    <View
                        style={[
                            styles.toastIconWrap,
                            { backgroundColor: iconBackground },
                        ]}
                    >
                        <MaterialIcons
                            name={iconName}
                            size={22}
                            color={accentColor}
                        />
                    </View>
                    <View style={styles.toastContent}>
                        <Text numberOfLines={1} style={styles.toastTitle}>
                            {text1}
                        </Text>
                        {!!text2 && (
                            <Text numberOfLines={2} style={styles.toastMessage}>
                                {text2}
                            </Text>
                        )}
                    </View>
                </View>
            );
        },
    };

    return (
        <>
            <NavigationContainer ref={navigationRef}>
                <AppNavigator />
            </NavigationContainer>
            <Toast config={toastConfig} topOffset={18} visibilityTime={2600} />
        </>
    );
};

const styles = StyleSheet.create({
    toastCard: {
        width: '92%',
        minHeight: 74,
        alignSelf: 'center',
        borderRadius: 20,
        paddingVertical: 14,
        paddingLeft: 18,
        paddingRight: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#22140E',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.16,
        shadowRadius: 16,
        elevation: 8,
    },
    toastAccent: {
        width: 5,
        borderRadius: 999,
        alignSelf: 'stretch',
        marginRight: 14,
    },
    toastIconWrap: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    toastContent: {
        flex: 1,
    },
    toastTitle: {
        color: AppColors.focusText,
        fontWeight: '700',
        fontSize: 15,
        marginBottom: 2,
    },
    toastMessage: {
        color: AppColors.bodyText,
        fontSize: 13,
        lineHeight: 18,
    },
});

export default App;

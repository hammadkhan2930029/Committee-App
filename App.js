import React, { useEffect } from 'react';
import {
    // StatusBar,
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
            const { bgColor, borderColor } = props;

            return (
                <View
                    style={{
                        height: 60,
                        width: '90%',
                        backgroundColor: bgColor,
                        borderRadius: 10,
                        padding: 15,
                        borderLeftWidth: 6,
                        borderLeftColor: borderColor,
                    }}
                >
                    <Text
                        style={{
                            color: AppColors.bodyText,
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}
                    >
                        {text1}
                    </Text>

                    <Text
                        style={{
                            color: AppColors.bodyText,
                            fontSize: 14,
                        }}
                    >
                        {text2}
                    </Text>
                </View>
            );
        },
    };

    return (
        <>
            <NavigationContainer ref={navigationRef}>
                <AppNavigator />
            </NavigationContainer>
            <Toast config={toastConfig} />
        </>
    );
};
export default App;

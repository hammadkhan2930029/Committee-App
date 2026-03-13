import React from 'react';
import { Alert, Share, Button, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const ShareAppLink = () => {
    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'Check out this amazing app!\n\nDownload now:\nhttps://play.google.com/store/apps/details?id=com.comitte',
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
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <TouchableOpacity onPress={onShare} style={{ backgroundColor: '#fff', borderRadius: 50, padding: 5, flexDirection: 'row', alignItems: 'center', elevation: 5 }}>
                    <Text style={{ fontSize: 16, color: '#000' }}>Share</Text>
                    <Icon name="share" size={30} color="#FED22D" />

                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};


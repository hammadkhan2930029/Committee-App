//-----------------------members tab bottom navigator---------------------------------
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MembersDashboard } from '../screens/MembersScreen/MemberDashBoard/memberDashboard';
import { ActiveBCs } from '../screens/MembersScreen/ActiveBC/ActiveBc';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppColors } from '../constant/appColors';
import { AdminProfile } from '../screens/AdminProfile/adminProfile';
import { PaymentHistory } from '../screens/MembersScreen/PaymentHistory/paymentHistory';
import { useState } from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UserTab = createBottomTabNavigator();

export const BottomTabNavigationUser = () => {

    const navigation = useNavigation()
    const [menuVisible, setMenuVisible] = useState(false);


    //---------------------------CustomMenuButton----------------------------------

    const CustomMenuButton = ({ onPress }) => {
        return (
            <TouchableOpacity
                onPress={onPress}
                style={{
                    top: -20,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: AppColors.primary,
                        justifyContent: 'center',
                        alignItems: 'center',
                        elevation: 8,
                    }}
                >
                    <Ionicons name="menu" size={28} color="#fff" />
                </View>
            </TouchableOpacity>
        );
    };
    //---------------------------------------------------------------------
    return (
        <>
            <UserTab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, size, color }) => {
                        let icon;
                        if (route.name === 'MembersDashboard') {
                            icon = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'ActiveBCs') {
                            icon = focused ? 'list-sharp' : 'list-outline';
                        } else if (route.name === 'PaymentHistory') {
                            icon = focused ? 'briefcase' : 'briefcase-outline';
                        } else if (route.name === 'AdminProfile') {
                            icon = focused ? 'person' : 'person-outline';
                        }
                        return (
                            <Ionicons
                                name={icon}
                                size={25}
                                color={focused ? AppColors.primary : AppColors.bodyText}
                            />
                        );
                    },
                    tabBarInactiveTintColor: 'black',
                    tabBarActiveTintColor: 'black',
                    tabBarShowLabel: false,

                    tabBarIconStyle: {
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                    },

                    tabBarStyle: {
                        position: 'absolute',
                        right: 5,
                        left: 5,
                        bottom: 5,
                        borderRadius: 15,
                        height: 60,
                        elevation: 12,
                    },
                })}
                initialRouteName="MembersDashboard"
            >
                <UserTab.Screen
                    name="MembersDashboard"
                    component={MembersDashboard}
                    options={{ headerShown: false }}
                />
                <UserTab.Screen
                    name="ActiveBCs"
                    component={ActiveBCs}
                    options={{ headerShown: false }}
                />
                {/* CENTER BUTTON */}
                <UserTab.Screen
                    name="Menu"
                    component={View}
                    options={{
                        tabBarButton: () => (
                            <CustomMenuButton onPress={() => setMenuVisible(true)} />
                        ),
                    }}
                />
                {/* ------------- */}
                <UserTab.Screen
                    name="PaymentHistory"
                    component={PaymentHistory}
                    options={{ headerShown: false }}
                />
                <UserTab.Screen
                    name="AdminProfile"
                    component={AdminProfile}
                    options={{ headerShown: false }}
                />
            </UserTab.Navigator>
            {/* BOTTOM MODAL */}

            <Modal visible={menuVisible} transparent animationType="slide">
                <TouchableOpacity
                    style={{ flex: 1, backgroundColor: 'rgba(101, 101, 101, 0.4)' }}
                    activeOpacity={1}
                    onPress={() => setMenuVisible(false)}
                >
                    <View
                        style={styles.modal}
                    >


                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('SuggestionScreen')
                                setMenuVisible(false)
                            }}
                            style={styles.item}>
                            <MaterialCommunityIcons name="lightbulb-outline" size={24} color={AppColors.link} />

                            <Text style={styles.text}>Suggestion</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            navigation.navigate('SupportTeam')
                            setMenuVisible(false)
                        }}
                            style={styles.item}>
                            <MaterialCommunityIcons name="comment-text-outline" size={24} color={AppColors.link} />

                            <Text style={styles.text}>Support</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    item: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: AppColors.primary
    },
    text: {
        fontSize: 14,
        color: '#333',
        paddingLeft: 4
    },
    modal: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingHorizontal: 20,
        paddingVertical: 40,
        elevation: 5
    }
})

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AdminDashboard } from '../screens/AdminScreens/AdminDashboard/AdminDashboard';
import { AppImages } from '../constant/appImages';
import { AppIcons } from '../constant/appIcons';
import { CommitteeList } from '../screens/AdminScreens/CommitteeList/committeeList';
import { Payments } from '../screens/AdminScreens/PaymentScreenForAll/paymentScreenForAll';
import { AdminProfile } from '../screens/AdminProfile/adminProfile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppColors } from '../constant/appColors';
import { useState } from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();




export const BottomTabNavigation = () => {

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
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, size, color }) => {
                        let icon;
                        if (route.name === 'AdminDashboard') {
                            icon = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'CommitteeList') {
                            icon = focused ? 'list-sharp' : 'list-outline';
                        }
                        else if (route.name === 'AdminProfile') {
                            icon = focused ? 'person' : 'person-outline';
                        }
                        else if (route.name === 'Payments') {
                            icon = focused ? 'briefcase' : 'briefcase-outline';
                        }
                        return <Ionicons name={icon} size={25} color={focused ? AppColors.primary : AppColors.bodyText} />;
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
                initialRouteName="AdminDashboard"
            >
                <Tab.Screen
                    name="AdminDashboard"
                    component={AdminDashboard}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name="CommitteeList"
                    component={CommitteeList}
                    options={{ headerShown: false }}
                />

                {/* CENTER BUTTON */}
                <Tab.Screen
                    name="Menu"
                    component={View}
                    options={{
                        tabBarButton: () => (
                            <CustomMenuButton onPress={() => setMenuVisible(true)} />
                        ),
                    }}
                />
                {/* ------------- */}

                <Tab.Screen
                    name="Payments"
                    component={Payments}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name="AdminProfile"
                    component={AdminProfile}
                    options={{ headerShown: false }}
                />

            </Tab.Navigator>
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

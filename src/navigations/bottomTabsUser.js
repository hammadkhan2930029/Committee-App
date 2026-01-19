import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//---------------------members-----------------------------------------
import { MembersDashboard } from '../screens/MembersScreen/MemberDashBoard/memberDashboard';
import { ActiveBCs } from '../screens/MembersScreen/ActiveBC/ActiveBc';
import Icon from 'react-native-vector-icons/MaterialIcons';


import { AppColors } from '../constant/appColors';
import { AdminProfile } from '../screens/AdminProfile/adminProfile';

const UserTab = createBottomTabNavigator();

export const BottomTabNavigationUser = () => {
  return (
    <UserTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let icon;
          if (route.name === 'MembersDashboard') {
            icon = focused ? 'home' : 'home';
          } else if (route.name === 'ActiveBCs') {
            icon = focused ? 'groups' : 'groups';
          } else if (route.name === 'PaymentUser') {
            icon = focused ? 'credit-card' : 'credit-card';
          } else if (route.name === 'UserProfile') {
            icon = focused ? 'person' : 'person';
          }
          return (
            <Icon
              name={icon}
              size={30}
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
      {/* <UserTab.Screen
        name="PaymentUser"
        component={PaymentUser}
        options={{ headerShown: false }}
      /> */}
      <UserTab.Screen
        name="UserProfile"
        component={AdminProfile}
        options={{ headerShown: false }}
      />
    </UserTab.Navigator>
  );
};

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AdminDashboard } from '../screens/AdminScreens/AdminDashboard/AdminDashboard';
import { Image } from 'react-native';
import { AppImages } from '../constant/appImages';
import { AppIcons } from '../constant/appIcons';
import { CommitteeList } from '../screens/AdminScreens/CommitteeList/committeeList';
import { CommitteeUserList } from '../screens/AdminScreens/CommitteeUserList/committeeUserList';
import { Payments } from '../screens/AdminScreens/PaymentScreenForAll/paymentScreenForAll';
const Tab = createBottomTabNavigator();

export const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let icon;
          if (route.name === 'AdminDashboard') {
            icon = focused ? AppIcons.HomeActive : AppIcons.Home;
          } else if (route.name === 'CommitteeList') {
            icon = focused
              ? AppIcons.Magnetic_Card_Active
              : AppIcons.Magnetic_Card;
          } else if (route.name === 'CommitteeUserList') {
            icon = focused ? AppIcons.PeopleActive : AppIcons.PeopleTb;
          }
          else if (route.name === 'Payments') {
            icon = focused ? AppIcons.BriefcaseActive : AppIcons.Briefcase;
          }
          return (
            <Image
              source={icon}
              style={{
                width: 25,
                height: 25,
                resizeMode: 'contain',
              }}
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

      <Tab.Screen
        name="CommitteeUserList"
        component={CommitteeUserList}
        options={{ headerShown: false }}
      />
       <Tab.Screen
        name="Payments"
        component={Payments}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

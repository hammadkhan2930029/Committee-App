import React, { useState, useEffect } from 'react';
import { AuthNavigator } from './authNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChooseRole } from '../screens/ChooseRole/chooseRole';
import { AdminProfile } from '../screens/AdminProfile/adminProfile';
import { AdminEditProfile } from '../screens/AdminProfile/adminEditProfile';
import { BottomTabNavigation } from './BottomTabs';
import { CreateCommittee } from '../screens/AdminScreens/CreateCommittee/createCommittee';
import { EditCommittee } from '../screens/AdminScreens/EditCommittee/editCommitte';
import { CreateMembers } from '../screens/AdminScreens/CreateMember/createMember';
import { CommitteeDetails } from '../screens/AdminScreens/CommitteeDetail/committeeDetail';
import { AddCommitteeMembers } from '../screens/AdminScreens/AddCommitteeMembers/AddCommitteeMembers';
import { AssignRounds } from '../screens/AdminScreens/AssignRounds/assignRounds';
import { MembersDetails } from '../screens/AdminScreens/MembersDetils/membersDetails';
import { EditMember } from '../screens/AdminScreens/EditMember/editMember';
import { PaymentDetails } from '../screens/AdminScreens/PaymentDetails/paymentDetails';

//---------members--------------------------------------
import { BottomTabNavigationUser } from '../navigations/bottomTabsUser';
import { MembersDashboard } from '../screens/MembersScreen/MemberDashBoard/memberDashboard';
import { UserEditProfile } from '../screens/MembersScreen/UserEditProfile/userEditProfile';
import { UserProfile } from '../screens/MembersScreen/Profile/userProfile';
import { UploadSlip } from '../screens/MembersScreen/UploadPaymentSlip/uploadSlip';
import { PaymentHistory } from '../screens/MembersScreen/PaymentHistory/paymentHistory';
import { UserCommitteeDetails } from '../screens/MembersScreen/UserCommitteeDetails/UserCommitteeDetails';
import { UserPaymentDetails } from '../screens/MembersScreen/UserPaymentDetails/userPaymentDetail';
import { EditPayments } from '../screens/MembersScreen/EditPayments/editePayment';
import { Login } from '../screens/Auth/Login/login';
import { Payments } from '../screens/AdminScreens/PaymentScreenForAll/paymentScreenForAll';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthStack" component={AuthNavigator} />
      <Stack.Screen name="ChooseRole" component={ChooseRole} />
      <Stack.Screen name="AdminProfile" component={AdminProfile} />
      <Stack.Screen name="AdminEditProfile" component={AdminEditProfile} />
      <Stack.Screen
        name="BottomTabNavigation"
        component={BottomTabNavigation}
      />

      <Stack.Screen name="CreateCommittee" component={CreateCommittee} />
      <Stack.Screen name="EditCommittee" component={EditCommittee} />
      <Stack.Screen name="CreateMembers" component={CreateMembers} />
      <Stack.Screen name="CommitteeDetails" component={CommitteeDetails} />
      <Stack.Screen
        name="AddCommitteeMembers"
        component={AddCommitteeMembers}
      />
      <Stack.Screen name="AssignRounds" component={AssignRounds} />
      <Stack.Screen name="MembersDetails" component={MembersDetails} />
      <Stack.Screen name="EditMember" component={EditMember} />
      <Stack.Screen name="PaymentDetails" component={PaymentDetails} />
      {/* -----------------members----------------------- */}
      <Stack.Screen
        name="BottomTabNavigationUser"
        component={BottomTabNavigationUser}
      />
      <Stack.Screen name="MembersDashboard" component={MembersDashboard} />
      <Stack.Screen name="UserEditProfile" component={UserEditProfile} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="UploadSlip" component={UploadSlip} />
      <Stack.Screen name="PaymentHistory" component={PaymentHistory} />
      <Stack.Screen
        name="UserCommitteeDetails"
        component={UserCommitteeDetails}
      />
      <Stack.Screen name="UserPaymentDetails" component={UserPaymentDetails} />
      <Stack.Screen name="EditPayments" component={EditPayments} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Payments" component={Payments} />



    </Stack.Navigator>
  );
};

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
import { MembersDashboard } from '../screens/MembersScreen/MemberDashBoard/memberDashboard';
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
      <Stack.Screen name="MembersDashboard" component={MembersDashboard} />

    </Stack.Navigator>
  );
};

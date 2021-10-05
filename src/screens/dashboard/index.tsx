import * as React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import PersonalInfoScreen from './personal-info';
import PregnancyCheckScreen from './pregnancy-check';
import ProfileScreen from './profile';
import {THEME} from '../../constant';
import InboxScreen from './inbox';

const Drawer = createDrawerNavigator();

const DashboardScreen = () => {
  return (
    <Drawer.Navigator initialRouteName="PersonalInfoScreen">
      <Drawer.Screen
        name="PersonalInfoScreen"
        component={PersonalInfoScreen}
        options={{
          title: 'Daftar Pasien Ibu Hamil',
          headerTitleStyle: THEME.body,
        }}
      />
      <Drawer.Screen
        name="PregnancyCheckScreen"
        component={PregnancyCheckScreen}
        options={{
          title: 'Daftar Cek Kehamilan',
          headerTitleStyle: THEME.body,
        }}
      />
      <Drawer.Screen
        name="InboxScreen"
        component={InboxScreen}
        options={{
          title: 'Pesan Masuk',
          headerTitleStyle: THEME.body,
        }}
      />
      <Drawer.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'Profil Anda',
          headerTitleStyle: THEME.body,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DashboardScreen;

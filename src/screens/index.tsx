import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './login';
import DashboardScreen from './dashboard';
import PersonalInfoDetailScreen from './personal-info-detail';
import {navigationRef} from '../hooks/navigation';
import {TEXT_PRIMARY_COLOR} from '../constant';
import PregnancyCheckDetailScreen from './pregnancy-check-detail';
import PregnancyCheckResultScreen from './pregnancy-check-result';
import SplashScreen from './splash';
import AddPregnancyCheckScheduleScreen from './add-pregnancy-check-schedule';
import AddPregnancyCheckRecordScreen from './add-pregnancy-check-record';
import ChatScreen from './chat';
import { WithNotification } from '../hooks/notification';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <WithNotification>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
          <Stack.Screen
            name="PersonalInfoDetailScreen"
            options={{
              headerShown: true,
              headerTintColor: TEXT_PRIMARY_COLOR,
              headerTitle: 'Detail Data Pasien',
            }}
            component={PersonalInfoDetailScreen}
          />
          <Stack.Screen
            name="PregnancyCheckDetailScreen"
            options={{
              headerShown: true,
              headerTintColor: TEXT_PRIMARY_COLOR,
              headerTitle: 'Detail Jadwal Cek Kehamilan',
            }}
            component={PregnancyCheckDetailScreen}
          />
          <Stack.Screen
            name="PregnancyCheckResultScreen"
            options={{
              headerShown: true,
              headerTintColor: TEXT_PRIMARY_COLOR,
              headerTitle: 'Detail Cek Pasien',
            }}
            component={PregnancyCheckResultScreen}
          />
          <Stack.Screen
            name="AddPregnancyCheckScheduleScreen"
            options={{
              headerShown: true,
              headerTintColor: TEXT_PRIMARY_COLOR,
              headerTitle: 'Tambah Jadwal Cek Kehamilan',
            }}
            component={AddPregnancyCheckScheduleScreen}
          />
          <Stack.Screen
            name="AddPregnancyCheckRecordScreen"
            options={{
              headerShown: true,
              headerTintColor: TEXT_PRIMARY_COLOR,
              headerTitle: 'Tambah Tindak Lanjut Cek Kehamilan',
            }}
            component={AddPregnancyCheckRecordScreen}
          />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </WithNotification>
  );
}

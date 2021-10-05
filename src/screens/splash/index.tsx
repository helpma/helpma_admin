import * as React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {PRIMARY_COLOR, STORAGE_ACCESS_TOKEN_KEY} from '../../constant';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {replace} from '../../hooks/navigation';

const SplashScreen = () => {
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_ACCESS_TOKEN_KEY).then(value => {
      if (!value) {
        replace('LoginScreen');
      } else {
        replace('DashboardScreen');
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      <ActivityIndicator color={PRIMARY_COLOR} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;

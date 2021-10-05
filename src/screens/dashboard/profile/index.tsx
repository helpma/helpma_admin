import * as React from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useGetMyPersonalInformation} from '../../../hooks/api/personal-information';
import {
  DANGER_COLOR,
  FORM_REQUIRED_RULE,
  PRIMARY_COLOR,
  SHADOWED_STYLE,
  THEME,
} from '../../../constant';
import {Button, TextField} from '../../../components';
import {useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {replace} from '../../../hooks/navigation';
import {useForm} from 'react-hook-form';
import {GenerateFormError} from '../../../util';
import {useUpdatePassword} from '../../../hooks/api';

const ProfileScreen = () => {
  const {data, isLoading} = useGetMyPersonalInformation();
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm();

  const {doFetch} = useUpdatePassword();

  const onLogout = useCallback(async () => {
    await AsyncStorage.clear();
    replace('LoginScreen');
  }, []);

  const onConfirmLogout = useCallback(() => {
    Alert.alert('Konfirmasi', 'Apakah anda yakin untuk keluar?', [
      {
        text: 'Batal',
        style: 'cancel',
      },
      {
        text: 'Lanjut',
        onPress: () => {
          onLogout().then(console.log);
        },
      },
    ]);
  }, [onLogout]);

  const onUpdatePassword = React.useCallback(
    data => {
      doFetch({
        newPassword: data.password,
        confirmPassword: data.confirmPassword,
      }).then(() => {
        Alert.alert('Berhasil', 'Password berhasil diubah');
        setValue('password', '');
        setValue('confirmPassword', '');
      });
    },
    [doFetch],
  );

  const onConfirmChangePassword = React.useCallback(
    data => {
      Alert.alert(
        'Konfirmasi',
        'Apakah anda yakin untuk mengubah password anda?',
        [
          {
            text: 'Batal',
          },
          {
            text: 'Lanjut',
            onPress: () => {
              onUpdatePassword(data);
            },
          },
        ],
      );
    },
    [onUpdatePassword],
  );

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <ScrollView>
      <View style={styles.container}>
        {/* <View style={styles.imageContainer}>
          <Image
            source={
              data?.profilePict
                ? {uri: data?.profilePict}
                : require('../../images/Portrait_Placeholder.png')
            }
            style={styles.profilePict}
          />
        </View> */}
        <View style={styles.bioContainer}>
          <Text style={styles.infoLabel}>Nama</Text>
          <Text style={styles.bio}>{data?.fullName}</Text>

          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.bio}>{data?.email}</Text>

          <Text style={styles.infoLabel}>No. HP</Text>
          <Text style={styles.bio}>{data?.phoneNumber || '-'}</Text>
        </View>

        <View style={styles.bioContainer}>
          <TextField
            secureTextEntry={true}
            control={control}
            id="password"
            error={GenerateFormError(errors.password)}
            label="Password"
            rules={FORM_REQUIRED_RULE}
          />
          <TextField
            secureTextEntry={true}
            control={control}
            id="confirmPassword"
            error={GenerateFormError(errors.confirmPassword)}
            label="Konfirmasi Password"
            rules={FORM_REQUIRED_RULE}
          />
          <Button
            onPress={handleSubmit(onConfirmChangePassword)}
            title="Ubah"
          />
        </View>
        <Button title="Keluar" onPress={onConfirmLogout} color={DANGER_COLOR} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 24,
  },
  profilePict: {
    width: 100,
    height: 100,
    borderRadius: 50,
    elevation: 5,
  },
  bioContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    ...SHADOWED_STYLE,
    marginBottom: 12,
  },
  infoLabel: {
    ...THEME.title,
    color: PRIMARY_COLOR,
    fontSize: 12,
  },
  bio: {
    ...THEME.body,
    fontSize: 14,
  },
});

export default ProfileScreen;

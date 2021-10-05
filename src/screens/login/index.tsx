import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, TextField} from '../../components';
import {
  FORM_REQUIRED_RULE,
  SHADOWED_STYLE,
  STORAGE_ACCESS_TOKEN_KEY,
} from '../../constant';
import {useLogin} from '../../hooks/api';
import {useForm} from 'react-hook-form';
import {useCallback} from 'react';
import {ListErrorDisplay} from '../../components';
import {GenerateFormError, GetApiErrorByKey} from '../../util';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '../../hooks/navigation';

const LoginScreen = () => {
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm();
  const {doFetch, error: apiErrors, isLoading} = useLogin();

  const onSubmit = useCallback(
    data => {
      doFetch({
        ...data,
        roleType: 'admin',
      }).then(res => {
        AsyncStorage.setItem(
          STORAGE_ACCESS_TOKEN_KEY,
          res?.accessToken || '',
        ).then(() => {
          navigate('DashboardScreen');
        });
      });
    },
    [doFetch],
  );

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <ListErrorDisplay errors={apiErrors?.filter(err => !err.target)} />
        <TextField
          control={control}
          label="Email"
          keyboardType="email-address"
          id="identity"
          error={
            GetApiErrorByKey('identity', apiErrors) ||
            GenerateFormError(errors.identity)
          }
          rules={FORM_REQUIRED_RULE}
        />
        <TextField
          control={control}
          secureTextEntry={true}
          label="Password"
          id="password"
          error={GenerateFormError(errors.password)}
          rules={FORM_REQUIRED_RULE}
        />
        <Button
          title="Masuk"
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  formContainer: {
    width: '100%',
    backgroundColor: 'white',
    ...SHADOWED_STYLE,
    padding: 16,
    borderRadius: 8,
  },
});

export default LoginScreen;

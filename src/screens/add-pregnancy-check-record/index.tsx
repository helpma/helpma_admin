import * as React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {SHADOWED_STYLE, THEME} from '../../constant';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button, TextField} from '../../components';
import {useForm} from 'react-hook-form';
import {GenerateFormError} from '../../util';
import {useCallback} from 'react';
import {useCreatePregnancyCheckAction} from '../../hooks/api/pregnancy-check';
import Geolocation from '@react-native-community/geolocation';
import {navigate} from '../../hooks/navigation';

const AddPregnancyCheckRecordScreen = ({
  route,
}: NativeStackScreenProps<any>) => {
  const {pregnancyCheckId, userId}: any = route.params;
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm();
  const {doFetch: createAction, isLoading} = useCreatePregnancyCheckAction();

  const onSubmit = useCallback(
    data => {
      Geolocation.getCurrentPosition(
        info => {
          createAction({
            pregnancyCheckId,
            action: data.action,
            reason: data.reason,
            recordPlaceLatitude: info.coords.latitude,
            recordPlaceLongitude: info.coords.longitude,
          })
            .then(() => {
              navigate('PregnancyCheckResultScreen', {
                pregnancyCheckId,
                userId,
              });
            })
            .catch(console.log);
        },
        err => {
          Alert.alert(
            'Gagal',
            `Data tidak dapat disimpan karena: ${err.message}`,
          );
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    },
    [createAction],
  );

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={THEME.title}>Tambah Tindak Lanjut</Text>
        <TextField
          label="Alasan"
          control={control}
          id="reason"
          rules={{required: true}}
          error={GenerateFormError(errors.reason)}
        />
        <TextField
          label="Tidak Lanjut"
          control={control}
          id="action"
          rules={{required: true}}
          error={GenerateFormError(errors.action)}
        />
        <Button
          title="Simpan"
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  formContainer: {
    ...SHADOWED_STYLE,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  name: {
    ...THEME.title,
    fontSize: 16,
  },
});

export default AddPregnancyCheckRecordScreen;

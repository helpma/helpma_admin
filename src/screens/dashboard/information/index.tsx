import * as React from 'react';
import {useForm} from 'react-hook-form';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {Button, TextField} from '../../../components';
import {SHADOWED_STYLE, THEME} from '../../../constant';
import {useBroadcastNotif} from '../../../hooks/api';
import {GenerateFormError} from '../../../util';

const InformationScreen = () => {
  const {
    control,
    formState: {errors},
    handleSubmit,
    setValue,
  } = useForm();

  const {doFetch: broadcastNotif} = useBroadcastNotif();

  const onSubmit = React.useCallback(async data => {
    await broadcastNotif(data);
    setValue('title', '');
    setValue('message', '');
    Alert.alert('Berhasil', 'Informasi berhasil dikirim!');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Kirim informasi ke seluruh pengguna pasien
      </Text>
      <View style={styles.formContainer}>
        <TextField
          label="Judul"
          control={control}
          rules={{required: true}}
          error={GenerateFormError(errors.title)}
          id="title"
        />
        <TextField
          label="Informasi"
          multiline={true}
          numberOfLines={6}
          textAlignVertical="top"
          control={control}
          rules={{required: true}}
          error={GenerateFormError(errors.message)}
          id="message"
        />
        <Button title="Kirim" onPress={handleSubmit(onSubmit)} />
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
    borderRadius: 8,
    padding: 16,
  },
  title: {
    ...THEME.body,
    fontSize: 14,
  },
});

export default InformationScreen;

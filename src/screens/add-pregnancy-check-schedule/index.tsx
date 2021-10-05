import * as React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SHADOWED_STYLE, THEME} from '../../constant';
import {useGetPersonalInformationDetail} from '../../hooks/api/personal-information';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {Button, TextField} from '../../components';
import {useForm} from 'react-hook-form';
import {formatLocalDateTime, GenerateFormError} from '../../util';
import {
  useAddPregnancyCheckSchedule,
  useUpdatePregnancyCheckSchedule,
} from '../../hooks/api/pregnancy-check';
import {navigate} from '../../hooks/navigation';

const AddPregnancyCheckScheduleScreen = ({
  route,
}: NativeStackScreenProps<any>) => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const [isDatePickerVisible, setIsDatePickerVisible] =
    useState<boolean>(false);

  const [checkDate, setCheckDate] = useState<string>('');

  const showDatePicker = useCallback(() => {
    setIsDatePickerVisible(true);
  }, []);

  const hideDatePicker = useCallback(() => {
    setIsDatePickerVisible(false);
  }, []);

  const handleConfirm = useCallback(
    date => {
      setCheckDate(date.toISOString());
      setValue('date', formatLocalDateTime(date.toISOString()));
      hideDatePicker();
    },
    [setValue, hideDatePicker],
  );

  const {
    userId,
    pregnancyCheckId,
    checkDate: checkDateParam,
  }: any = route.params;

  useEffect(() => {
    if (checkDateParam) {
      setCheckDate(checkDateParam);
      setValue('date', formatLocalDateTime(checkDateParam));
    }
  }, [checkDateParam]);

  const {data} = useGetPersonalInformationDetail(userId);
  const {doFetch: fetchCreate} = useAddPregnancyCheckSchedule();
  const {doFetch: fetchUpdate} = useUpdatePregnancyCheckSchedule(
    useMemo(() => pregnancyCheckId, [pregnancyCheckId]),
  );

  const onSubmit = useCallback(() => {
    if (!pregnancyCheckId) {
      fetchCreate({
        userId,
        date: checkDate,
      })
        .then(() => {
          navigate('PregnancyCheckDetailScreen', {
            userId,
          });
        })
        .catch(console.log);
    } else {
      fetchUpdate({
        checkDate,
      })
        .then(() => {
          navigate('PregnancyCheckResultScreen', {
            pregnancyCheckId,
            checkDate,
            userId,
          });
        })
        .catch(console.log);
    }
  }, [pregnancyCheckId, userId, checkDate, fetchUpdate, fetchCreate]);

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.name}>{data?.fullName}</Text>
        <TouchableOpacity onPress={showDatePicker}>
          <TextField
            label="Waktu Cek"
            control={control}
            rules={{
              required: true,
            }}
            id="date"
            editable={false}
            error={GenerateFormError(errors.date)}
          />
        </TouchableOpacity>
        <Button title="Simpan" onPress={handleSubmit(onSubmit)} />
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
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

export default AddPregnancyCheckScheduleScreen;

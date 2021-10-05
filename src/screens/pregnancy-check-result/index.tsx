import * as React from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {DANGER_COLOR, SHADOWED_STYLE, THEME} from '../../constant';
import {Button, TextField} from '../../components';
import {useForm} from 'react-hook-form';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  formatLocalDateTime,
  GenerateFormError,
  GetApiErrorByKey,
} from '../../util';
import {useCallback} from 'react';
import {
  useCancelPregnancyCheckSchedule,
  useCreatePregnancyCheckResult,
  useGetPregnancyCheckDetail,
  useGetPrengnacyCheckResultDetail,
  useUpdatePregnancyCheckResult,
} from '../../hooks/api/pregnancy-check';
import {navigate} from '../../hooks/navigation';
import MapView, {Marker} from 'react-native-maps';
import useOnFocusNavigation from '../../hooks/navigation/focus';

const PregnancyCheckResultScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<any>) => {
  const {pregnancyCheckId, userId}: any = route.params;
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();

  const {data: pregnancyCheckDetail, reFetch: refetchCheckDetail} =
    useGetPregnancyCheckDetail(pregnancyCheckId);
  const {doFetch: fetchCancel, isLoading: loadingCancel} =
    useCancelPregnancyCheckSchedule(pregnancyCheckId);
  const {
    doFetch: saveCheckResult,
    isLoading: loadingSaveResult,
    error,
  } = useCreatePregnancyCheckResult();

  const {data: resultDetail, reFetch: refetchCheckResult} =
    useGetPrengnacyCheckResultDetail(
      React.useMemo(() => pregnancyCheckId, [pregnancyCheckId]),
    );
  const {doFetch: updatePregnancyCheckResult} = useUpdatePregnancyCheckResult(
    React.useMemo(() => pregnancyCheckId, [pregnancyCheckId]),
  );

  useOnFocusNavigation(
    navigation,
    useCallback(() => {
      refetchCheckDetail();
      refetchCheckResult();
    }, []),
  );

  React.useEffect(() => {
    console.log({resultDetail});
    if (resultDetail) {
      setValue('weight', resultDetail.weight?.toString());
      setValue('bloodPressure', resultDetail.bloodPressure);
      setValue('lila', resultDetail.lila?.toString());
      setValue('fundusUteriHeight', resultDetail.fundusUteriHeight?.toString());
      setValue('ironTabletsAmount', resultDetail.ironTabletsAmount?.toString());
      setValue('hbAmount', resultDetail.hbAmount?.toString());
      setValue('note', resultDetail.note);
    }
  }, [resultDetail]);

  const onConfirmCancel = useCallback(() => {
    Alert.alert(
      'Konfirmasi',
      'Apakah anda yakin untuk membatalkan jadwal ini?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Lanjut',
          onPress: () => {
            fetchCancel({})
              .then(() => {
                navigate('PregnancyCheckDetailScreen', {
                  userId,
                });
              })
              .catch(console.log);
          },
        },
      ],
    );
  }, [fetchCancel, userId]);

  const onSubmitResult = useCallback(
    data => {
      const sendData: any = {
        pregnancyCheckId,
      };
      for (const i in data) {
        if (data[i]) {
          sendData[i] = data[i];
        }
      }

      if (!resultDetail?.id) {
        saveCheckResult(sendData)
          .then(() => {
            Alert.alert('Berhasil', 'Data hasil cek berhasil disimpan');
          })
          .catch(console.log);
      } else {
        updatePregnancyCheckResult(sendData)
          .then(() => {
            Alert.alert('Berhasil', 'Data hasil cek berhasil disimpan');
          })
          .catch(console.log);
      }
    },
    [saveCheckResult, pregnancyCheckId, resultDetail],
  );

  return (
    <ScrollView>
      <View style={styles.pageContainer}>
        <View style={styles.container}>
          <Text style={styles.partTitle}>Detail Jadwal Cek</Text>
          <Text style={styles.title}>
            Tanggal Cek: {formatLocalDateTime(pregnancyCheckDetail?.date)}
          </Text>
          {pregnancyCheckDetail?.status === 'WAITING' && (
            <View style={styles.detailActionContainer}>
              <View style={{...styles.actionContainer, paddingRight: 6}}>
                <Button
                  color={DANGER_COLOR}
                  title="Batalkan"
                  loading={loadingCancel}
                  onPress={onConfirmCancel}
                />
              </View>
              <View style={{...styles.actionContainer, paddingLeft: 6}}>
                <Button
                  title="Ubah"
                  onPress={() => {
                    navigate('AddPregnancyCheckScheduleScreen', {
                      userId,
                      pregnancyCheckId,
                      checkDate: pregnancyCheckDetail?.date,
                    });
                  }}
                />
              </View>
            </View>
          )}
          {pregnancyCheckDetail?.status === 'NOT_ATTENDED' && (
            <>
              <Text style={THEME.body}>
                Pasien tidak menghadiri jadwal pengecekan ini.{' '}
                {!pregnancyCheckDetail.checkAction
                  ? 'Silahkan tambah tindak lanjut (lakukan kunjungan jika diperlukan)'
                  : 'Berikut data tindak lanjut untuk jadwal pengecekan ini:'}
              </Text>
              {!pregnancyCheckDetail.checkAction ? (
                <View style={{marginTop: 12}}>
                  <Button
                    title="Tindak Lanjut"
                    onPress={() => {
                      navigate('AddPregnancyCheckRecordScreen', {
                        pregnancyCheckId,
                        userId,
                      });
                    }}
                  />
                </View>
              ) : (
                <>
                  <Text style={THEME.title}>Alasan:</Text>
                  <Text style={THEME.body}>
                    {pregnancyCheckDetail.checkAction.reason}
                  </Text>
                  <Text style={THEME.title}>Tindak Lanjut:</Text>
                  <Text style={THEME.body}>
                    {pregnancyCheckDetail.checkAction.action}
                  </Text>
                  <Text style={THEME.title}>Dicatat Oleh:</Text>
                  <Text style={THEME.body}>
                    {pregnancyCheckDetail.checkAction.createdBy.fullName}
                  </Text>
                  <Text style={THEME.title}>Lokasi Pencatatan:</Text>
                  <Text style={THEME.body}>
                    {pregnancyCheckDetail.checkAction.recordPlaceAddress}
                  </Text>
                  <MapView
                    style={{width: '100%', height: 250}}
                    region={{
                      latitude:
                        pregnancyCheckDetail.checkAction.recordPlaceLatitude,
                      longitude:
                        pregnancyCheckDetail.checkAction.recordPlaceLongitude,
                      latitudeDelta: 0.001,
                      longitudeDelta: 0.001,
                    }}
                    zoomEnabled={true}
                    zoomTapEnabled={true}
                    zoomControlEnabled={true}>
                    <Marker
                      coordinate={{
                        latitude:
                          pregnancyCheckDetail.checkAction.recordPlaceLatitude,
                        longitude:
                          pregnancyCheckDetail.checkAction.recordPlaceLongitude,
                      }}
                      title={'Alamat Pasien'}
                    />
                  </MapView>
                </>
              )}
            </>
          )}
        </View>
        {pregnancyCheckDetail?.status !== 'NOT_ATTENDED' && (
          <View style={styles.container}>
            <Text style={styles.partTitle}>Hasil Cek</Text>
            <TextField
              control={control}
              id="weight"
              rules={{required: true}}
              label="Berat Badan (kg)"
              keyboardType="number-pad"
              placeholder="70"
              error={
                GenerateFormError(errors.weight) ||
                GetApiErrorByKey('weight', error)
              }
            />
            <TextField
              control={control}
              id="bloodPressure"
              label="Tekanan Darah"
              placeholder="120/80"
              error={
                GenerateFormError(errors.bloodPressure) ||
                GetApiErrorByKey('bloodPressure', error)
              }
            />
            <TextField
              control={control}
              id="lila"
              label="LiLa (cm)"
              keyboardType="number-pad"
              placeholder="30"
              error={
                GenerateFormError(errors.lila) ||
                GetApiErrorByKey('bloodPressure', error)
              }
            />
            <TextField
              control={control}
              id="fundusUteriHeight"
              label="Tinggi Fundus Uteri (cm)"
              keyboardType="number-pad"
              placeholder="20"
              error={
                GenerateFormError(errors.fundusUteriHeight) ||
                GetApiErrorByKey('fundusUteriHeight', error)
              }
            />
            <TextField
              control={control}
              id="ironTabletsAmount"
              label="Banyak Tablet Zat Besi"
              keyboardType="number-pad"
              placeholder="1"
              error={
                GenerateFormError(errors.ironTabletsAmount) ||
                GetApiErrorByKey('ironTabletsAmount', error)
              }
            />
            <TextField
              control={control}
              id="hbAmount"
              label="Hb Amount"
              keyboardType="number-pad"
              placeholder="100"
              error={
                GenerateFormError(errors.hbAmount) ||
                GetApiErrorByKey('hbAmount', error)
              }
            />
            <TextField
              control={control}
              multiline={true}
              numberOfLines={3}
              id="note"
              label="Catatan"
              error={
                GenerateFormError(errors.note) ||
                GetApiErrorByKey('note', error)
              }
            />
            <Button
              title="Simpan"
              onPress={handleSubmit(onSubmitResult)}
              loading={loadingSaveResult}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  partTitle: {
    ...THEME.title,
    fontSize: 14,
  },
  title: {
    ...THEME.body,
    marginBottom: 8,
  },
  container: {
    backgroundColor: 'white',
    ...SHADOWED_STYLE,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  pageContainer: {
    padding: 16,
  },
  detailActionContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  actionContainer: {
    width: '50%',
  },
});

export default PregnancyCheckResultScreen;

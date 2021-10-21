import * as React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  DANGER_COLOR,
  PRIMARY_COLOR,
  SHADOWED_STYLE,
  THEME,
  WARNING_COLOR,
} from '../../constant';
import {navigate} from '../../hooks/navigation';
import {useGetUserPregnancyCheckDetail} from '../../hooks/api/pregnancy-check';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PregnancyCheck} from '../../types';
import {formatLocalDate, formatLocalDateTime} from '../../util';
import {Button} from '../../components';
import useOnFocusNavigation from '../../hooks/navigation/focus';

const COLOR_BY_STATUS = {
  NOT_ATTENDED: DANGER_COLOR,
  ATTENDED: PRIMARY_COLOR,
  WAITING: WARNING_COLOR,
};

const PregnancyCheckDetailScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<any>) => {
  const {userId}: any = route.params;
  const {data, reFetch} = useGetUserPregnancyCheckDetail(userId);

  useOnFocusNavigation(navigation, reFetch);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>JADWAL CEK KEHAMILAN</Text>
        <View style={styles.jadwalkanContainer}>
          <View style={styles.jadwalkanButton}>
            <Button
              title="+ Jadwalkan"
              onPress={() => {
                navigate('AddPregnancyCheckScheduleScreen', {
                  userId,
                });
              }}
            />
          </View>
        </View>
        {data?.checkDates.map((item: PregnancyCheck, key: number) => (
          <TouchableOpacity
            key={key}
            onPress={() => {
              navigate('PregnancyCheckResultScreen', {
                pregnancyCheckId: item.id,
                checkDate: item.date,
                userId,
              });
            }}>
            <View style={styles.infoContainer}>
              <View style={{flexGrow: 1}}>
                <Text style={styles.infoLabel}>Jadwal Cek ke - {key + 1}</Text>
                <Text style={styles.infoValue}>
                  {formatLocalDateTime(item.date)}
                </Text>
                <Text style={styles.infoValueSecond}>
                  Batas Akhir: {formatLocalDate(item.dateEnd)}
                </Text>
              </View>
              <View
                style={{
                  ...styles.statusContainer,
                  backgroundColor: `${COLOR_BY_STATUS[item.status]}77`,
                  borderColor: COLOR_BY_STATUS[item.status],
                }}>
                <Text style={styles.status}>{item.status}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    padding: 6,
    borderRadius: 4,
    borderWidth: 1,
    height: 28,
  },
  jadwalkanContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  jadwalkanButton: {
    width: 140,
  },
  status: {
    fontSize: 10,
    color: 'white',
  },
  title: {
    ...THEME.title,
    fontSize: 18,
    marginBottom: 12,
  },
  container: {
    padding: 24,
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
    shadowColor: 'grey',
  },
  infoContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
    ...SHADOWED_STYLE,
    display: 'flex',
    flexDirection: 'row',
  },
  infoLabel: {
    ...THEME.title,
    color: PRIMARY_COLOR,
    fontSize: 12,
  },
  infoValue: {
    ...THEME.body,
    fontSize: 16,
  },
  infoValueSecond: {
    ...THEME.body,
    fontSize: 12,
    color: 'grey',
  },
  bio: {
    ...THEME.body,
    fontSize: 14,
  },
});
export default PregnancyCheckDetailScreen;

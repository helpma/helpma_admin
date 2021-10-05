import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR, TEXT_PRIMARY_COLOR, THEME} from '../../../../constant';
import {UserPregnancyCheckSummary} from '../../../../types';

interface PregnancyCheckCardProps {
  data: UserPregnancyCheckSummary;
}

const PregnancyCheckCard: React.FC<PregnancyCheckCardProps> = ({data}) => {
  return (
    <View style={styles.container}>
      <Image
        source={
          data?.user?.profilePict
            ? {uri: data?.user?.profilePict}
            : require('../../../../images/Portrait_Placeholder.png')
        }
        style={styles.profilePict}
      />
      <View style={styles.descContainer}>
        <Text style={styles.titleText}>{data?.user.fullName}</Text>
        <Text style={styles.descText}>
          <McIcon name="clipboard-list" color={TEXT_PRIMARY_COLOR} />
          &nbsp; Total Jadwal Cek:{' '}
          <Text style={THEME.title}>{data.totalCheckSchedule}</Text>
        </Text>
        <Text style={styles.descText}>
          <IonIcon name="checkmark-done" color={PRIMARY_COLOR} />
          &nbsp; Total Selesai:{' '}
          <Text style={THEME.title}>{data.totalAttendedSchedule}</Text>
        </Text>
        <Text style={styles.descText}>
          <McIcon name="cancel" color={'red'} />
          &nbsp; Total Tidak dihadiri:{' '}
          <Text style={THEME.title}>{data.totalNotAttendedSchedule}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'white',
    marginBottom: 12,
  },
  descContainer: {
    paddingLeft: 12,
  },
  titleText: {
    fontSize: 16,
    color: TEXT_PRIMARY_COLOR,
    ...THEME.title,
  },
  descText: {
    fontSize: 12,
    justifyContent: 'center',
    color: TEXT_PRIMARY_COLOR,
    ...THEME.body,
  },
  profilePict: {
    width: 70,
    height: 70,
    borderRadius: 35,
    shadowColor: 'grey',
  },
});

export default PregnancyCheckCard;

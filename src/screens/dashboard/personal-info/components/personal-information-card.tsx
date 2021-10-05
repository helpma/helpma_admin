import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EnTypoIcon from 'react-native-vector-icons/Entypo';
import {
  PRIMARY_COLOR,
  SHADOWED_STYLE,
  TEXT_PRIMARY_COLOR,
  THEME,
} from '../../../../constant';
import {UserPersonalInformation} from '../../../../types';

interface PersonalInformationCardProps {
  data: UserPersonalInformation;
}

const PersonalInformationCard: React.FC<PersonalInformationCardProps> = ({
  data,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={
          data.profilePict
            ? {uri: data.profilePict}
            : require('../../../../images/Portrait_Placeholder.png')
        }
        style={styles.profilePict}
      />
      <View style={styles.descContainer}>
        <Text style={styles.titleText}>{data.fullName}</Text>
        <Text style={styles.descText}>
          <Icon name="email" color={PRIMARY_COLOR} />
          &nbsp; {data.email || '-'}
        </Text>
        <Text style={styles.descText}>
          <Icon name="phone" color={PRIMARY_COLOR} />
          &nbsp; {data.phoneNumber || '-'}
        </Text>
        <Text style={styles.descText}>
          <EnTypoIcon name="address" color={PRIMARY_COLOR} />
          &nbsp; {data.address || '-'}
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
    ...SHADOWED_STYLE,
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

export default PersonalInformationCard;

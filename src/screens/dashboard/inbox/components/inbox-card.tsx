import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import EnTypoIcon from 'react-native-vector-icons/Entypo';
import {
  PRIMARY_COLOR,
  SHADOWED_STYLE,
  TEXT_PRIMARY_COLOR,
  THEME,
} from '../../../../constant';
import {Inbox} from '../../../../types';
import {formatLocalDate} from '../../../../util';

interface PersonalInformationCardProps {
  data: Inbox;
}

const InboxCard: React.FC<PersonalInformationCardProps> = ({data}) => {
  return (
    <View style={styles.container}>
      <Image
        source={
          data.lastMessage.sender?.profilePict
            ? {uri: data.lastMessage.sender?.profilePict}
            : require('../../../../images/Portrait_Placeholder.png')
        }
        style={styles.profilePict}
      />
      <View style={styles.descContainer}>
        <Text style={styles.titleText}>
          {data.lastMessage.sender?.fullName}
        </Text>
        <Text style={styles.descText}>{data.lastMessage.message || '-'}</Text>
        <Text style={styles.descText}>
          <Icon name="time" color={PRIMARY_COLOR} />
          &nbsp;{' '}
          {data.lastMessage.createdAt
            ? formatLocalDate(data.lastMessage.createdAt)
            : '-'}
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

export default InboxCard;

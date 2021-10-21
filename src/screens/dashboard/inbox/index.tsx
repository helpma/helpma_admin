import * as React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {navigate} from '../../../hooks/navigation';
import {useCreateInbox, useGetMyInbox} from '../../../hooks/api/chat';
import InboxCard from './components/inbox-card';
import {useCallback} from 'react';
import {useGetMyPersonalInformation} from '../../../hooks/api/personal-information';
import useOnFocusNavigation from '../../../hooks/navigation/focus';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { useNotification } from '../../../hooks/notification';

const InboxScreen = ({navigation}: NativeStackScreenProps<any>) => {
  const {incomingMessage} = useNotification();

  const {data, reFetch} = useGetMyInbox();
  const {doFetch: createInbox} = useCreateInbox();
  const {data: myInfo} = useGetMyPersonalInformation();

  useOnFocusNavigation(navigation, reFetch);

  const onRedirect = useCallback(
    (userId: string, phoneNumber: string | undefined) => {
      createInbox({
        userId,
      })
        .then(res => {
          navigate('ChatScreen', {
            roomId: res?.id,
            userId: myInfo?.id,
            phoneNumber,
          });
        })
        .catch(console.log);
    },
    [createInbox, myInfo],
  );

  React.useEffect(() => {
    if (incomingMessage) {
      const {data} = incomingMessage;
      if (data.eventType === 'CHAT') {
        reFetch();
      }
    }
  }, [incomingMessage]);

  return (
    <View style={{paddingHorizontal: 16, paddingVertical: 12}}>
      <FlatList
        data={data?.list || []}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              onRedirect(
                item.lastMessage.sender.id,
                item.lastMessage.sender.phoneNumber,
              );
            }}>
            <InboxCard data={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default InboxScreen;

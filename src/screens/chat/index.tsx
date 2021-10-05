import * as React from 'react';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {
  useGetInboxMessages,
  useGetChatPartnerInfo,
  useSendChat,
} from '../../hooks/api';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Alert,
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import useOnFocusNavigation from '../../hooks/navigation/focus';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {PRIMARY_COLOR, SHADOWED_STYLE} from '../../constant';

const ChatAvatarPlaceholder = () => {
  return (
    <Image
      source={require('../../images/Portrait_Placeholder.png')}
      style={{
        width: 50,
        height: 50,
        borderRadius: 25,
        shadowColor: 'grey',
        alignSelf: 'flex-start',
      }}
    />
  );
};

const ChatScreen: React.FC<NativeStackScreenProps<any>> = ({
  route,
  navigation,
}) => {
  const {roomId, userId, phoneNumber}: any = route.params;

  const [messages, setMessages] = useState<IMessage[]>([]);
  const {data: inboxResponse, reFetch} = useGetInboxMessages(
    useMemo(() => roomId, [roomId]),
  );
  const {doFetch: sendChat} = useSendChat();

  useOnFocusNavigation(navigation, reFetch);
  useEffect(() => {
    if (inboxResponse && inboxResponse.list.length > 0) {
      setMessages(
        inboxResponse.list.map(item => ({
          _id: item.id,
          text: item.message,
          createdAt: new Date(item.createdAt!),
          user: {
            _id: item.sender.id,
            name: item.sender.fullName,
            avatar: !item.sender.profilePict
              ? () => <ChatAvatarPlaceholder />
              : item.sender.profilePict,
          },
        })),
      );
    }
  }, [inboxResponse]);

  const onSend = useCallback(
    (messages = []) => {
      sendChat({
        message: messages[0].text,
        messageType: 'TEXT',
        roomId,
      })
        .then(() => {
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
          );
        })
        .catch(console.log);
    },
    [sendChat, roomId],
  );

  const onConfirmCall = useCallback(() => {
    Alert.alert(
      'Konfirmasi',
      `Anda akan menghubungi ${phoneNumber} via telepon device anda. Apakah anda yakin untuk melanjutkan?`,
      [
        {
          text: 'Batal',
        },
        {
          text: 'Lanjut',
          onPress: () => {
            Linking.openURL(`tel:${phoneNumber}`);
          },
        },
      ],
    );
  }, [phoneNumber]);

  return (
    <>
      {!!phoneNumber && (
        <View style={styles.phoneContainer}>
          <TouchableOpacity onPress={onConfirmCall}>
            <MaterialIcon name="phone" color={PRIMARY_COLOR} size={20} />
          </TouchableOpacity>
        </View>
      )}
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: userId,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  phoneContainer: {
    ...SHADOWED_STYLE,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'flex-end',
  },
});

export default ChatScreen;

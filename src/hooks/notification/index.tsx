import * as React from 'react';
import messaging from '@react-native-firebase/messaging';

const {useEffect, useState, createContext, Component, useContext} = React;
interface IncomingMessage {
  data: any;
  timestamp: Date;
}

interface NotificationContextProps {
  incomingMessage?: IncomingMessage;
}

const NotificationContext = createContext<NotificationContextProps>({});

export const WithNotification: React.FC = ({children}) => {
  const [incomingMessage, setIncomingMessage] = useState<IncomingMessage>();

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setIncomingMessage({
        data: remoteMessage.data,
        timestamp: new Date(),
      });
    });

    return unsubscribe;
  }, []);

  return (
    <NotificationContext.Provider value={{incomingMessage}}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);

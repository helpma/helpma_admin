import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';

const useOnFocusNavigation = (
  navigation: NativeStackNavigationProp<any>,
  cb: () => void,
) => {
  const [focusCount, setFocusCount] = useState<number>(0);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (focusCount > 0) {
        cb();
      }
      setFocusCount(focusCount + 1);
    });

    return unsubscribe;
  }, [focusCount]);
};

export default useOnFocusNavigation;

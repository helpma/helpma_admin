import * as React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ButtonProps as BaseButtonProps,
  Text,
  ActivityIndicator,
} from 'react-native';
import {PRIMARY_COLOR, THEME} from '../constant';

interface ButtonProps extends BaseButtonProps {
  loading?: boolean;
  color?: string;
}

export const Button: React.FC<ButtonProps> = ({
  color,
  loading,
  title,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          ...buttonStyles.container,
          backgroundColor: color || PRIMARY_COLOR,
        }}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={buttonStyles.buttonTitle}>{title.toUpperCase()}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const buttonStyles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonTitle: {
    ...THEME.title,
    fontSize: 14,
    color: 'white',
  },
});

interface LoadMoreButtonProps {
  onPress: () => void;
}

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={loadMoreStyles.container}>
        <Text style={loadMoreStyles.loadMore}>Load More</Text>
      </View>
    </TouchableOpacity>
  );
};

const loadMoreStyles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  loadMore: {
    ...THEME.body,
    fontSize: 11,
    color: PRIMARY_COLOR,
  },
});

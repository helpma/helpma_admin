import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DANGER_COLOR, SHADOWED_STYLE, THEME} from '../constant';
import {ApiError} from '../types';

interface ListErrorDisplayProps {
  errors?: ApiError[];
}
export const ListErrorDisplay: React.FC<ListErrorDisplayProps> = ({errors}) => {
  return !!errors && errors!.length > 0 ? (
    <View style={listErrorStyles.container}>
      <Text style={listErrorStyles.title}>Terjadi beberapa kesalahan:</Text>
      {errors.map((err: ApiError, key: number) => (
        <Text style={listErrorStyles.errorText} key={key}>
          &#8226; {err.message}
        </Text>
      ))}
    </View>
  ) : null;
};

const listErrorStyles = StyleSheet.create({
  container: {
    backgroundColor: DANGER_COLOR,
    borderWidth: 1,
    borderColor: DANGER_COLOR,
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    ...SHADOWED_STYLE,
  },
  title: {
    ...THEME.body,
    color: 'white',
    fontSize: 9,
  },
  errorText: {
    ...THEME.body,
    color: 'white',
    fontSize: 10,
  },
});

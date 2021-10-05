import * as React from 'react';
import {StyleSheet, TextInput, Text, TextInputProps, View} from 'react-native';
import {DANGER_COLOR, TEXT_PRIMARY_COLOR, THEME} from '../constant';
import {Control, Controller, RegisterOptions} from 'react-hook-form';
import {useMemo} from 'react';
interface TextFieldProps extends TextInputProps {
  label: string;
  error?: string;
  control: Control;
  rules?: RegisterOptions;
  id: string;
  value?: string;
}
export const TextField: React.FC<TextFieldProps> = ({
  error,
  label,
  control,
  rules,
  id,
  value: valueProps,
  ...props
}) => {
  const isFieldRequired = useMemo<boolean>(() => {
    return !!rules?.required;
  }, [rules]);

  return (
    <View>
      <Text style={textFieldStyles.label}>
        {label}
        {isFieldRequired && <Text style={{color: DANGER_COLOR}}>&nbsp;*</Text>}
      </Text>
      <Controller
        control={control}
        rules={rules || {}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            {...props}
            style={textFieldStyles.input}
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
          />
        )}
        name={id}
        defaultValue={valueProps}
      />
      {!!error && <Text style={textFieldStyles.error}>{error}</Text>}
    </View>
  );
};

const textFieldStyles = StyleSheet.create({
  label: {
    ...THEME.body,
    fontSize: 10,
  },
  error: {
    ...THEME.body,
    fontSize: 9,
    color: DANGER_COLOR,
    marginTop: -8,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: TEXT_PRIMARY_COLOR,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
});

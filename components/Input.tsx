import React from 'react';

import { Colors, Typography } from '@/Theme';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';
import { ErrorMessage } from './ErrorMessage';

type Props = {
  name?: string;
  message?: string;
  onChange?: (text: string, key: string) => void;
  value?: string;
  inputProps?: TextInputProps;
  style?: TextStyle;
};

export const Input = (props: Props) => {
  const onChangeText =(text:string)=>{
     if(props?.name && props?.onChange){
      props?.onChange(props?.name,text)
     }
     return undefined
  }
  return (
    <View style={styles.top}>
      <TextInput
        style={[styles.input, props.style]}
        placeholderTextColor={Colors.textSecondary}
        defaultValue={props.value}
        onChangeText={onChangeText}
        {...props.inputProps}
      />
      <ErrorMessage value={props.message} />
    </View>
  );
};

const styles = StyleSheet.create({
  top: { marginTop: 5 },
  input: {
    ...Typography.body,
    width: '100%',
    height: 50,
    backgroundColor: '#F9FAFB', // Very light gray for input background
    borderRadius: 10,
    paddingHorizontal: 15,
    color: Colors.black,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#E5E7EB', // Light border
  },
});

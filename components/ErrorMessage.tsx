import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography } from '@/Theme';

export const ErrorMessage = ({ value }: { value?: string }) => {
  if (value) {
    return (
      <View style={style.view}>
        <Text style={style.text}>{value}</Text>
      </View>
    );
  }
  return null;
};

const style = StyleSheet.create({
  view: {
    marginLeft: 10,
    marginVertical: 3,
  },
  text: {
    ...Typography.small,
    color: Colors.error,
    fontSize: 12,
  },
});

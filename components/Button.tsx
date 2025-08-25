import { BorderRadius, Colors, Spacing, Typography } from "@/Theme";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  style?: ViewStyle;
  icon?: React.ReactElement;
  disabled?: boolean;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = "primary",
  style,
  icon,
  disabled,
  loading,
}) => {
  if (loading) {
    return (
      <View style={styles.button}>
        <ActivityIndicator size={'small'}/>
      </View>
    );
  }
  const isPrimary = variant === "primary";

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        isPrimary ? styles.primary : styles.secondary,
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          isPrimary ? styles.labelPrimary : styles.labelSecondary,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    minWidth: 160,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.large,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing.sm,
  },
  primary: {
    backgroundColor: Colors.buttonBg,
  },
  secondary: {
    backgroundColor: Colors.gray,
  },
  label: {
    ...Typography.body,
    fontFamily: "Inter-Medium",
  },
  labelPrimary: {
    color: Colors.black,
  },
  labelSecondary: {
    color: Colors.textPrimary,
  },
});

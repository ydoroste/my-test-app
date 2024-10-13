import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TextInputProps,
} from "react-native";
import React, { useState } from "react";

interface ITextInputProps extends TextInputProps {
  label: string;
  placeholder?: string;
  value: string;
}
export function ITextInput({
  label,
  placeholder,
  value,
  ...prp
}: ITextInputProps) {
  const [focused, setFocused] = useState(false);
  return (
    <View
      style={[styles.textinput, { borderColor: focused ? "blue" : "black" }]}
    >
      <TextInput
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        placeholder={placeholder}
        {...prp}
      />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textinput: {
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: "center",
    marginTop: 10,
  },
  label: {
    position: "absolute",
    top: -10,
    left: 10,
    paddingHorizontal: 5,
    backgroundColor: "white",
  },
});

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
export default function Splash() {
  return (
    <View style={styles.container}>
      {/* <Stack.Screen> */}
      <Text>splash1</Text>
      {/* </Stack.Screen> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

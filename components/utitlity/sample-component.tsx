import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

export function SampleComponent() {
  const [count, setCount] = useState(0);

  const handleChangeCount = () => {
    setCount((c) => c + 1);
  };
  useEffect(() => {
    setTimeout(() => {
      setCount(1000);
    }, 1000);
  }, [count]);

  return (
    <View style={styles.container}>
      <Text>count:{count}</Text>
      <TouchableOpacity onPress={handleChangeCount}>
        <Text>press</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

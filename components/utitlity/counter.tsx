import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

export default function Counter() {
  const [count, setCounter] = useState(10);
  useEffect(() => {
    let timeout = null;
    timeout = setTimeout(() => {
      if (count > 0) {
        setCounter((s) => s - 1);
      } else {
        clearTimeout(timeout);
      }
    }, 1000);
    // return () => clearTimeout(timeout);
  }, [count]);
  return (
    <View>
      {count == 0 ? (
        <TouchableOpacity onPress={() => setCounter(10)}>
          <Text>resend</Text>
        </TouchableOpacity>
      ) : (
        <Text>{count}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});

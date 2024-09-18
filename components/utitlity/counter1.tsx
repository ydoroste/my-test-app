import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

export function Counter() {
  const [counter, setCounter] = useState(10);

  useEffect(() => {
    let timeout;
    timeout = setTimeout(() => {
      if (counter === 0) {
        clearTimeout(timeout);
      } else {
        setCounter((s) => s - 1);
      }
    }, 1000);
  }, [counter]);
  return (
    <View>
      {counter == 0 ? (
        <TouchableOpacity onPress={() => setCounter(10)}>
          <Text>resend</Text>
        </TouchableOpacity>
      ) : (
        <Text>{counter}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});

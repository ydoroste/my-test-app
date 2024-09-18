import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { ITextInput } from "../utitlity";

export function LoginComponent() {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.card}>
          <Text>start your jurny</Text>
          <Text style={styles.titleText}>signup to inside box</Text>
          <ITextInput placeholder="email" label="E-mail" />
          <ITextInput placeholder="password" label="Password" />
          <TouchableOpacity style={styles.loginBtn}>
            <Text style={{ color: "white" }}>login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text>not have account?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
  },
  card: {
    width: "100%",
  },
  titleText: {
    fontWeight: "bold",
    marginVertical: 10,
  },
  textinput: {
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  label: {
    position: "absolute",
    top: -10,
    left: 10,
    paddingHorizontal: 5,
    backgroundColor: "white",
  },
  loginBtn: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4F75FF",
    marginTop: 10,
    borderRadius: 5,
  },
});

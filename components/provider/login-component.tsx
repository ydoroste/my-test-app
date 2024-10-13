import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ITextInput } from "../utitlity";
import auth from "@react-native-firebase/auth";

export function LoginComponent() {
  const [state, setState] = useState({
    email: "",
    password: "",
    tab: "login",
    error: "",
  });

  const onlogin = () => {
    if (!state.email || !state.password) return;
    try {
      // console.log(state.email, state.password, "email & password");
      auth()
        .signInWithEmailAndPassword(state.email, state.password)
        .then((res) => {
          console.log(res, "response");
          console.log("User account created & signed in!");
        })
        .catch((error) => {
          console.log(error, "error----");
          setState((s) => ({ ...s, error: "user dosnot exists!" }));

          console.error(error);
        });
    } catch (e) {
      console.log(e, "error in catch");
    }
  };
  const onSignup = () => {
    if (!state.email && !state.password) return;
    try {
      // console.log(state.email, state.password, "email & password");
      auth()
        .createUserWithEmailAndPassword(state.email, state.password)
        .then((res) => {
          console.log(res, "response");
          console.log("User account created & signed in!");
        })
        .catch((error) => {
          console.log(error, "error----");
          if (error.code === "auth/email-already-in-use") {
            setState((s) => ({ ...s, error: "user exists!!" }));
          }

          if (error.code === "auth/invalid-email") {
            console.log("That email address is invalid!");
            setState((s) => ({
              ...s,
              error: "That email address is invalid!",
            }));
          }

          console.error(error);
        });
    } catch (e) {
      console.log(e, "error in catch");
    }
  };

  const onPressBtn = () => {
    if (state.tab == "login") {
      onlogin();
    } else {
      onSignup();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.card}>
          <Text>start your jurny</Text>
          <Text style={styles.titleText}>signup to inside box</Text>
          <ITextInput
            onChangeText={(text) => setState((s) => ({ ...s, email: text }))}
            value={state.email}
            placeholder="email"
            label="E-mail"
          />
          <ITextInput
            onChangeText={(text) => setState((s) => ({ ...s, password: text }))}
            value={state.password}
            placeholder="password"
            label="Password"
          />
          {state.error && <Text style={{ color: "red" }}>{state.error}</Text>}
          <TouchableOpacity onPress={onPressBtn} style={styles.loginBtn}>
            <Text style={{ color: "white" }}>
              {" "}
              {state.tab == "login" ? "login" : "signup"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={() =>
          setState((s) => ({
            ...s,
            tab: s.tab === "login" ? "signup" : "login",
          }))
        }
      >
        <Text>
          {state.tab == "login" ? "not have account?" : "have account?"}
        </Text>
      </TouchableOpacity>
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

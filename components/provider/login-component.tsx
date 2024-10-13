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
import database from "@react-native-firebase/database";

export function LoginComponent() {
  const [initializing, setInitializing] = useState(false);
  const [user, setUser] = useState();
  const [state, setState] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
  });
  function onAuthStateChanged(user) {
    console.log(user, "user----");
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onlogin = () => {
    if (!state.email || !state.password) return;
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
            auth()
              .signInWithEmailAndPassword(state.email, state.password)
              .then((res) => {
                console.log(res, "response of sign in");
              });
          }

          if (error.code === "auth/invalid-email") {
            console.log("That email address is invalid!");
          }

          console.error(error);
        });
    } catch (e) {
      console.log(e, "error in catch");
    }
  };

  const handleSaveUser = () => {
    database().ref(`posts/${user.uid}`).remove();
    return;
    database()
      .ref(`users/${user.uid}`)
      .set({
        name: state.name,
        age: state.age,
      })
      .then((res) => {
        console.log(res, "response of set user");
      });
  };
  const handleLogOut = () => {
    auth()
      .signOut()
      .then((res) => {
        setUser(null);
      });
  };
  if (!!user)
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.card}>
            <ITextInput
              onChangeText={(text) => setState((s) => ({ ...s, name: text }))}
              value={state.name}
              placeholder="name"
              label="Name"
            />
            <ITextInput
              onChangeText={(text) => setState((s) => ({ ...s, age: text }))}
              value={state.age}
              placeholder="age"
              label="Age"
            />
            <TouchableOpacity onPress={handleSaveUser} style={styles.loginBtn}>
              <Text style={{ color: "white" }}>set</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={handleLogOut}>
          <Text>sign out</Text>
        </TouchableOpacity>
      </View>
    );
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
            value={state.email}
            placeholder="password"
            label="Password"
          />
          <TouchableOpacity onPress={onlogin} style={styles.loginBtn}>
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

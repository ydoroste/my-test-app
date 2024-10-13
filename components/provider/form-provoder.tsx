import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ITextInput } from "../utitlity";
import auth from "@react-native-firebase/auth";
import db, { firebase } from "@react-native-firebase/database";
import firestore from "@react-native-firebase/firestore";

export function FormProvider() {
  const [state, setState] = useState({
    title: "",
    description: "",
  });
  const handleLogOut = () => {
    auth().signOut();
  };

  const onPressSet = () => {
    if (!state.title && !state.description) return;
    firestore()
      .collection("posts")
      .add({
        title: state.title,
        description: state.description,
      })
      .then(() => {
        console.log("User added!");
        setState((s) => ({ ...s, title: "", description: "" }));
      });
  };
  useEffect(() => {
    firestore()
      .collection("posts")
      .get()
      .then((querySnapshot) => {
        console.log("Total posts: ", querySnapshot.size);
        let data = [];
        querySnapshot.forEach((documentSnapshot) => {
          data.push({ ...documentSnapshot.data(), id: documentSnapshot.id });
          console.log(
            "post ID: ",
            documentSnapshot.id,
            documentSnapshot.data()
          );
        });
        console.log(data, "data-----");
      });
    // console.log(usersCollection, "users collection---");
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <ITextInput
          onChangeText={(text) => setState((s) => ({ ...s, title: text }))}
          value={state.title}
          label="Title"
          placeholder="title"
        />
        <ITextInput
          onChangeText={(text) =>
            setState((s) => ({ ...s, description: text }))
          }
          value={state.description}
          label="Description"
          placeholder="description"
        />
      </View>
      <TouchableOpacity onPress={onPressSet}>
        <Text>set</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleLogOut}>
          <Text>signout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "100%",
    paddingHorizontal: 20,
  },
  footer: {
    // flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "flex-start",
    marginTop: 100,
    justifyContent: "flex-end",
  },
});

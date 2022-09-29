import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { Image, Input, Button } from "react-native-elements";
import { updateProfile } from "firebase/auth";
import { db, auth, storage } from "../firebase";
import { StatusBar } from "expo-status-bar";
import { doc, setDoc } from "firebase/firestore";
import firebase from "firebase/compat/app";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
    });
  }, [navigation]);

  const register = async () => {
    const file = imageUrl;
    const res = auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        console.log("Sign up ", authUser);
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            imageUrl ||
            "https://cdn.nerdschalk.com/wp-content/uploads/2020/09/how-to-remove-profile-picture-on-zoom-12.png",
        });
      })
      .catch((error) => alert(error.message));
    const date = new Date().getTime();
    const storageRef = ref(storage, `${name + date}`);
    try {
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //create user on firestore
            await setDoc(doc(db, "users", auth.currentUser.uid), {
              uid: auth.currentUser.uid,
              name: name,
              email,
              imageUrl:
                "https://cdn.nerdschalk.com/wp-content/uploads/2020/09/how-to-remove-profile-picture-on-zoom-12.png",
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", auth.currentUser.uid), {});

            //Update profile
            updateProfile(auth.user, {
              // name: name,
              // uid:auth.user.uid,//FIXME:
              email,
              imageUrl: imageUrl,
            });
          } catch (err) {
            console.log("1" + err);
          }
        });
      });
    } catch (err) {
      console.log("2", err);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="light" />
      <Input
        title="Full Name"
        placeholder="Full Name"
        autoFocus
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Input
        title="Email ID"
        placeholder="Email ID"
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />
      <Input
        title="Password"
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Input
        title="Image Url"
        placeholder="Image URL"
        value={imageUrl}
        onChangeText={(text) => setImageUrl(text)}
      />
      <Button
        title="Sign Up"
        containerStyle={styles.button}
        onPress={register}
      />
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    marginTop: 25,
    padding: 5,
    alignItems: "center",
    alignContent: "center",
  },
  button: {
    borderRadius: 99,
    width: 250,
  },
});

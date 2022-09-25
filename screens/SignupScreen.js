import React, { useState, useLayoutEffect } from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { Image, Input, Button } from "react-native-elements";
import { auth } from "../firebase";
import { StatusBar } from "expo-status-bar";

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

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            imageUrl ||
            "https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/",
        });
      })
      .catch((error) => alert(error.message));
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
        onChangeText={(text) => setEmail(text)}
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
        containerStyle={styles.button}
        onPress={register}
        title="Sign Up"
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

import React, { useState } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { Image, Input, Button } from "react-native-elements";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

const SignupScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const register = () => {
    // auth.createUserWithEmailAndPassword(email, password)
    // .then(authUser=>{
    //   authUser.user.update({
    //     displayName:name,
    //     photoURL:imageUrl||"https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw2Y1BE8KCKBiB7C7nSINeIp&ust=1664089738396000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPDymb_vrPoCFQAAAAAdAAAAABAE",
    //   })
    // })
    // .catch((error)=>alert(error.message))
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
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
        onPressed={register}
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

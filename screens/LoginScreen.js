import React from "react";
import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Image, Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   const unSubscribe = auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       navigation.replace("Home");
  //     }
  //   });
  //   return unSubscribe;
  // }, []);

  return (
    <KeyboardAvoidingView //FIXME: screen not going up when keyboard comes up
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar style="auto" />
      <Text containerStyle={styles.t}>Welcome to Viper!!!</Text>
      <Text containerStyle={styles.t}>Sign In</Text>
      <Image
        source={require("../Images/chat_logo.png")}
        style={{ width: 200, height: 200 }}
        containerStyle={styles.img}
      />
      <View>
        <Input
          containerStyle={styles.ip}
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          containerStyle={styles.ip}
          secureTextEntry
          placeholder="Password"
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View>
        <Button containerStyle={[styles.loginButton, styles.l]} title="Login" />
        <Button
          containerStyle={[styles.loginButton, styles.l]}
          icon={<Icon name="google" size={15} color="black" />}
          title="SIGN IN WITH GOOGLE"
          buttonStyle={{
            backgroundColor: "white",
            borderColor: "black",
          }}
          titleStyle={{ color: "black" }}
        />
        <Button
          onPress={() => navigation.navigate("Signup")}
          title="SIGN UP WITH EMAIL"
          icon={<Icon name="facebook" size={15} color="black" />}
          containerStyle={[styles.loginButton, styles.l]}
          buttonStyle={{
            backgroundColor: "white",
            borderColor: "black",
          }}
          titleStyle={{ color: "black" }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin: 10,
    alignItems: "center",
  },
  img: {
    marginTop: 21,
    margin: 18,
  },
  t: {
    fontWeight: "bold",
    fontSize: 30,
  },
  ip: {
    width: 250,
  },
  l: {
    margin: 5,
  },
  loginButton: {
    borderRadius: 99,
    width: 250,
  },
});
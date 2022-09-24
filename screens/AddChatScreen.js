import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Button, Input } from "react-native-elements";
import { db } from "../firebase";

const AddChat = ({ navigation }) => {
  const [input, setInput] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Enter new chat name",
      headerBackTitle: "Chats",
    });
  }, [navigation]);

  const submit = async () => {
    await db
      .collection("chats")
      .add({
        chatName: input,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => alert(error));
  };
  return (
    <View>
      <Text style={{ fontSize: "24" }}>Enter new chat name</Text>
      <Input
        placeholder="new chat name"
        value={input}
        onChangeText={(text) => setInput(text)}
      ></Input>
      <Button title={"Submit"} onPress={submit}></Button>
    </View>
  );
};

export default AddChat;

const styles = StyleSheet.create({});

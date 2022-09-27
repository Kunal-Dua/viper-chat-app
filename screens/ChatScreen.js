import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect, useState } from "react";
import { Avatar } from "react-native-elements";
import { AntDesign, SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import firebase from "firebase/compat/app";
import { auth, db } from "../firebase";
import {
  onSnapshot,
  doc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const currentUser = auth.currentUser;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={styles.headerTitle}>
          <Avatar
            rounded
            source={{
              uri: route.params.imageUrl,
            }}
          />
          <Text style={{ fontSize: "24",marginLeft:14,color:"white" }}>{route.params.chatName}</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const sendMessage = async () => {
    setInput("");
    await updateDoc(doc(db, "chats", route.params.id), {
      messages: arrayUnion({
        senderId: currentUser.uid,
        name: currentUser.displayName,
        timestamp: Timestamp.now(),
        message: input,
      }),
    });
    Keyboard.dismiss();
  };

  useLayoutEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "chats", route.params.id), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return unsubscribe;
  }, [route.params.id]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={100}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView>
              {messages.map((data) =>
                currentUser.uid === data.senderId ? (
                  <View style={styles.user}>
                    <Text style={styles.userText}>{data.message}</Text>
                  </View>
                ) : (
                  <View style={styles.talkingTo}>
                    <Text style={styles.talkingToText}>{data.message}</Text>
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                value={input}
                onChangeText={(text) => setInput(text)}
                placeholder={"Enter message"}
                style={styles.textInput}
              />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name="send" size={24} color="#2B68E6" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin:10,
  },
  user: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  talkingTo: {
    padding: 15,
    backgroundColor: "#00FF00",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  userText: {},
  talkingToText: {},
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    borderWidth: 3,
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
});

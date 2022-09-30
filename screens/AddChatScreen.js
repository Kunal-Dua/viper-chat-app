import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Avatar, Button, Input } from "react-native-elements";
import {
  collection,
  query,
  doc,
  where,
  getDocs,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../firebase";

const AddChat = ({ navigation }) => {
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  const currentUser = auth.currentUser;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Enter new chat name",
      headerBackTitle: "Chats",
    });
  }, [navigation]);

  const submit = async () => {
    try {
      const q = query(collection(db, "users"), where("email", "==", input));
      console.log(q);
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      console.error(error);
    }
  };
  console.log("user " + user);
  const handleAddUser = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    console.log("in handdle add user");
    console.log("combinedId " + combinedId);
    console.log("currentUser.uid " + currentUser.uid);
    console.log("user.uid " + user.uid);
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        console.log("doing current");

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            name: user.name,
            imageUrl: user.imageUrl,
            combinedId: combinedId,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            name: currentUser.displayName,
            imageUrl: currentUser.photoURL,
            combinedId: combinedId,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
      alert("Added " + user.name);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: "24" }}>Enter email address</Text>
      <Input
        placeholder="new email address to add"
        value={input}
        onChangeText={(text) => setInput(text.toLowerCase())}
      ></Input>
      <Button title={"Submit"} onPress={submit}></Button>
      {user && (
        <TouchableOpacity onPress={handleAddUser}>
          <View style={styles.addUser}>
              <Avatar rounded size={"medium"} source={user.imageUrl} />
              <Text style={{ fontSize: "24", marginLeft: 20 }}>
                {user.name}
              </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AddChat;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  addUser: {
    margin: 15,
    flexDirection: "row",
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: 99,
    alignItems: "center",
  },
});

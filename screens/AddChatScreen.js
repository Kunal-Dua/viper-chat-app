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
      console.log("q ", q);
      console.log("user ", user);
      const querySnapshot = await getDocs(q);
      console.log("querySnapshot", querySnapshot);
      querySnapshot.forEach((doc) => {
        console.log("doc id -> ", doc.id, " => ", doc.data());
        console.log("doc image -> ", doc.data().imageUrl);
        setUser(doc.data());
        // alert("Added "+doc.data().name);
        // navigation.goBack();
      });
    } catch (error) {
      console.error("3"+error);
    }
  };
  const handleAddUser = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      // console.log("in try handleadduser", combinedId);
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log("res -> ", res);
      if (!res.exists()) {
        
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            name:user.name,
            imageUrl: user.imageUrl,
          },
          [combinedId + ".data"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            name:currentUser.name,
            imageUrl: currentUser.imageUrl,
          },
          [combinedId + ".data"]: serverTimestamp(),
        });
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
      }
      alert("Added " + user.name);
      navigation.goBack();
    } catch (error) {
      console.error("4"+error);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: "24" }}>Enter email address</Text>
      <Input
        placeholder="new email address to add"
        value={input}
        onChangeText={(text) => setInput(text)}
      ></Input>
      <Button title={"Submit"} onPress={submit}></Button>
      {user && (
        <TouchableOpacity onPress={handleAddUser}>
          <View style={styles.addUser}>
            <Avatar
              rounded
              size={"large"}
              source="https://cdn.nerdschalk.com/wp-content/uploads/2020/09/how-to-remove-profile-picture-on-zoom-12.png"
            />
            <Text style={{ fontSize: "24" }}>{user.name}</Text>
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
    borderWidth: 1,
    borderRadius: 99,
    alignItems: "center",
  },
});

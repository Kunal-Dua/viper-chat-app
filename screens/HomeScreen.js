import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import CustomListItem from "../Components/CustomListItem";
import { Avatar, Icon } from "react-native-elements";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { onSnapshot, doc } from "firebase/firestore";
import { auth, db } from "../firebase";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const currentUser = auth.currentUser;

  const chatScreen = () => {
    navigation.navigate("AddChat");
  };

  const signOut = () => {
    auth.signOut()
      .then(() => {
        navigation.replace("Login");
        alert("sign out successfull");
        console.log("sign out successfull");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "userChats", currentUser.uid),
      (doc) => {
        setChats(doc.data());
      }
    );
    console.log(chats);
    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Viper",
      headerStyle: { backgroundColor: "#6534ec" },
      headerTitleStyle: { color: "white" },
      headerTint: { color: "white" },
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={signOut}>
            <Avatar
              rounded
              size={37}
              source={{ uri: auth?.currentUser?.photoURL }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            marginRight: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="black"></AntDesign>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign
              name="plus"
              size={24}
              color="black"
              onPress={chatScreen}
            ></AntDesign>
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id,
      chatName,
    });
  };
  console.log(chats[0]);
  return (
    <SafeAreaView>
      <ScrollView style={{ height: "100%" }}>
        <StatusBar style="light" />
        {Object.entries(chats)?.map((chat) => (
          // <CustomListItem key={chat.uid} id={chat.uid} chatName={chat.name} enterChat={enterChat} />
          <CustomListItem key={chat[0]} id={chat[0]} chatName={chat[1].userInfo.name} imageUrl={chat[1].userInfo.imageUrl}/>
        ))} 
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

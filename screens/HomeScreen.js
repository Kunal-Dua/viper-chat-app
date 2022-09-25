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
import { auth, db } from "../firebase";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const chatScreen = () => {
    navigation.navigate("AddChat");
  };

  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
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
          <TouchableOpacity activeOpacity={0.5}>
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
  const enterChat=(id,chatName)=>{
    navigation.navigate("Chat",{
      id,
      chatName,
    });
  }
  return (
    <SafeAreaView>
      <ScrollView style={{ height: "100%" }}>
        <StatusBar style="light" />
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

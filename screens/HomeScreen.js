import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import CustomListItem from "../Components/CustomListItem";
import { Avatar, Icon } from "react-native-elements";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { auth } from "../firebase";

const HomeScreen = ({ navigation }) => {
  const chatScreen = () => {
    navigation.navigate("AddChat");
  };
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
  return (
    <SafeAreaView>
      <ScrollView style={{height:"100%"}}>
        <StatusBar style="light" />
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

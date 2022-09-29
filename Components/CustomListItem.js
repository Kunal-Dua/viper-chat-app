import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ListItem, Avatar } from "react-native-elements";
import { auth } from "../firebase";

const CustomListItem = ({id,chatName,imageUrl,other,lastMessage,enterChat}) => {
  console.log(other,"other");
  return (
    <ListItem key={id} onPress={()=>enterChat(id,chatName,imageUrl,other)} bottomDivider>
      <Avatar
        rounded
        source={{ uri: imageUrl }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "700" }}>{chatName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {lastMessage}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});

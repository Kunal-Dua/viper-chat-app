import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ListItem, Avatar } from "react-native-elements";
import { auth } from "../firebase";
const CustomListItem = ({id,chatName,enterChat}) => {
  return (
    <ListItem key={id} onPress={()=>enterChat(id,chatName)} bottomDivider>
      <Avatar
        rounded
        source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "700" }}>{chatName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
          necessitatibus perferendis labore accusamus eius ea sint accusantium
          distinctio voluptatem tempore alias eum quo, sit nisi eaque officiis?
          Corrupti, atque incidunt?
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});

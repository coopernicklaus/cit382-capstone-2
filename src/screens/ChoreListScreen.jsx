import React from "react";
import { View, Text, Button } from "react-native";
import ChoreList from "../components/ChoreList";

export default function ChoreListScreen({ chores, xp, onToggle, onDelete, navigation }) {
  return (
    <View style={{ padding: 20 }}>
      <Text>XP: {xp}</Text>
      <Text>Level: {Math.floor(xp / 100) + 1}</Text>

      <Button
        title="Add Chore"
        onPress={() => navigation.navigate("New Chore")}
      />

      <ChoreList chores={chores} onToggle={onToggle} onDelete={onDelete} />
    </View>
  );
}
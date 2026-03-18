import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";

export default function NewChoreScreen({ onAddChore, navigation }) {
  const [title, setTitle] = useState("");

  function saveChore() {
    if (!title.trim()) return;

    onAddChore(title);
    setTitle("");
    navigation.goBack();
  }

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Enter chore..."
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10
        }}
      />

      <Button title="Save Chore" onPress={saveChore} />
    </View>
  );
}
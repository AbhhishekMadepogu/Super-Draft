import { View, Text } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import SafeAreaView from "react-native-safe-area-view";
import { FlatList } from "react-native-gesture-handler";
import { styles } from "./styles";
export default function Players({ route }) {
  const players = route.params.players;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        style={{ width: "100%", height: "100%" }}
        data={players}
        renderItem={({ item }) => (
          <View style={styles.upper}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "95%",
                marginLeft: 10,
                paddingVertical: 3,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                {item.firstName} {item.lastName}
              </Text>
              <Text>Score: {item.score}</Text>
            </View>
            <View style={styles.lower}>
              <Text>Pos: {item.position}</Text>
              <Text style={{ fontWeight: "bold" }}>Team: {item.team}</Text>
            </View>
          </View>
        )}
      ></FlatList>
    </SafeAreaView>
  );
}

import { View, Text } from "react-native";
import React from "react";
import SafeAreaView from "react-native-safe-area-view";
import { FlatList } from "react-native-gesture-handler";
export default function Players({ route }) {
  const players = route.params.players;
  //Implementing debounce to handle multiple presses to minimize the API Call

  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <FlatList
        style={{ width: "100%", height: "100%" }}
        data={players}
        renderItem={({ item }) => (
          <View
            style={{
              borderColor: "#5E5E5E",
              borderBottomWidth: 0.5,
              width: "98%",
              alignSelf: "center",
              paddingVertical: 5,
              marginVertical: 2,
            }}
          >
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "95%",
                marginLeft: 10,
              }}
            >
              <Text>Pos: {item.position}</Text>
              <Text style={{ fontWeight: "bold" }}>Team: {item.team}</Text>
            </View>
          </View>
        )}
      ></FlatList>
    </SafeAreaView>
  );
}

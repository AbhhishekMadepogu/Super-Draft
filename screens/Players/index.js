import { View, Text, Pressable } from "react-native";
import React from "react";
import SafeAreaView from "react-native-safe-area-view";
import { FlatList } from "react-native-gesture-handler";
import { Button } from "react-native-web";
export default function Players({ route }) {
  const players = route.params.players;
  return (
    <SafeAreaView>
      <FlatList
        style={{ width: "100%", height: "100%" }}
        data={players}
        renderItem={({ item }) => (
          <View
            style={{
              borderColor: "#5E5E5E",
              borderWidth: 2,
              marginVertical: 2,
            }}
          >
            <Text>
              {item.firstName} {item.lastName}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>Pos: {item.position}</Text>
              <Text>Team: {item.team}</Text>
            </View>
          </View>
        )}
      ></FlatList>
      <Pressable
        style={{
          justifyContent: "center",
          alignSelf: "center",
          alignItems: "center",
          backgroundColor: "#5E5E5E",
          borderRadius: 30,
          width: "85%",
          position: "absolute",
          marginTop: 500,
          height: 35,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 25 }}>Play</Text>
      </Pressable>
    </SafeAreaView>
  );
}

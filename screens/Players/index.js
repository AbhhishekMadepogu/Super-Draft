import { View, Text, Pressable } from "react-native";
import React from "react";
import SafeAreaView from "react-native-safe-area-view";
import { FlatList } from "react-native-gesture-handler";
export default function Players({ route }) {
  const players = route.params.players;
  //Implementing debounce to handle multiple presses to minimize the API Call
  const play = debounce(() => {
    console.log("Button Presseed");
  });
  function debounce(cb, delay = 500) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }
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
            <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
              {item.firstName} {item.lastName}
            </Text>
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
          paddingVertical: 4,
        }}
        onPress={() => play()}
      >
        <Text style={{ color: "#fff", fontSize: 25 }}>Play</Text>
      </Pressable>
    </SafeAreaView>
  );
}

import { FlatList } from "react-native";
import React, { useEffect } from "react";
import SafeAreaView from "react-native-safe-area-view";

export default function Contests() {
  useEffect(() => {}, []);
  return (
    <SafeAreaView style={{ backgroundColor: "#FFF", height: "100%" }}>
      <FlatList></FlatList>
    </SafeAreaView>
  );
}

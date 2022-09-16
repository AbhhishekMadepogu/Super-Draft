//Saved the apikey,contestid in @env and also added to gitignore
import { BASE_URL, Sd_api_key, contest_id } from "@env";
import React, { useEffect, useState } from "react";
import {
  Text,
  Alert,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import SafeAreaView from "react-native-safe-area-view";
import { fetchContests1 } from "../../api/helper";
export default function Home({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [contests, setContests] = useState([]);
  //using useEffect hook to execute only once
  const getallContests = async () => {
    await console.log(fetchContests1());
  };
  useEffect(() => {
    getallContests();
  }, []);
  return (
    <SafeAreaView>
      {loading && (
        <ActivityIndicator
          size={"large"}
          animating={loading}
        ></ActivityIndicator>
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={contests}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              //Navigation to navigate to players screen with a payload
              navigation.navigate("Players", { players: item.players });
            }}
            style={{
              borderColor: "#5E5E5E",
              borderWidth: 1,
              height: 40,
              width: "95%",
              marginVertical: 3,
              borderRadius: 3,
              alignSelf: "center",
            }}
          >
            <Text>{item.username}</Text>
          </Pressable>
        )}
      ></FlatList>
    </SafeAreaView>
  );
}

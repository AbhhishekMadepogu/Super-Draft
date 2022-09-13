import { BASE_URL, Sd_api_key, contest_id } from "@env";
import React, { useEffect, useState } from "react";
import { Text, Alert, FlatList, Pressable } from "react-native";
import axios from "axios";
import { fetchContests } from "../../api/helper";
import SafeAreaView from "react-native-safe-area-view";
export default function Home({ navigation }) {
  const [contests, setContests] = useState([]);
  //using useEffect hook to execute only once
  useEffect(() => {
    fetchContests();
    console.log("mykey", BASE_URL, Sd_api_key, contest_id);
  }, []);
  const url =
    "https://api-candidates.staging.superdraft.io/api/lineups/v1/contests/186066/lineups";
  //   const fetchContests = async () => {
  //     try {
  //       await axios
  //         .get(url, {
  //           //The API Key can be hidden by implementing .env
  //           headers: { "SD-api-key": "1C4EB281-6FF9-4AF8-A192-7B1407654166" },
  //         })
  //         .then((res) => {
  //           //console.log(res);
  //           setContests(res.data);
  //         });
  //     } catch (err) {
  //       Alert.alert(err.response);
  //     }
  //   };

  return (
    <SafeAreaView>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={contests}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
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

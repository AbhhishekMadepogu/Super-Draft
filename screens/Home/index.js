//Saved the apikey,contestid in @env and also added to gitignore
import React, { useEffect, useState } from "react";
import { Text, FlatList, Pressable, ActivityIndicator } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { instance } from "../../helpers/axiosInterceptor";
import { contest_id } from "@env";
export default function Home({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [contests, setContests] = useState([]);
  const [players, setPlayers] = useState([]);
  const [scores, setScores] = useState(false);
  //using useEffect hook to execute only once

  useEffect(() => {
    fetchContests1();
    fetchPlayers();
  }, []);
  //
  const play = debounce(() => {
    fetchScored();
  });
  const score = debounce(() => {
    setLoading(true);
    //mapping the lineups with the player object with the scores and finding the element playerid and matching with the sores
    try {
      contests.map((contest) =>
        contest.players.map((e) => {
          let temp = players.find((element) => element.playerId === e.playerId);
          if (temp != undefined) {
            if (temp.playerId) {
              //multiplying the score with the player multiplier in the lineup
              e.score = (temp.score * e.multiplier).toFixed(2);
              contest.points = +contest.points + +e.score;
            }
          } else {
            //if the temp not found in the list
          }
        })
      );
      setLoading(false);
      setScores(true);
    } catch (err) {
      console.log(err);
    }
  });
  //debounce function to handle multiple presses in the button
  function debounce(cb, delay = 5000) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }
  //Used .env to store the contestid an fetching it .
  const fetchScored = async () => {
    try {
      await instance
        .put(
          `/api/lineups/v1/contests/${contest_id.slice(
            1,
            -2
          )}/${contests}/scored`
        )
        .then((res) => {
          console.log(res.data);
        });
    } catch (err) {
      console.log("Error Occured", err);
    }
  };
  const fetchContests1 = async () => {
    try {
      await instance
        .get(`/api/lineups/v1/contests/${contest_id.slice(1, -2)}/lineups`)
        .then((res) => {
          console.log(res.data[6]);
          setLoading(false);
          setContests(res.data);
        });
    } catch (err) {
      console.log("tytytytyty", err);
    }
  };
  async function fetchPlayers() {
    try {
      await instance
        .get(
          `/api/playerscores/v1/contests/${contest_id.slice(
            1,
            -2
          )}/playerscores`
        )
        .then((res) => {
          setPlayers(res.data);
          console.log("Players", res.data);
        });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
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
              borderBottomWidth: 0.5,
              height: 35,
              borderBottomColor: "#5E5E5E",
              width: "95%",
              marginVertical: 3,
              justifyContent: "space-between",
              alignSelf: "center",
              flexDirection: "row",
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              {item.username}
            </Text>
            <Text>{item.points.toFixed(2)}</Text>
          </Pressable>
        )}
      ></FlatList>
      {/* if the scores are assigned then show play button else show the Fetch Score Button */}
      {!scores ? (
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
            zIndex: 30,
            height: 35,
          }}
          onPress={() => score()}
        >
          <Text style={{ color: "#fff", fontSize: 20 }}>Fetch Scores</Text>
        </Pressable>
      ) : (
        <Pressable
          style={{
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center",
            backgroundColor: "#2db83d",
            borderRadius: 30,
            width: "85%",
            position: "absolute",
            marginTop: 500,
            zIndex: 30,
            height: 35,
          }}
          onPress={() => play()}
        >
          <Text style={{ color: "#fff", fontSize: 20 }}>Play</Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
}

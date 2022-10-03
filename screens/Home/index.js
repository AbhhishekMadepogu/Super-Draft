//Saved the apikey,contestid in @env and also added to gitignore
import React, { useEffect, useState } from "react";
import {
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import SafeAreaView from "react-native-safe-area-view";
import { styles } from "./styles";
import { instance } from "../../helpers/axiosInterceptor";
import { contest_id } from "@env";
export default function Home({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [contests, setContests] = useState([]);
  const [players, setPlayers] = useState([]);
  const windowHeight = Dimensions.get("window").height;
  //using useEffect hook to execute only once

  useEffect(() => {
    fetchContests1();
    fetchPlayers();
  }, []);
  //
  const play = debounce(() => {
    fetchScored();
  });
  const score = () => {
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
    } catch (err) {
      console.log(err);
    }
  };
  //debounce function to handle multiple presses in the button
  function debounce(cb, delay = 1000) {
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
        .post(
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
        });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
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
              navigation.navigate("Players", {
                players: item.players,
                name: item.username,
              });
            }}
            style={styles.lineup}
          >
            <Text style={styles.txtLineup}>{item.username}</Text>
            <Text style={styles.txtScore}>{item.points.toFixed(2)}</Text>
          </Pressable>
        )}
      ></FlatList>
      {/* if the scores are assigned then show play button else show the Fetch Score Button */}
      {!scores ? (
        <Pressable
          style={[
            styles.btnFetchScores,
            { backgroundColor: "#5E5E5E", top: windowHeight - 140 },
          ]}
          onPress={() => score()}
        >
          <Text style={{ color: "#fff", fontSize: 20 }}>Fetch Scores</Text>
        </Pressable>
      ) : (
        <Pressable
          style={[
            styles.btnFetchScores,
            { backgroundColor: "#2db83d", top: windowHeight - 140 },
          ]}
          onPress={() => play()}
        >
          <Text style={{ color: "#fff", fontSize: 20 }}>Play</Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
}

import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import Players from "./screens/Players";
import { Button } from "react-native";
import Contests from "./screens/Contests";
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name="Lineups"
          component={Home}
          options={({ navigation }) => ({
            headerRight: () => (
              <Button
                title="Contests"
                onPress={() => {
                  navigation.navigate("Contests");
                }}
              ></Button>
            ),
          })}
        />
        <Stack.Screen name="Players" component={Players} />
        <Stack.Screen name="Contests" component={Contests} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

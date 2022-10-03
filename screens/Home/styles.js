import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  lineup: {
    borderColor: "#5E5E5E",
    borderBottomWidth: 0.5,
    height: 35,
    borderBottomColor: "#5E5E5E",
    width: "95%",
    marginVertical: 3,
    justifyContent: "space-between",
    alignSelf: "center",
    flexDirection: "row",
  },
  txtLineup: { fontSize: 15, fontWeight: "bold", alignSelf: "center" },
  txtScore: { alignSelf: "center" },
  btnFetchScores: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 30,
    width: "85%",
    position: "absolute",
    zIndex: 30,
    height: 35,
  },
  container: { backgroundColor: "#fff" },
});

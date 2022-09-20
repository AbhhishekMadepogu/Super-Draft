import { instance } from "../helpers/axiosInterceptor";
import { contest_id } from "@env";
export const fetchContests1 = async () => {
  try {
    await instance
      .get(`/api/lineups/v1/contests/${contest_id.slice(1, -2)}/lineups`)
      .then((res) => {});
  } catch (err) {
    console.log("tytytytyty", err);
  }
};
export async function fetchPlayers() {
  try {
    await instance
      .get(
        `/api/playerscores/v1/contests/${contest_id.slice(1, -2)}/playerscores`
      )
      .then((res) => {
        console.log(res.data);
      });
  } catch (err) {
    console.log(err);
  }
}

// Writing all the API Calls at a single place

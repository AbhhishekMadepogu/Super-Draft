import { instance } from "../helpers/axiosInterceptor";
import { contest_id } from "@env";
export const fetchContests1 = () => {
  try {
    instance
      .get(`/api/lineups/v1/contests/${contest_id.slice(1, -2)}/lineups`)
      .then()
      .then((res) => {
        return console.log(res.data);
      });
  } catch (err) {
    console.log("tytytytyty", err.response);
  }
};
// Writing all the API Calls at a single place

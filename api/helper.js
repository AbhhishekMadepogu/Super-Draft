import { instance } from "../helpers/axiosInterceptor";
import { contest_id } from "@env";
export const fetchContests = async () => {
  try {
    await instance
      .get(`/api/lineups/v1/contests/${contest_id}/lineups`)
      .then((res) => console.log(res));
  } catch (err) {
    console.log(err);
  }
};

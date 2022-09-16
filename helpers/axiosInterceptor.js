import axios from "axios";
import { BASE_URL, Sd_api_key } from "@env";
let headers = {
  "SD-api-key": Sd_api_key.slice(1, -2),
};
export const instance = axios.create({
  baseURL: BASE_URL.slice(1, -2),
  headers: headers,
});
//Instance for Axios to perform any axios operations like fetch

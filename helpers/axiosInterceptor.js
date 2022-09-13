import axios from "axios";
import { BASE_URL, Sd_api_key } from "@env";
let headers = { "SD-api-key": `${Sd_api_key}` };
export const instance = axios.create({ baseURL: BASE_URL, headers });

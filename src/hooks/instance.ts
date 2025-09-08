import axios from "axios";
import API from "./getEnv";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const instance = () => axios.create({baseURL: API, headers:{"Authorization":`Bearer ${cookies.get("accessToken")}`}});

export default instance
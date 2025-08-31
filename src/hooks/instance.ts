import axios from "axios";
import Cookies from "universal-cookie";
import API from "./getEnx";

const cookies = new Cookies();

const instance = () =>
  axios.create({
    baseURL: API,
    headers: {
      Authorization: `Bearer ${cookies.get("accessToken")}`,
    },
  });

export default instance;

import axios from "axios";
import { BASE_URL } from "./config";
import { asyncStorage } from "@/state/storage";
import { refresh_Token } from "./tokenService";
import { Alert } from "react-native";

export const appAxios = axios.create({
  baseURL: BASE_URL,
});

appAxios.interceptors.request.use(async (confg) => {
  const accessToken = await asyncStorage.getItem("accessToken");
  if (accessToken) {
    confg.headers.Authorization = `Bearer ${accessToken}`;
  }
  return confg;
});

appAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const newAccessToken = await refresh_Token();
        if (newAccessToken) {
          error.config.headers.Authorization = `Beare ${newAccessToken}`;
          return axios(error.confg);
        }
      } catch (error) {
        console.log("ERROR REFRESHING TOKEN");
      }
    }

    if (error.response && error.response.status != 401) {
      const errorMessage = error.response.date.message || "something wen wrong";
      Alert.alert(errorMessage);
    }

    return Promise.resolve(error);
  }
);

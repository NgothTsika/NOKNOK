import axios from "axios";
import { BASE_URL } from "./config";
import { asyncStorage } from "@/state/storage";

export const refresh_Token = async () => {
  try {
    const refreshToken = await asyncStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const response = await axios.post(`${BASE_URL}/refresh-token`, {
      refreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data;
    await asyncStorage.setItem("accessToken", accessToken);
    await asyncStorage.setItem("refreshToken", newRefreshToken);
    return accessToken;
  } catch (error) {
    console.error("REFRESH TOKEN ERROR:", error);
    await asyncStorage.removeItem("accessToken");
    await asyncStorage.removeItem("refreshToken");
    throw error;
  }
};

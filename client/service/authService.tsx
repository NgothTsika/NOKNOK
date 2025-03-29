import axios from "axios";
import { BASE_URL } from "./config";
import { asyncStorage } from "@/state/storeage";
import { useAuthStore } from "@/state/authStore";
import { resetAndNavigate } from "@/utils/NavigationUtils";

export const customerLogin = async (phone: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/customer/login`, { phone });
    const { accessToken, refreshToken, customer } = response.data;
    asyncStorage.setItem("accessToken", accessToken);
    asyncStorage.setItem("refreshToken", refreshToken);
    const { setUser } = useAuthStore.getState();
    setUser(customer);
  } catch (error) {
    console.log("login Error", error);
  }
};

export const refetchUser = async (setUser: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/customer/login`, { phone });

    setUser(customer);
  } catch (error) {
    console.log("login Error", error);
  }
};

export const refresh_Token = async () => {
  try {
    const refreshToken = asyncStorage.getItem("resfresh");
    const response = await axios.post(`${BASE_URL}/refresh-token`, {
      refreshToken,
    });

    const new_access_token = response.data.accessToken;
    const new_refresh_token = response.data.refreshToken;

    asyncStorage.setItem("accessToken", new_access_token);
    asyncStorage.setItem("refreshToken", new_refresh_token);

    return new_access_token;
  } catch (error) {
    console.log("REFRESH TOKEN ERROR", error);
    asyncStorage.removeItem();
    resetAndNavigate("customerLogin");
  }
};

import axios from "axios";
import { BASE_URL } from "./config";
import { tokenStorage } from "@/state/storeage";
import { useAuthStore } from "@/state/authStore";

export const CustomerLogin = async (phone: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/customer/login`, { phone });
    const { accessToken, refreshToken, customer } = response.data;
    tokenStorage.setItem("accessToken", accessToken);
    tokenStorage.setItem("refreshToken", refreshToken);
    const { setUser } = useAuthStore.getState();
    setUser(customer);
  } catch (error) {
    console.log("login Error", error);
  }
};

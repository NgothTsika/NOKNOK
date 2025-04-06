import axios from "axios";
import { BASE_URL } from "./config";
import { asyncStorage } from "@/state/storage";
import { useAuthStore } from "@/state/authStore";
// import { resetAndNavigate } from "@/utils/NavigationUtils";
import { appAxios } from "./apiInterceptors";

// delivery user login
export const deliveryLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/delivery/login`, {
      email,
      password,
    });
    const { accessToken, refreshToken, deliveryPartner } = response.data;

    await asyncStorage.setItem("accessToken", accessToken);
    await asyncStorage.setItem("refreshToken", refreshToken);

    const { setUser } = useAuthStore.getState();
    setUser(deliveryPartner);
  } catch (error) {
    console.error("Login Error:", error);
  }
};
// customer user login
export const customerLogin = async (phone: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/customer/login`, { phone });
    const { accessToken, refreshToken, customer } = response.data;
    await asyncStorage.setItem("accessToken", accessToken);
    await asyncStorage.setItem("refreshToken", refreshToken);
    const { setUser } = useAuthStore.getState();
    setUser(customer);
  } catch (error) {
    console.error("Login Error:", error);
  }
};

// refetch user
export const refetchUser = async (phone: string, setUser: any) => {
  try {
    const response = await appAxios.get(`/user`);
    // const { customer } = response.data;
    setUser(response.data.user);
  } catch (error) {
    console.error("Error refetching user:", error);
  }
};

// export const refresh_Token = async () => {
//   try {
//     const refreshToken = await asyncStorage.getItem("refreshToken");
//     if (!refreshToken) {
//       throw new Error("No refresh token found");
//     }

//     const response = await axios.post(`${BASE_URL}/refresh-token`, {
//       refreshToken,
//     });

//     const { accessToken, refreshToken: newRefreshToken } = response.data;
//     await asyncStorage.setItem("accessToken", accessToken);
//     await asyncStorage.setItem("refreshToken", newRefreshToken);
//     return accessToken;
//   } catch (error) {
//     console.error("REFRESH TOKEN ERROR:", error);
//     await asyncStorage.removeItem("accessToken");
//     await asyncStorage.removeItem("refreshToken");
//     resetAndNavigate("customerLogin");
//   }
// };

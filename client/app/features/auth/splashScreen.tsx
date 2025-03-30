import { View, Text, SafeAreaView, Image, Alert } from "react-native";
import React, { useEffect } from "react";
import Logo from "../../../assets/images/splash_logo.jpeg";
import { useRouter } from "expo-router";
import { asyncStorage } from "../../../state/storeage";
import { refresh_Token } from "@/service/authService";
import { useAuthStore } from "@/state/authStore";

interface DecodedToken {
  exp: number;
}

const SplashScreen = () => {
  const router = useRouter();
  const [user, setUser] = React.useState<{ role: string } | null>(null);

  const tokenCheck = async () => {
    const accessToken = await asyncStorage.getItem("accessToken");
    const refreshToken = await asyncStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
      const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);

      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedRefreshToken.exp < currentTime) {
        router.replace("/features/auth/CustomerLogin");
        Alert.alert("Session Expired", "Please login again");
        return;
      }

      if (decodedAccessToken.exp < currentTime) {
        try {
          await refresh_Token();
          const refreshedUser = await asyncStorage.getItem("user");
          if (refreshedUser) {
            setUser(JSON.parse(refreshedUser));
          }
        } catch (error) {
          console.error("Error refreshing tokens:", error);
          Alert.alert("Error", "There was an error refreshing your session.");
          router.replace("/features/auth/CustomerLogin");
          return;
        }
      }

      if (user?.role === "Customer") {
        router.replace("/features/dashboard/ProductDashboard");
      }
      // else {
      //   router.replace("/features/delivery/DeliveryDashboard");
      // }

      return true;
    }

    router.navigate("/features/auth/CustomerLogin");
    return false;
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      tokenCheck();
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [user]); // Added user dependency for correct role-based navigation.

  return (
    <SafeAreaView className="flex-1 justify-between items-center bg-primary">
      <View className="flex flex-col items-center justify-center flex-1">
        <Image source={Logo} resizeMode="contain" className="w-80 h-80" />
      </View>
      <Text className="mb-4 font-NotoSans-semibold">Made in Congo 🇨🇬</Text>
    </SafeAreaView>
  );
};

export default SplashScreen;

function jwtDecode<T>(token: string): T {
  const base64Url = token.split(".")[1];
  if (!base64Url) {
    throw new Error("Invalid token format");
  }
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
      .join("")
  );
  return JSON.parse(jsonPayload) as T;
}

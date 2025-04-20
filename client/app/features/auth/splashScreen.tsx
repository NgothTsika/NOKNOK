import { View, Text, SafeAreaView, Image, Alert } from "react-native";
import React, { FC, useEffect } from "react";
import Logo from "../../../assets/images/splash_logo.jpeg";
import { asyncStorage } from "@/state/storage";
import { refresh_Token } from "@/service/tokenService";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { screenWidth } from "@/utils/Scalling";
import { getAndSendLocation } from "@/utils/locationHelprs";
import { useAuthStore } from "@/state/authStore";

interface DecodedToken {
  exp: number;
  iat: number;
  [key: string]: any;
}

const SplashScreen: FC = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to provide a better experience."
        );
        return;
      }
      await Location.getCurrentPositionAsync({});
    } catch (error) {
      Alert.alert(
        "Error",
        "Unable to fetch location. Please enable location services."
      );
    }
  };

  const jwtDecode = <T,>(token: string): T => {
    const base64Url = token.split(".")[1];
    if (!base64Url) throw new Error("Invalid token format");
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload) as T;
  };

  const tokenCheckAndRedirect = async () => {
    const accessToken = await asyncStorage.getItem("accessToken");
    const refreshToken = await asyncStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      const currentTime = Math.floor(Date.now() / 1000);

      try {
        const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
        const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);

        console.log("Decoded Access Token:", decodedAccessToken);
        console.log("Decoded Refresh Token:", decodedRefreshToken);

        if (decodedRefreshToken.exp < currentTime) {
          Alert.alert("Session Expired", "Please login again");
          return router.replace("/features/auth/CustomerLogin");
        }

        if (decodedAccessToken.exp < currentTime) {
          console.log("Access token expired, refreshing...");
          await refresh_Token();
        }

        const userObj = await asyncStorage.getItem("user");

        if (!userObj) {
          console.log("No user found in storage.");
          Alert.alert("Session Error", "User session not found.");
          return router.replace("/features/auth/CustomerLogin");
        }

        console.log("User from storage:", userObj);
        setUser(userObj);
        await getAndSendLocation(setUser);

        if (userObj?.role === "Customer") {
          return router.replace("/features/dashboard/ProductDashboard");
        } else if (userObj?.role === "DeliveryPartner") {
          return router.replace("/features/delivery/DeliveryDashboard");
        } else {
          Alert.alert("Error", "Unknown user role.");
          return router.replace("/features/auth/CustomerLogin");
        }
      } catch (error) {
        console.error("🔥 Token auth error:", error);
        Alert.alert("Error", "Authentication check failed.");
        return router.replace("/features/auth/CustomerLogin");
      }
    } else {
      console.log("No tokens found");
      router.replace("/features/auth/CustomerLogin");
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      getLocation();
      tokenCheckAndRedirect();
    }, 2500); // Delay matches splash timing

    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaView className="flex-1 justify-between items-center bg-primary">
      <View className="flex flex-col items-center justify-center flex-1">
        <Image
          source={Logo}
          resizeMode="contain"
          style={{ height: screenWidth * 0.7, width: screenWidth * 0.7 }}
        />
      </View>
      <Text className="mb-4 font-NotoSans-semibold">Made in Congo 🇨🇬</Text>
    </SafeAreaView>
  );
};

export default SplashScreen;

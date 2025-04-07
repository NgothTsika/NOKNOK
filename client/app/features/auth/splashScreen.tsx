import { View, Text, SafeAreaView, Image, Alert } from "react-native";
import React, { FC, useEffect } from "react";
import Logo from "../../../assets/images/splash_logo.jpeg";
import { asyncStorage } from "@/state/storage";
import { refresh_Token } from "@/service/tokenService";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { screenWidth } from "@/utils/Scalling";

interface DecodedToken {
  exp: number;
  iat: number;
  [key: string]: any;
}

const SplashScreen: FC = () => {
  const router = useRouter();
  const [user, setUser] = React.useState<{ role: string } | null>(null);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to provide a better shopping experience."
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      // console.log("User location:", location.coords);
    } catch (error) {
      // console.error("Error fetching location:", error);
      Alert.alert(
        "Error",
        "Unable to fetch location. Please enable location services."
      );
    }
  };

  const tokenCheck = async () => {
    const accessToken = await asyncStorage.getItem("accessToken");
    const refreshToken = await asyncStorage.getItem("refreshToken");

    // console.log("Access Token:", accessToken);
    if (accessToken && refreshToken) {
      const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
      const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);

      // console.log("Decoded Access Token:", decodedAccessToken);
      // console.log("Decoded Refresh Token:", decodedRefreshToken);

      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedRefreshToken.exp < currentTime) {
        console.log("Refresh token expired");
        router.replace("/features/auth/CustomerLogin");
        Alert.alert("Session Expired", "Please login again");
        return;
      }

      if (decodedAccessToken.exp < currentTime) {
        try {
          console.log("Access token expired, refreshing...");
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
      } else {
        router.replace("/features/dashboard/ProductDashboard");
      }

      if (user?.role === "Customer") {
        router.replace("/features/dashboard/ProductDashboard");
      }

      return true;
    }
    router.replace("/features/auth/CustomerLogin");
    return false;
  };

  useEffect(() => {
    const timeoutId = setTimeout(getLocation, 1000); // Call the new getLocation function
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      tokenCheck();
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [user]);

  return (
    <SafeAreaView className="flex-1 justify-between items-center bg-primary">
      <View className="flex flex-col items-center justify-center flex-1">
        <Image
          source={Logo}
          resizeMode="contain"
          style={{ height: screenWidth * 0.7, width: screenWidth * 0.7 }} ///or w-88 h-88
        />
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

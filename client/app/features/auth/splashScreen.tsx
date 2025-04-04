import { View, Text, SafeAreaView, Image, Alert } from "react-native";
import React, { FC, useEffect } from "react";
import Logo from "../../../assets/images/splash_logo.jpeg";
import { asyncStorage } from "../../../state/storeage";
import { refresh_Token } from "@/service/authService";
import * as Location from "expo-location"; // Import expo-location
import { resetAndNavigate } from "@/utils/NavigationUtils";

interface DecodedToken {
  exp: number;
  iat: number;
  [key: string]: any;
}

const SplashScreen: FC = () => {
  const [user, setUser] = React.useState<{ role: string } | null>(null);

  const tokenCheck = async () => {
    const accessToken = await asyncStorage.getItem("accessToken");
    const refreshToken = await asyncStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
      const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);

      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedRefreshToken.exp < currentTime) {
        resetAndNavigate("CustomerLogin");
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
          resetAndNavigate("CustomerLogin");
          return;
        }
      } else {
        resetAndNavigate("ProductDashboard");
      }

      if (user?.role === "Customer") {
        resetAndNavigate("ProductDashboard");
      }
      return true;
    }

    resetAndNavigate("CustomerLogin");
    return false;
  };

  // Request Location Permissions and Fetch User Location
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        // Request location permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "Location permission is required to provide a better shopping experience."
          );
          return;
        }

        // Get the user's current location
        const location = await Location.getCurrentPositionAsync({});
        console.log("User's Location:", location);
      } catch (error) {
        console.error("Error fetching location:", error);
        Alert.alert(
          "Error",
          "Unable to fetch location. Please enable location services."
        );
      }
    };

    const timeoutId = setTimeout(fetchUserLocation, 1000); // Delay the request slightly
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

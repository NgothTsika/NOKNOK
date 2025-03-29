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
  const { user, setUser } = useAuthStore();

  const checkToken = async () => {
    try {
      const accessToken = await asyncStorage.getItem("accessToken");
      const refreshToken = await asyncStorage.getItem("refreshToken");

      if (accessToken && refreshToken) {
        const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
        const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedRefreshToken.exp < currentTime) {
          Alert.alert("Session Expired", "Please login again");
          router.replace("/features/auth/CustomerLogin");
          return;
        }

        if (decodedAccessToken.exp < currentTime) {
          try {
            const newAccessToken = await refresh_Token();
            const refreshedUser = await asyncStorage.getItem("user");
            if (refreshedUser) {
              setUser(JSON.parse(refreshedUser));
            }
            return;
          } catch (error) {
            console.log(error);
            Alert.alert("There was an error refreshing token");
            router.replace("/features/auth/CustomerLogin");
            return;
          }
        }

        if (user?.role === "Customer") {
          router.replace("/features/dashboard/ProductDashboard");
        } else {
          router.replace("../dashboard/DeliveryDashboard");
        }
      } else {
        router.replace("/features/auth/CustomerLogin");
      }
    } catch (error) {
      console.error("Error checking tokens:", error);
      router.replace("/features/auth/CustomerLogin");
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkToken();
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [router, user, setUser]);

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

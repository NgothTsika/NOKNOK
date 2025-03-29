import { View, Text, SafeAreaView, Image, Alert } from "react-native";
import React, { useEffect } from "react";
import Logo from "../../../assets/images/splash_logo.jpeg";
import { useRouter } from "expo-router";
import { tokenStorage } from "../../../state/storeage";

interface DecodedToken {
  exp: number;
}
const SplashScreen = () => {
  const router = useRouter();

  const tokenCheck = async () => {
    try {
      const accessToken = await tokenStorage.getItem("accessToken");
      const refreshToken = await tokenStorage.getItem("refreshToken");

      if (accessToken) {
        const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
        const decodedrefreshToken = jwtDecode<DecodedToken>(refreshToken);
      }

      // Navigate to CustomerLogin
      router.replace("/features/auth/CustomerLogin");
      return false;
    } catch (error) {
      console.error("Error checking tokens:", error);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      tokenCheck();
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

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

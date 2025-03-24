import { View, Text, SafeAreaView, Image, Alert } from "react-native";
import React, { FC, useEffect } from "react";
import Logo from "../../../assets/images/splash_logo.jpeg";
import GeoLocation from "react-native-maps";
import { resetAndNavigate } from "../../../utils/NavigationUtils";

interface Props {
  listings: any;
}

// GeoLocation.setRNConfiguration({
//   skipPermissionRequests: false,
//   authorizationLevel: "always",
//   enableBackgroundLocationUpdates: true,
//   locationProvider: "auto",
// });

const SplashScreen: FC = () => {
  // const { user, setUser } = useAuthStore();

  // const tokenCheck = async () => {
  //   const accessToken = tokenStorage.getString("accessToken") as string;
  //   const refreshToken = tokenStorage.getString("refreshToken") as string;

  //   if (accessToken) {
  //   }
  //   resetAndNavigate("CustomerLogin");
  //   return false;
  // };

  // useEffect(() => {
  //   const fetchUserLocation = async () => {
  //     try {
  //       GeoLocation;
  //       // tokenCheck();
  //       resetAndNavigate("CustomerLogin");
  //     } catch (error) {
  //       Alert.alert("Sorry we need your location to continue");
  //     }
  //   };
  //   const timeoutId = setTimeout(fetchUserLocation, 1000);
  //   return () => clearTimeout(timeoutId);
  // }, []);

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

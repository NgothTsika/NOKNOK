import React from "react";
import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import "../global.css";

const Layout = () => {
  const [fontsLoaded] = useFonts({
    "Okra-Bold": require("../assets/fonts/Okra-Bold.ttf"),
    "Okra-Regular": require("../assets/fonts/Okra-Regular.ttf"),
    "Okra-Medium": require("../assets/fonts/Okra-Medium.ttf"),
    "Okra-MediumLight": require("../assets/fonts/Okra-MediumLight.ttf"),
    "Okra-ExtraBold": require("../assets/fonts/Okra-ExtraBold.ttf"),
  });

  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    if (fontsLoaded && !hasNavigated) {
      const timeoutId = setTimeout(() => {
        setHasNavigated(true);
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [fontsLoaded, hasNavigated]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="features/auth/SplashScreen"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="features/delivery/DeliveryMap"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="features/profile/Profile"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="features/profile/PastOrders"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="features/dashboard/ProductDashboard"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="features/map/LiveTracking"
        options={{ headerShown: false, animation: "simple_push" }}
      />
      <Stack.Screen
        name="features/auth/DeliverLogin"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="features/auth/CustomerLogin"
        options={{ headerShown: false, animation: "flip" }}
      />

      <Stack.Screen
        name="features/category/ProductCategories"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="features/order/ProductOrder"
        options={{ headerShown: false, animation: "simple_push" }}
      />
      <Stack.Screen
        name="features/order/OrderSuccess"
        options={{ headerShown: false, animation: "simple_push" }}
      />
    </Stack>
  );
};

export default gestureHandlerRootHOC(Layout);

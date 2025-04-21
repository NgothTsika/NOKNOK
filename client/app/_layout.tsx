import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import React from "react";
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

  if (!fontsLoaded) return null; // Avoid rendering Stack early

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="features/auth/SplashScreen" />
      <Stack.Screen name="features/auth/DeliverLogin" />
      <Stack.Screen name="features/auth/CustomerLogin" />
      <Stack.Screen name="features/dashboard/ProductDashboard" />
      <Stack.Screen name="features/delivery/DeliveryDashboard" />
      <Stack.Screen name="features/delivery/DeliveryMap" />
      <Stack.Screen name="features/profile/Profile" />
      <Stack.Screen name="features/profile/PastOrders" />
      <Stack.Screen name="features/map/LiveTracking" />
      <Stack.Screen name="features/category/ProductCategories" />
      <Stack.Screen name="features/order/ProductOrder" />
      <Stack.Screen name="features/order/OrderSuccess" />
    </Stack>
  );
};

export default gestureHandlerRootHOC(Layout);

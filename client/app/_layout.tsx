import React from "react";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import "../global.css";
import { navigationRef, resetAndNavigate } from "../utils/NavigationUtils";

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
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [fontsLoaded, hasNavigated]);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="DeliverLogin" options={{ headerShown: false }} />
      <Stack.Screen name="CustomerLogin" options={{ headerShown: false }} />
    </Stack>
  );
};

export default gestureHandlerRootHOC(Layout);

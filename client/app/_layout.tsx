import React from "react";
import { useFonts } from "expo-font";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import "global.css";
import Navigation from "./navigation/Navigation";

const Layout = () => {
  const [fontsLoaded] = useFonts({
    "Okra-Bold": require("../assets/fonts/Okra-Bold.ttf"),
    "Okra-Regular": require("../assets/fonts/Okra-Regular.ttf"),
    "Okra-Medium": require("../assets/fonts/Okra-Medium.ttf"),
    "Okra-MediumLight": require("../assets/fonts/Okra-MediumLight.ttf"),
    "Okra-ExtraBold": require("../assets/fonts/Okra-ExtraBold.ttf"),
  });

  if (!fontsLoaded) return null;

  return <Navigation />;
};

export default gestureHandlerRootHOC(Layout);

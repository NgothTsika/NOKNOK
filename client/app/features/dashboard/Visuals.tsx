import React, { FC } from "react";
import { View, Text, Animated, Image, StyleSheet } from "react-native";
import { darkWeatherColors } from "@/utils/Constants";
import { LinearGradient } from "expo-linear-gradient"; // Use expo-linear-gradient
import { screenheight, screenWidth } from "@/utils/Scalling";
import LottieView from "lottie-react-native";

const bottomColors: [string, string, ...string[]] = [
  ...darkWeatherColors,
].reverse() as [string, string, ...string[]];

const Visuals: FC = () => {
  return (
    <Animated.View style={styles.container}>
      <LinearGradient colors={bottomColors} style={styles.gardient} />
      <Image
        source={require("@assets/images/cloud.png")}
        style={styles.cloud}
      />
      <LottieView
        autoPlay={true}
        enableMergePathsAndroidForKitKatAndAbove={true}
        loop={true}
        style={styles.lottie}
        source={require("@assets/animations/raining.json")}
      />
    </Animated.View>
  );
};

export default Visuals;

const styles = StyleSheet.create({
  cloud: {
    width: screenWidth,
    resizeMode: "stretch",
    height: 100,
  },
  color: {
    color: "darkWeatherColors",
  },
  lottie: {
    width: "100%",
    height: 160,
    position: "absolute",
    transform: [{ scaleX: -1 }],
  },
  container: {
    position: "absolute",
  },
  gardient: {
    width: "100%",
    height: screenheight * 0.4,
    position: "absolute",
    transform: [{ rotateX: "180deg" }],
  },
});

import { StyleSheet, Image } from "react-native";
import React, { FC } from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { darkWeatherColors } from "@/utils/Constants";
import { screenheight, screenWidth } from "@/utils/Scalling";
import LottieView from "lottie-react-native";
import { useCollapsibleContext } from "@r0b0t3d/react-native-collapsible";
import { LinearGradient } from "expo-linear-gradient";

const Visuals: FC = () => {
  const { scrollY } = useCollapsibleContext();

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 120], [1, 0]);
    return { opacity };
  });

  return (
    <Animated.View style={[styles.container, headerAnimatedStyle]}>
      <LinearGradient
        colors={darkWeatherColors as [string, string, ...string[]]}
        style={styles.gardient}
      />
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
    height: 150,
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
  },
});

export default Visuals;

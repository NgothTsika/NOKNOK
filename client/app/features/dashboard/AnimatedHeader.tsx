import React, { FC } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import Header from "@components/dashboard/Header";
import { useCollapsibleContext } from "@r0b0t3d/react-native-collapsible";

const AnimatedHeader: FC<{ showNotice: () => void }> = ({ showNotice }) => {
  const { scrollY } = useCollapsibleContext();

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 120], [1, 0], "clamp"),
  }));

  return (
    <Animated.View style={[styles.header, animatedStyle]}>
      <Header showNotice={showNotice} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
  },
});

export default AnimatedHeader;

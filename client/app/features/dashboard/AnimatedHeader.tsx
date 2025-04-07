import { View, Text } from "react-native";
import React, { FC } from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useCollapsibleContext } from "@r0b0t3d/react-native-collapsible";
import Header from "@/components/dashboard/Header";

const AnimatedHeader: FC<{ showNotice: () => void }> = ({ showNotice }) => {
  const { scrollY } = useCollapsibleContext();
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 120], [1, 0]);
    return { opacity };
  });

  return (
    <Animated.View style={headerAnimatedStyle}>
      <Header showNotice={showNotice} />
    </Animated.View>
  );
};

export default AnimatedHeader;

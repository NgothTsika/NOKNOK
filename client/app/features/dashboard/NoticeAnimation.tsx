import { View, Animated as RNAnimated } from "react-native";
import React, { FC } from "react";
import { NoticeHeight } from "@/utils/Scalling";
import Notice from "@/components/dashboard/Notice";

const NOTICE_HEIGHT = -(NoticeHeight + 10);

const NoticeAnimation: FC<{
  noticePosition: RNAnimated.Value; // Properly typed as Animated.Value
  children: React.ReactElement;
}> = ({ noticePosition, children }) => {
  return (
    <View className="flex-1 bg-white">
      {/* Notice Container */}
      <RNAnimated.View
        className="absolute w-full z-[999]"
        style={{
          transform: [{ translateY: noticePosition }],
        }}
      >
        <Notice />
      </RNAnimated.View>

      {/* Main Content Container */}
      <RNAnimated.View
        className="w-full h-full"
        style={{
          paddingTop: noticePosition.interpolate({
            inputRange: [NOTICE_HEIGHT, 0], // Fixed inputRange
            outputRange: [0, NOTICE_HEIGHT + 20], // Ensure proper interpolation
          }),
        }}
      >
        {children}
      </RNAnimated.View>
    </View>
  );
};

export default NoticeAnimation;

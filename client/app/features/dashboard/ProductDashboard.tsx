import { View, Text, Animated as RNAnimated, SafeAreaView } from "react-native";
import React, { useEffect, useRef } from "react";
import NoticeAnimation from "@/app/features/dashboard/NoticeAnimation";
import { NoticeHeight } from "@/utils/Scalling";
import Visuals from "./Visuals";

const NOTICE_HEIGHT = -(NoticeHeight + 12);

const ProductDashboard = () => {
  const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current;

  const slideUp = () => {
    RNAnimated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };
  const slideDown = () => {
    RNAnimated.timing(noticePosition, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };
  useEffect(() => {
    slideDown();
    const timeoutId = setTimeout(() => {
      slideUp();
    }, 3500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <>
        <Visuals />
        <SafeAreaView />
        <View className=" flex-1">
          <Text>ProductDashboard</Text>
        </View>
      </>
    </NoticeAnimation>
  );
};

export default ProductDashboard;

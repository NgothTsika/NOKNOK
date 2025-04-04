import { Animated as RNAnimated, SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect, useRef } from "react";
import NoticeAnimation from "@/app/features/dashboard/NoticeAnimation";
import { NoticeHeight } from "@/utils/Scalling";
import Visuals from "./Visuals";
import {
  CollapsibleContainer,
  CollapsibleHeaderContainer,
  CollapsibleScrollView,
  withCollapsibleContext,
} from "@r0b0t3d/react-native-collapsible";
import AnimatedHeader from "./AnimatedHeader";
import StickSearchBar from "./StickSearchBar";
import ContentContainer from "@/components/dashboard/Content";

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
        <CollapsibleContainer style={styles.first}>
          <CollapsibleHeaderContainer containerStyle={styles.transparent}>
            <AnimatedHeader
              showNotice={() => {
                slideDown();
                const timeoutId = setTimeout(() => {
                  slideUp();
                }, 3500);
                return () => clearTimeout(timeoutId);
              }}
            />
            <StickSearchBar />
          </CollapsibleHeaderContainer>
          <CollapsibleScrollView
            nestedScrollEnabled
            style={styles.first}
            showsVerticalScrollIndicator={false}
          >
            <ContentContainer />
          </CollapsibleScrollView>
        </CollapsibleContainer>
      </>
    </NoticeAnimation>
  );
};

const styles = StyleSheet.create({
  transparent: {
    backgroundColor: "transparent",
  },
  first: {
    flex: 1,
  },
});

export default withCollapsibleContext(ProductDashboard);

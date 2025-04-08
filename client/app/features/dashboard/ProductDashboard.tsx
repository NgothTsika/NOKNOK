import {
  Platform,
  Animated as RNAnimted,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useEffect, useRef } from "react";
import NoticeAnimation from "./NoticeAnimation";
import { NoticeHeight, screenheight } from "@/utils/Scalling";
import Visuals from "./Visuals";
import {
  CollapsibleContainer,
  CollapsibleHeaderContainer,
  CollapsibleScrollView,
  useCollapsibleContext,
  withCollapsibleContext,
} from "@r0b0t3d/react-native-collapsible";
import AnimatedHeader from "./AnimatedHeader";
import StickSearchBar from "./StickSearchBar";
import Content from "@/components/dashboard/Content";
import CustomerText from "@/components/ui/CustomText";
import { Fonts } from "@/utils/Constants";
import { RFValue } from "react-native-responsive-fontsize";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

const NOTICE_HEIGHT = -(NoticeHeight + 12);

const ProductDashboard: FC = () => {
  const { scrollY, expand } = useCollapsibleContext();
  const previousScroll = useRef<number>(0);

  const backToTopStyle = useAnimatedStyle(() => {
    const isScrollingUp =
      scrollY.value < previousScroll.current && scrollY.value > 120;
    const opacity = withTiming(isScrollingUp ? 1 : 0, { duration: 300 });
    const translateY = withTiming(isScrollingUp ? 0 : 10, { duration: 300 });

    previousScroll.current = scrollY.value;

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const noticePosition = useRef(new RNAnimted.Value(NOTICE_HEIGHT)).current;

  const SlideUp = () => {
    RNAnimted.timing(noticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };
  const SlideDown = () => {
    RNAnimted.timing(noticePosition, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };
  useEffect(() => {
    SlideDown();
    const timeoutId = setTimeout(() => {
      SlideUp();
    }, 3500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <>
        <Visuals />
        <SafeAreaView className="mt-14" />

        <Animated.View style={[styles.backToTopButtom, backToTopStyle]}>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            onPress={() => {
              scrollY.value = 0;
              expand();
            }}
          >
            <Ionicons
              name="arrow-up-circle-outline"
              color="#fff"
              size={RFValue(12)}
            />
            <CustomerText
              variants="h9"
              fontFamily={Fonts.SemiBold}
              style={{ color: "#fff", marginLeft: 5 }}
            >
              Back to top
            </CustomerText>
          </TouchableOpacity>
        </Animated.View>

        <CollapsibleContainer style={styles.panelContainer}>
          <CollapsibleHeaderContainer containerStyle={styles.transparent}>
            <AnimatedHeader
              showNotice={() => {
                SlideDown();
                const timeoutId = setTimeout(() => {
                  SlideUp();
                }, 3500);
                return () => clearTimeout(timeoutId);
              }}
            />
            <StickSearchBar />
          </CollapsibleHeaderContainer>

          <CollapsibleScrollView
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            style={styles.panelContainer}
          >
            <Content />

            <View style={{ backgroundColor: "#F8F8F8", padding: 20 }}>
              <CustomerText
                fontSize={RFValue(32)}
                fontFamily={Fonts.Bold}
                style={{ opacity: 0.2 }}
              >
                Congo's last minute app
              </CustomerText>
              <CustomerText
                fontFamily={Fonts.Bold}
                style={{ opacity: 0.2, marginTop: 10, paddingBottom: 100 }}
              >
                Developed By NGOTH
              </CustomerText>
            </View>
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
  panelContainer: {
    flex: 1,
  },
  backToTopButtom: {
    position: "absolute",
    alignItems: "center",
    alignSelf: "center",
    top: Platform.OS === "ios" ? screenheight * 0.18 : 100,
    flexDirection: "row",
    backgroundColor: "#000",
    gap: 4,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 999,
  },
});

export default withCollapsibleContext(ProductDashboard);

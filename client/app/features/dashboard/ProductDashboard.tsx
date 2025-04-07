import {
  Animated as RNAnimted,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import NoticeAnimation from "./NoticeAnimation";
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
import Content from "@/components/dashboard/Content";
import CustomerText from "@/components/ui/CustomText";
import { Fonts } from "@/utils/Constants";
import { RFValue } from "react-native-responsive-fontsize";
import { Text } from "react-native";

const NOTICE_HEIGHT = -(NoticeHeight + 12); // <-- OK

const ProductDashboard = () => {
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
        <SafeAreaView>
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
        </SafeAreaView>
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
});

export default withCollapsibleContext(ProductDashboard);

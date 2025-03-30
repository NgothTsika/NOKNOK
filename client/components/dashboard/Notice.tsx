import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { FC } from "react";
import CustomerText from "../ui/CustomText";
import { Fonts } from "@/utils/Constants";
import { wavyData } from "@/utils/dummyData";
import { Defs, G, Path, Svg, Use } from "react-native-svg";
import { NoticeHeight } from "@/utils/Scalling";

const Notice: FC = () => {
  return (
    <View style={{ height: NoticeHeight, overflow: "hidden" }}>
      <View className="bg-[#CCD5E4]">
        <View className="justify-center items-center bg-[#CCD5E4]">
          <SafeAreaView className="p-4">
            <CustomerText
              variants="h8"
              fontFamily={Fonts.SemiBold}
              style={styles.heading}
            >
              It's raining near this location
            </CustomerText>
            <CustomerText variants="h9" style={styles.textCenter}>
              Our delivery partners may take longer to reach you
            </CustomerText>
          </SafeAreaView>
        </View>
      </View>
      <Svg
        width="100%"
        height="35"
        fill="#CCD5E4"
        viewBox="0 0 4000 1000"
        preserveAspectRatio="none"
        style={styles.wave}
      >
        <Defs>
          <Path id="wavepath" d={wavyData} />
        </Defs>
        <G>
          <Use href="#wavepath" y="321" />
        </G>
      </Svg>
    </View>
  );
};

export default Notice;

const styles = StyleSheet.create({
  textCenter: {
    textAlign: "center",
    marginBottom: 8,
  },
  heading: {
    color: "#203875",
    marginBottom: 8,
    textAlign: "center",
  },
  wave: {
    width: "100%",
    height: 35,
    transform: [{ rotateX: "180deg" }],
  },
});

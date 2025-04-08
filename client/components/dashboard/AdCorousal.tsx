import { View, Text, Image } from "react-native";
import React, { FC } from "react";
import { useSharedValue } from "react-native-reanimated";
import { screenWidth } from "@/utils/Scalling";
import Carousel from "react-native-reanimated-carousel";
import ScalePress from "../ui/ScalePress";

const AdCorousal: FC<{ adData: any }> = ({ adData }) => {
  const progressValue = useSharedValue(0);
  const baseOptions = {
    vertical: false,
    width: screenWidth,
    height: screenWidth * 0.5,
  };

  return (
    <View className="-left-10 my-5 mx-4">
      <Carousel
        {...baseOptions}
        loop
        pagingEnabled
        snapEnabled
        autoPlay
        autoPlayInterval={3000}
        mode="parallax"
        data={adData}
        modeConfig={{
          parallaxScrollingScale: 0.94,
          parallaxScrollingOffset: 0,
        }}
        renderItem={({ item }: any) => {
          return (
            <ScalePress
              style={{ width: "100%", height: "100%" }}
              onPress={() => {}}
            >
              <Image
                source={item}
                className=" w-full h-full cover rounded-3xl"
              />
            </ScalePress>
          );
        }}
      />
      {/* <View className="w-full h-full">
       
      </View> */}
    </View>
  );
};

export default AdCorousal;

import { View, Text, Image } from "react-native";
import React, { FC, useMemo } from "react";
import { imageData } from "../../utils/dummyData";
import AutoScroll from "@homielab/react-native-auto-scroll";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const ProductSlider = () => {
  const rows = useMemo(() => {
    const result = [];
    for (let i = 0; i < imageData.length; i += 4) {
      result.push(imageData.slice(i, i + 4));
    }
    return result;
  }, []);

  return (
    <View pointerEvents="none">
      <AutoScroll
        endPaddingWidth={0}
        duration={10000}
        style={{ position: "absolute", zIndex: -2 }}
      >
        <View className="justify-center overflow-visible items-center">
          {rows?.map((row: any, rowIndex: number) => {
            return <MemoizedRow key={rowIndex} row={row} rowIndex={rowIndex} />;
          })}
        </View>
      </AutoScroll>
    </View>
  );
};

const Row: FC<{ row: typeof imageData; rowIndex: number }> = ({
  row,
  rowIndex,
}) => {
  return (
    <View className="flex-row mb-3 ">
      {row.map((image, imageIndex) => {
        const horizontalImage = rowIndex % 2 === 0 ? -18 : 18;
        return (
          <View
            key={imageIndex}
            className="mt-1 mb-3 mx-2 bg-[#f5fff8] justify-center items-center rounded-3xl"
            style={{
              width: screenWidth * 0.26,
              height: screenWidth * 0.26,
              transform: [{ translateX: horizontalImage }],
            }}
          >
            <Image
              source={image}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>
        );
      })}
    </View>
  );
};

const MemoizedRow = React.memo(Row);

export default ProductSlider;

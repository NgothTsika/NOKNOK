import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { FC, useEffect, useRef } from "react";

import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { Colors } from "@/utils/Constants";
import CustomerText from "@/components/ui/CustomText";
import { RFValue } from "react-native-responsive-fontsize";

interface SidebarProps {
  selectedCategory: any;
  categories: any;
  onCategoryPress: (category: any) => void;
}
const Sidebar: FC<SidebarProps> = ({
  selectedCategory,
  categories,
  onCategoryPress,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const indicatorPosition = useSharedValue(0);
  const animatedValues = categories?.map(() => useSharedValue(0));

  useEffect(() => {
    let targetIndex = -1;
    categories?.forEach((category: any, index: number) => {
      const isSelected = selectedCategory?._id === category._id;
      animatedValues[index].value = withTiming(isSelected ? 2 : -15, {
        duration: 500,
      });
      if (isSelected) targetIndex = index;
    });
    if (targetIndex !== -1) {
      indicatorPosition.value = withTiming(targetIndex * 100, {
        duration: 500,
      });
      runOnJS(() => {
        scrollViewRef.current?.scrollTo({
          y: targetIndex * 100,
          animated: true,
        });
      });
    }
  }, [selectedCategory]);
  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: indicatorPosition.value }],
  }));
  return (
    <View style={styles.Sidebar}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.indicator, indicatorStyle]} />
        <Animated.View>
          {categories?.map((category: any, index: number) => {
            const animatedStyle = useAnimatedStyle(() => ({
              bottom: animatedValues[index].value,
            }));
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={1}
                style={styles.CategoryButtom}
                onPress={() => onCategoryPress(category)}
              >
                <View
                  style={[
                    styles.imageContainer,
                    selectedCategory?.id === category._id &&
                      styles.selectedImageContainer,
                  ]}
                >
                  <Animated.Image
                    source={{ uri: category.image }}
                    style={[styles.image, animatedStyle]}
                  />
                </View>
                <CustomerText
                  fontSize={RFValue(8)}
                  style={{ textAlign: "center" }}
                  variants="h9"
                >
                  {category.name}
                </CustomerText>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  Sidebar: {
    width: "24%",
    backgroundColor: "#fff",
    borderWidth: 0.8,
    borderRightColor: "#eee",
    position: "relative",
  },
  CategoryButtom: {
    padding: 10,
    height: 100,
    paddingVertical: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  imageContainer: {
    borderRadius: 100,
    height: "50%",
    marginBottom: 10,
    width: "75%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F7",
    overflow: "hidden",
  },
  image: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  selectedImageContainer: {
    backgroundColor: "#CFFFDB",
  },
  indicator: {
    position: "absolute",
    right: 0,
    width: 4,
    height: 80,
    top: 10,
    alignSelf: "center",
    backgroundColor: Colors.secondary,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
});
export default Sidebar;

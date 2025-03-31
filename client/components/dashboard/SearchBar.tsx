import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import RollingBar from "react-native-rolling-bar";
import CustomerText from "../ui/CustomText";
import { Fonts } from "@/utils/Constants";

const SearchBar: FC = () => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className=" flex-row items-center justify-between border rounded-xl border-border mt-4 bg-[#F3F4F7] overflow-hidden mx-3 px-3"
    >
      <Ionicons name="search" size={20} color="#000" />
      <RollingBar
        defaultStyle={false}
        interval={3000}
        customStyle={styles.textContainer}
      >
        <CustomerText variants="h6" fontFamily={Fonts.Medium}>
          Search "sweets"
        </CustomerText>
        <CustomerText variants="h6" fontFamily={Fonts.Medium}>
          Search "milk"
        </CustomerText>
        <CustomerText variants="h6" fontFamily={Fonts.Medium}>
          Search for ata, dal, coke
        </CustomerText>
        <CustomerText variants="h6" fontFamily={Fonts.Medium}>
          Search "chips"
        </CustomerText>
        <CustomerText variants="h6" fontFamily={Fonts.Medium}>
          Search "eggs"
        </CustomerText>
        <CustomerText variants="h6" fontFamily={Fonts.Medium}>
          Search "magic cube"
        </CustomerText>
      </RollingBar>
      <View className=" w-[1px] h-6 bg-[#ded9d9] mx-3 " />
      <Ionicons name="mic" color="#000" size={20} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    width: "90%",
    padding: 10,
    height: 50,
  },
});
export default SearchBar;

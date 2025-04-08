import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import AdCorousal from "./AdCorousal";
import { adData } from "@/utils/dummyData";

const Content = () => {
  return (
    <View className="px-5">
      <AdCorousal adData={adData} />
    </View>
  );
};

export default Content;

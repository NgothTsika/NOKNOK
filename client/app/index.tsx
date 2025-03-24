import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../assets/images/splash_logo.jpeg";

const Main = () => {
  return (
    <SafeAreaView className="flex-1 justify-between items-center bg-primary">
      <View className="flex flex-col items-center justify-center flex-1">
        <Image source={Logo} />
      </View>
      <Text className="mb-4 font-NotoSans-semibold">Made in Congo 🇨🇬</Text>
    </SafeAreaView>
  );
};

export default Main;

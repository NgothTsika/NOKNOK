import { View, Text } from "react-native";
import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
  return (
    <View>
      <Text>Navigation</Text>
    </View>
  );
};

export default Navigation;

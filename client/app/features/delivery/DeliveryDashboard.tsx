import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Link } from "expo-router";

const DeliveryDashboard = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>DeliveryDashboard</Text>
        <Link href="/features/auth/DeliverLogin">Go</Link>
      </View>
    </SafeAreaView>
  );
};

export default DeliveryDashboard;

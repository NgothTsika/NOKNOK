import React from "react";
import { View, Text, SafeAreaView } from "react-native";

const CustomerLogin = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Customer Login</Text>
    </SafeAreaView>
  );
};

export default CustomerLogin;

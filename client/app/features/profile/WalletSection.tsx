import { View, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/utils/Constants";
import WalletItem from "./WalletItem";

const WalletSection = () => {
  return (
    <View style={styles.walletContainer}>
      <WalletItem icon="wallet" label="wallet" />
      <WalletItem icon="chatbubbles" label="Support" />
      <WalletItem icon="card" label="Payment" />
    </View>
  );
};

const styles = StyleSheet.create({
  walletContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.backgroundSecondary,
    paddingVertical: 15,
    borderRadius: 15,
    marginVertical: 20,
  },
});

export default WalletSection;

import { View, Text, StyleSheet } from "react-native";
import React, { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Fonts } from "@/utils/Constants";
import { RFValue } from "react-native-responsive-fontsize";
import CustomerText from "@/components/ui/CustomText";

const WalletItem: FC<{ icon: any; label: string }> = ({ icon, label }) => {
  return (
    <View style={styles.walletItemContainer}>
      <Ionicons name={icon as any} color={Colors.text} size={RFValue(20)} />
      <CustomerText variants="h8" fontFamily={Fonts.Medium}>
        {label}
      </CustomerText>
      <Text>Walletitem</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  walletItemContainer: {
    alignItems: "center",
  },
});

export default WalletItem;

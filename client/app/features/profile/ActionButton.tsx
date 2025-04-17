import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { Colors, Fonts } from "@/utils/Constants";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import CustomerText from "@/components/ui/CustomText";

interface ActionButtonProps {
  icon: any;
  label: string;
  onPress?: () => void;
}

const ActionButton: FC<ActionButtonProps> = ({ icon, label, onPress }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon as any} color={Colors.text} size={RFValue(14)} />
      </View>
      <CustomerText variants="h7" fontFamily={Fonts.Medium}>
        {label}
      </CustomerText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 180,
    backgroundColor: Colors.backgroundSecondary,
  },
});

export default ActionButton;

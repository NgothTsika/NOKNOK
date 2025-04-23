import { Colors, Fonts } from "@/utils/Constants";
import React, { FC } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import CustomerText from "./CustomText";

interface CustomButtonProps {
  onPress: () => Promise<void>;
  title: string;
  disabled: boolean;
  loading: boolean;
}

const CustomButton: FC<CustomButtonProps> = ({
  onPress,
  title,
  disabled,
  loading,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        styles.btn,
        {
          backgroundColor: disabled ? Colors.disabled : Colors.secondary,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color="white" size={"small"} />
      ) : (
        <CustomerText
          variants="h6"
          style={styles.text}
          fontFamily={Fonts.SemiBold}
        >
          {title}
        </CustomerText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 15,
    marginVertical: 15,
    width: "100%",
  },
  text: {
    color: "#fff",
  },
});

export default CustomButton;

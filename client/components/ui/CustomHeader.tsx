import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import React, { FC } from "react";
import { Colors, Fonts } from "@/utils/Constants";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { goBack } from "expo-router/build/global-state/routing";
import { router } from "expo-router";
import CustomerText from "./CustomText";

const CustomHeader: FC<{ title: string; search?: boolean }> = ({
  title,
  search,
}) => {
  return (
    <SafeAreaView>
      <View style={styles.flexRow}>
        <Pressable onPress={() => router.back()}>
          <Ionicons
            name="chevron-back"
            color={Colors.text}
            size={RFValue(16)}
          />
        </Pressable>
        <CustomerText
          style={styles.text}
          variants="h5"
          fontFamily={Fonts.SemiBold}
        >
          {title}
        </CustomerText>
        <View>{search && <Ionicons name="search" size={RFValue(16)} />}</View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    justifyContent: "space-between",
    padding: 10,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 0.6,
    borderBottomColor: Colors.border,
  },
  text: {
    textAlign: "center",
  },
});

export default CustomHeader;

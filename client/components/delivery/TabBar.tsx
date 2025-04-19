import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { Colors, Fonts } from "@/utils/Constants";
import CustomerText from "@/components/ui/CustomText";

interface TabBarPropos {
  selectedTab: "pending" | "delivered";
  onTabChange: (tab: "pending" | "delivered") => void;
}

const TabBar: FC<TabBarPropos> = ({ selectedTab, onTabChange }) => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.tab, selectedTab == "pending" && styles.activeTab]}
        onPress={() => onTabChange("pending")}
      >
        <CustomerText
          variants="h8"
          fontFamily={Fonts.SemiBold}
          style={[
            styles.tabText,
            selectedTab === "pending"
              ? styles.activeTabText
              : styles.inactivetabText,
          ]}
        >
          Available
        </CustomerText>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.tab, selectedTab != "pending" && styles.activeTab]}
        onPress={() => onTabChange("delivered")}
      >
        <CustomerText
          variants="h8"
          fontFamily={Fonts.SemiBold}
          style={[
            styles.tabText,
            selectedTab !== "pending"
              ? styles.activeTabText
              : styles.inactivetabText,
          ]}
        >
          Delivered
        </CustomerText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 2,
    width: "30%",
    margin: 10,
    borderColor: Colors.border,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  tabText: {
    color: Colors.text,
  },
  activeTabText: {
    color: "#fff",
  },
  inactivetabText: {
    color: Colors.disabled,
  },
});

export default TabBar;

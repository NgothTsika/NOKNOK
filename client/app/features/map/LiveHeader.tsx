import { View, Text, SafeAreaView, StyleSheet, Pressable } from "react-native";
import React, { FC } from "react";
import { useAuthStore } from "@/state/authStore";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { router } from "expo-router";
import CustomerText from "@/components/ui/CustomText";
import { Fonts } from "@/utils/Constants";

const LiveHeader: FC<{
  type: "Customer" | "Delivery";
  title: string;
  secondTitle: string;
}> = ({ title, type, secondTitle }) => {
  const isCustomer = type === "Customer";

  const { currentOrder, setCurrentOrder } = useAuthStore();

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Pressable
          style={styles.backButton}
          onPress={() => {
            if (isCustomer) {
              router.navigate("/features/dashboard/ProductDashboard");
              if (currentOrder?.status == "delivered") {
                setCurrentOrder(null);
              }
              return;
            }
            router.navigate("/features/delivery/DeliveryDashboard");
          }}
        >
          <Ionicons
            name="chevron-back"
            color={isCustomer ? "#fff" : "#000"}
            size={RFValue(16)}
          />
        </Pressable>
        <CustomerText
          style={isCustomer ? styles.titleTextWhite : styles.titleTextBlack}
          variants="h8"
          fontFamily={Fonts.Medium}
        >
          {title}
        </CustomerText>
        <CustomerText
          style={isCustomer ? styles.titleTextWhite : styles.titleTextBlack}
          variants="h4"
          fontFamily={Fonts.SemiBold}
        >
          {secondTitle}
        </CustomerText>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    paddingVertical: 10,
    alignItems: "center",
  },
  backButton: { position: "absolute", left: 20 },
  titleTextBlack: { color: "black" },
  titleTextWhite: { color: "#fff" },
});

export default LiveHeader;

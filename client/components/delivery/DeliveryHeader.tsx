import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { useAuthStore } from "@/state/authStore";
import { Colors, Fonts } from "@/utils/Constants";
import CustomerText from "../ui/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { asyncStorage } from "@/state/storage";

interface DeliveryHeaderProps {
  name: string;
  email: string;
}

const DeliveryHeader: FC<DeliveryHeaderProps> = ({ name, email }) => {
  const { logout } = useAuthStore();
  return (
    <View style={styles.flexRow}>
      <View style={styles.imgContainer}>
        <Image
          source={require("@assets/images/delivery_boy.png")}
          style={styles.img}
        />
      </View>
      <View style={styles.infoContainer}>
        <CustomerText variants="h4" fontFamily={Fonts.SemiBold}>
          Hello {name}!
        </CustomerText>
        <CustomerText variants="h9" fontFamily={Fonts.Medium}>
          {email}
        </CustomerText>
      </View>

      <TouchableOpacity
        onPress={() => {
          router.navigate("/features/auth/CustomerLogin");
          logout();
          asyncStorage.clearAll();
        }}
      >
        <Ionicons name="log-out-outline" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  imgContainer: {
    padding: 4,
    borderRadius: 100,
    height: 60,
    width: 60,
    overflow: "hidden",
    backgroundColor: Colors.backgroundSecondary,
  },
  img: {
    width: "100%",
    bottom: -8,
    height: "100%",
    resizeMode: "contain",
  },
  infoContainer: {
    width: "70%",
  },
});
export default DeliveryHeader;

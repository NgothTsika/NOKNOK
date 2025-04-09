import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { screenheight, screenWidth } from "@/utils/Scalling";
import { Colors, Fonts } from "@/utils/Constants";
import CustomerText from "@/components/ui/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { router } from "expo-router";

interface CartSummaryProps {
  cartCount: number;
  cartImage: string;
}

const CartSummary: FC<CartSummaryProps> = ({ cartCount, cartImage }) => {
  return (
    <View style={styles.container}>
      <View style={styles.flexRowGap}>
        <Image
          source={
            cartImage === null
              ? require("@assets/icons/bucket.png")
              : { uri: cartImage }
          }
          style={styles.image}
        />
        <CustomerText>
          {cartCount} ITEM{cartCount > 1 ? "S" : ""}
        </CustomerText>
        <Ionicons
          name="caret-up-outline"
          color={Colors.secondary}
          size={RFValue(15)}
        />
      </View>

      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.7}
        onPress={() => router.navigate("/features/order/ProductOrder")}
      >
        <CustomerText style={styles.btnText} fontFamily={Fonts.Medium}>
          Next
        </CustomerText>
        <Ionicons name="caret-forward-outline" color="#fff" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: screenWidth * 0.05,
    paddingBottom: screenheight * 0.03,
    paddingTop: screenWidth * 0.014,
  },
  flexRowGap: {
    alignItems: "center",
    flexDirection: "row",
    gap: screenWidth * 0.02,
  },
  image: {
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
    borderRadius: screenWidth * 0.025,
    borderColor: Colors.border,
    borderWidth: 1,
  },
  btn: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    paddingVertical: screenheight * 0.01,
    borderRadius: screenWidth * 0.025,
    backgroundColor: Colors.secondary,
    paddingHorizontal: screenWidth * 0.1,
  },
  btnText: {
    marginLeft: screenWidth * 0.02,
    color: "#fff",
  },
});

export default CartSummary;

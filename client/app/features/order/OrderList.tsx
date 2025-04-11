import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React from "react";
import { useCartStore } from "@/state/cartStore";
import CustomerText from "@/components/ui/CustomText";
import { Colors, Fonts } from "@/utils/Constants";
import OrderItem from "./OrderItem";

const OrderList = () => {
  const cartItems = useCartStore((state) => state.cart);
  const TotalItems = cartItems.reduce((acc, cart) => acc + cart?.count, 0);
  return (
    <View style={styles.conatiner}>
      <View style={styles.flexrow}>
        <View style={styles.imageContainer}>
          <Image
            source={require("@assets/icons/clock.png")}
            style={styles.imag}
          />
        </View>
        <View>
          <CustomerText variants="h5" fontFamily={Fonts.SemiBold}>
            Delivery in 9 minutes
          </CustomerText>
          <CustomerText
            variants="h8"
            fontFamily={Fonts.SemiBold}
            style={{ opacity: 0.5 }}
          >
            Shipment of {TotalItems || 0} item
          </CustomerText>
        </View>
      </View>
      <ScrollView className="max-h-96" showsHorizontalScrollIndicator>
        {cartItems?.map((item) => {
          return <OrderItem key={item._id} item={item} />;
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
  },
  flexrow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  imageContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    borderRadius: 15,
  },
  imag: {
    width: 30,
    height: 30,
  },
});

export default OrderList;

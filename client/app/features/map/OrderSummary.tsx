import { View, Text, Image } from "react-native";
import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { Colors, Fonts } from "@/utils/Constants";
import { Ionicons } from "@expo/vector-icons";
import CustomerText from "@/components/ui/CustomText";
import BillDetails from "../order/BillDetails";

const OrderSummary: FC<{ order: any }> = ({ order }) => {
  const totalPrice =
    order?.items?.reduce(
      (total: number, cartItem: any) =>
        total + cartItem.item.price * cartItem.count,
      0
    ) || 0;

  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.iconContainer}>
          <Ionicons name="bag-handle" size={24} color={Colors.disabled} />
        </View>
        <View>
          <CustomerText variants="h5" fontFamily={Fonts.SemiBold}>
            Order summary
          </CustomerText>
          <CustomerText variants="h8" fontFamily={Fonts.Medium}>
            Order ID - #{order?.orderId}
          </CustomerText>
        </View>
      </View>
      {order?.item?.map((item: any, index: number) => {
        return (
          <View style={styles.flexRow} key={index}>
            <View style={styles.imgContainer}>
              <Image source={{ uri: item?.item?.image }} style={styles.img} />
            </View>
            <View style={{ width: "55%" }}>
              <CustomerText
                numberOfLines={2}
                variants="h8"
                fontFamily={Fonts.Medium}
              >
                {item.item.name}
              </CustomerText>
              <CustomerText variants="h9">{item.item.quantity}</CustomerText>
            </View>

            <View style={{ width: "20%", alignItems: "flex-end" }}>
              <CustomerText
                variants="h8"
                fontFamily={Fonts.Medium}
                style={{ alignSelf: "flex-end", marginTop: 4 }}
              >
                ${item.count * item.item.price}
              </CustomerText>
              <CustomerText
                variants="h8"
                fontFamily={Fonts.Medium}
                style={{ alignSelf: "flex-end", marginTop: 4 }}
              >
                ${item.count}x
              </CustomerText>
            </View>
          </View>
        );
      })}
      <BillDetails totalItemPrice={totalPrice} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 15,
    marginVertical: 15,
    paddingVertical: 10,
    backgroundColor: "#FFF",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
  },
  iconContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  imgContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    borderRadius: 15,
    width: "17%",
  },
  img: {
    width: 40,
    height: 40,
  },
});

export default OrderSummary;

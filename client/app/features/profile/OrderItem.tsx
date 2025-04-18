import { View, StyleSheet } from "react-native";
import React, { FC } from "react";
import CustomerText from "@/components/ui/CustomText";
import { Fonts } from "@/utils/Constants";
import { formatISOCustom } from "@/utils/DateUtils";

interface CartItem {
  _id: string | number;
  item: any;
  count: number;
}

interface Order {
  orderId: string;
  items: CartItem[];
  totalPrice: number;
  createdAt: string;
  status: "confirmed" | "completed";
}

const OrderItem: FC<{ item: Order; index: number }> = ({ item, index }) => {
  return (
    <View style={[styles.container, { borderTopWidth: index === 0 ? 0.7 : 0 }]}>
      <View style={styles.flexRowBetween}>
        <CustomerText variants="h8" fontFamily={Fonts.Medium}>
          #{item.orderId}
        </CustomerText>
        <CustomerText
          style={{ textTransform: "capitalize" }}
          variants="h8"
          fontFamily={Fonts.Medium}
        >
          {item.status}
        </CustomerText>
      </View>

      <View style={styles.flexRowBetween}>
        <View style={{ width: "50%" }}>
          {item.items.map((i, idx) => (
            <CustomerText variants="h8" numberOfLines={1} key={idx}>
              {i.count}x {i.item.name}
            </CustomerText>
          ))}
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <CustomerText
            variants="h5"
            fontFamily={Fonts.SemiBold}
            style={{ marginTop: 10 }}
          >
            ${item.totalPrice}
          </CustomerText>
          <CustomerText variants="h9">
            {formatISOCustom(item.createdAt)}
          </CustomerText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.7,
    paddingVertical: 15,
    opacity: 0.9,
  },
  flexRowBetween: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default OrderItem;

import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { Colors, Fonts } from "@/utils/Constants";
import CustomerText from "../ui/CustomText";
import { RFValue } from "react-native-responsive-fontsize";
import { formatISOCustom } from "@/utils/DateUtils";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface CartItem {
  _id: string | number;
  item: any;
  count: number;
}

interface Order {
  orderId: string;
  items: CartItem[];
  deliveryLocation: {
    address: string;
    coordinates: [number, number];
  };
  totalPrice: number;
  createdAt: string;
  status: "available" | "confirmed" | "delivered" | "cancelled";
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "available":
      return "#28a745";
    case "confirmed":
      return "#007bff";
    case "delivered":
      return "#17a2b8";
    case "cancelled":
      return "#dc3545";
    default:
      return "#6c757d";
  }
};

const OrderItem: FC<{ item: Order; index?: number }> = ({ item, index }) => {
  const goToMap = () => {
    router.navigate({
      pathname: "/features/delivery/DeliveryMap",
      params: {
        orderId: item.orderId,
        lat: item.deliveryLocation?.coordinates?.[1]?.toString(),
        lng: item.deliveryLocation?.coordinates?.[0]?.toString(),
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.flexRowBetween}>
        <CustomerText variants="h8" fontFamily={Fonts.Medium}>
          #{item.orderId}
        </CustomerText>

        <View style={styles.statusContainer}>
          <CustomerText
            variants="h8"
            fontFamily={Fonts.SemiBold}
            style={[styles.statusText, { color: getStatusColor(item.status) }]}
          >
            {item.status}
          </CustomerText>
        </View>
      </View>

      <View style={{ marginTop: 8 }}>
        {item.items.slice(0, 2).map((i, idx) => (
          <CustomerText variants="h8" numberOfLines={1} key={idx}>
            {i.count}x {i.item.name}
          </CustomerText>
        ))}
      </View>

      <View style={[styles.flexRowBetween, styles.addressTextContainer]}>
        <View style={styles.addressContainer}>
          <CustomerText variants="h8" numberOfLines={1}>
            {item.deliveryLocation.address}
          </CustomerText>
          <CustomerText style={styles.dateText}>
            {formatISOCustom(item.createdAt)}
          </CustomerText>
        </View>

        <TouchableOpacity style={styles.iconContainer} onPress={goToMap}>
          <Ionicons
            name="arrow-forward-circle"
            size={RFValue(24)}
            color={Colors.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.7,
    padding: 10,
    borderColor: Colors.border,
    paddingVertical: 15,
    backgroundColor: "white",
    marginBottom: 12,
    borderRadius: 10,
  },
  flexRowBetween: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  statusContainer: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  statusText: {
    textTransform: "capitalize",
  },
  addressContainer: {
    marginTop: 10,
  },
  addressTextContainer: {
    width: "100%",
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  dateText: {
    marginTop: 2,
    fontSize: RFValue(8),
  },
  iconContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
});

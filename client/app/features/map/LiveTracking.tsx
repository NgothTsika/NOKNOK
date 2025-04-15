import { View, StyleSheet, ScrollView } from "react-native";
import React, { FC, useEffect } from "react";
import { useAuthStore } from "@/state/authStore";
import { getOrderById } from "@/service/orderService";
import { Colors, Fonts } from "@/utils/Constants";
import LiveHeader from "./LiveHeader";
import LiveMap from "./LiveMap";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import CustomerText from "@/components/ui/CustomText";
import DeliveryDetails from "./DeliveryDetails";

const LiveTracking: FC = () => {
  const { currentOrder, setCurrentOrder } = useAuthStore();

  const fetchOrderDetails = async () => {
    const data = await getOrderById(currentOrder?._id as any);
    console.log(data);
    setCurrentOrder(data);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  let msg = "Packing your order";
  let time = "Arriving in 1 minutes";

  if (currentOrder?.status == "confirmed") {
    msg = "Arriving Soon";
    time = "Arriving in 8 minutes";
  } else if (currentOrder?.status == "arriving") {
    msg = "Order Pricked Soon";
    time = "Arriving in 6 minutes";
  } else if (currentOrder?.status == "deliverd") {
    msg = "Order Delivered";
    time = "Fastest Delivery";
  }
  console.log(currentOrder);

  return (
    <View style={styles.container}>
      <LiveHeader type="Customer" title={msg} secondTitle={time} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <LiveMap />
        <View style={styles.flexRow}>
          <View style={styles.iconContainer}>
            <Ionicons
              name={
                currentOrder?.deliveryPartner ? "phone-landscape" : "bag-add"
              }
              color={Colors.disabled}
              size={RFValue(20)}
            />
          </View>
          <View style={{ width: "82%" }}>
            <CustomerText
              numberOfLines={1}
              variants="h7"
              fontFamily={Fonts.SemiBold}
            >
              {currentOrder?.deliveryPartner?.name ||
                "We will soon assign deliver partner"}
            </CustomerText>

            {currentOrder?.deliveryPartner && (
              <CustomerText variants="h7" fontFamily={Fonts.Medium}>
                {currentOrder?.deliveryPartner?.phone}
              </CustomerText>
            )}

            <CustomerText variants="h9" fontFamily={Fonts.Medium}>
              {currentOrder?.deliveryPartner
                ? "For Delivery instructions you can contact here"
                : msg}
            </CustomerText>
          </View>
        </View>
        <DeliveryDetails details={currentOrder?.customer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: "10",
    width: "100%",
    borderRadius: 15,
    marginTop: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
  },
  iconContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: "center",
    alignContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  scrollContent: {
    paddingBottom: 150,
    backgroundColor: Colors.backgroundSecondary,
    padding: 15,
  },
});

export default LiveTracking;

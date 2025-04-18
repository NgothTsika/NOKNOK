import { View, StyleSheet, ScrollView } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { useAuthStore } from "@/state/authStore";
import { getOrderById, sendLiveOrderUpdates } from "@/service/orderService";
import { Colors, Fonts } from "@/utils/Constants";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import CustomerText from "@/components/ui/CustomText";
import { useRoute } from "@react-navigation/native";
import LiveHeader from "../map/LiveHeader";
import LiveMap from "../map/LiveMap";
import DeliveryDetails from "../map/DeliveryDetails";
import OrderSummary from "../map/OrderSummary";
import * as Location from "expo-location";

const DeliveryMap: FC = () => {
  const user = useAuthStore((state) => state.user);
  const [orderData, setOrderData] = useState<any>(null);
  const [myLocation, setMyLocation] = useState<any>(null);
  const route = useRoute();
  const orderDetails = route?.params as Record<string, any>;

  const { setCurrentOrder } = useAuthStore();

  const fetchOrderDetails = async () => {
    const data = await getOrderById(String(orderDetails?._id));
    setOrderData(data);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  useEffect(() => {
    let subscription: Location.LocationSubscription;

    const startWatchingLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 3000,
          distanceInterval: 2,
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          setMyLocation({ latitude, longitude });
        }
      );
    };

    startWatchingLocation();

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  useEffect(() => {
    const updateLiveLocation = async () => {
      if (
        orderData?.deliveryPartner?._id === user?._id &&
        orderData?.status !== "delivered" &&
        orderData?.status !== "cancelled"
      ) {
        await sendLiveOrderUpdates(
          orderData._id,
          myLocation,
          orderData?.status
        );
        fetchOrderDetails();
      }
    };

    updateLiveLocation();
  }, [myLocation]);

  let message = "start this order";
  if (orderData?.deliveryPartner?._id === user?._id) {
    if (orderData?.status === "confirmed") message = "Grab your order";
    else if (orderData?.status === "arriving") message = "Complete your order";
    else if (orderData?.status === "delivered") message = "Your milestone";
  } else if (orderData?.status !== "available") {
    message = "You missed it!";
  }

  return (
    <View style={styles.container}>
      <LiveHeader
        type="Delivery"
        title={message}
        secondTitle="Delivery in 10 minutes"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <LiveMap />
        <DeliveryDetails details={orderData?.customer} />
        <OrderSummary order={orderData} />

        <View style={styles.flexRow}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="heart-outline"
              color={Colors.disabled}
              size={RFValue(20)}
            />
          </View>

          <View style={{ width: "82%" }}>
            <CustomerText variants="h7" fontFamily={Fonts.SemiBold}>
              Do you like our app?
            </CustomerText>
            <CustomerText variants="h9" fontFamily={Fonts.Medium}>
              Hit the like and subscribe button! If you are enjoying, leave a
              comment!
            </CustomerText>
          </View>
        </View>

        <CustomerText
          fontFamily={Fonts.SemiBold}
          variants="h6"
          style={{ opacity: 0.6, marginTop: 20 }}
        >
          kokoko shop
        </CustomerText>
      </ScrollView>

      {orderData?.status != "delivered" && orderData?.status != "cancelled" && (
        <View></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
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
    marginRight: 10,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  scrollContent: {
    paddingBottom: 150,
    backgroundColor: Colors.backgroundSecondary,
    padding: 15,
  },
});

export default DeliveryMap;

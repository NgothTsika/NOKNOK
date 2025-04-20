import { View, StyleSheet, ScrollView, Alert } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { useAuthStore } from "@/state/authStore";
import {
  confirmOrder,
  getOrderById,
  sendLiveOrderUpdates,
} from "@/service/orderService";
import { Colors, Fonts } from "@/utils/Constants";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import CustomerText from "@/components/ui/CustomText";
import LiveHeader from "../map/LiveHeader";
import LiveMap from "../map/LiveMap";
import DeliveryDetails from "../map/DeliveryDetails";
import OrderSummary from "../map/OrderSummary";
import * as Location from "expo-location";
import { useLocalSearchParams } from "expo-router";
import { hocStyles } from "@/styles/globalStyles";
import CustomButton from "@/components/ui/CustomButton";

const DeliveryMap: FC = () => {
  const user = useAuthStore((state) => state.user);
  const [orderData, setOrderData] = useState<any>(null);
  const [myLocation, setMyLocation] = useState<any>(null);
  const { data } = useLocalSearchParams(); // ✅ Fetch param
  const orderDetails = JSON.parse(data as string); // ✅ Parse it to get order details
  const { setCurrentOrder } = useAuthStore();
  const fetchOrderDetails = async () => {
    const data = await getOrderById(String(orderDetails?._id)); // 🟢 Now this will work the same
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
          distanceInterval: 10,
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

  const acceptOrder = async () => {
    const data = await confirmOrder(orderData?._id, myLocation);
    if (data) {
      setCurrentOrder(data);
      Alert.alert("Order Accepted, Grab your Package");
    } else {
      Alert.alert("There was an error");
    }
    fetchOrderDetails();
  };
  const orderPickedUp = async () => {
    const data = await sendLiveOrderUpdates(
      orderData?._id,
      myLocation,
      "arriving"
    );
    if (data) {
      setCurrentOrder(data);
      Alert.alert("Order Accepted, Grab your Package");
    } else {
      Alert.alert("There was an error");
    }
    fetchOrderDetails();
  };
  const orderDelivered = async () => {
    const data = await sendLiveOrderUpdates(
      orderData?._id,
      myLocation,
      "delivered"
    );
    if (data) {
      setCurrentOrder(data);
      Alert.alert("Order Accepted, Grab your Package");
    } else {
      Alert.alert("There was an error");
    }
    fetchOrderDetails();
  };

  let message = "start this order";
  if (orderData?.deliveryPartner?._id === user?._id) {
    if (orderData?.status === "confirmed") message = "Grab your order";
    else if (orderData?.status === "arriving") message = "Complete your order";
    else if (orderData?.status?.toLowerCase() === "delivered")
      message = "Your milestone";
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
        <LiveMap
          deliveryLocation={orderData?.deliveryPersonLocation || myLocation}
          deliveryPersonLocation={orderData?.deliveryLocation || null}
          hasAccepted={
            orderData?.deliveryPartner?._id == user?._id &&
            orderData?.status == "confirmed"
          }
          hasPickedUp={orderData?.status == "arriving"}
          pickupLocation={orderData?.pickupLocation || null}
        />
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
        <View style={[hocStyles.cartContainer, styles.btnContainer]}>
          {orderData?.status == "pending" && (
            <CustomButton
              onPress={acceptOrder}
              loading={false}
              disabled={false}
              title="Accept Order"
            />
          )}
          {orderData?.status == "confirmed" &&
            orderData?.deliveryPartner?._id === user?._id && (
              <CustomButton
                onPress={orderPickedUp}
                loading={false}
                disabled={false}
                title="Order Picked Up"
              />
            )}
          {orderData?.status == "arriving" &&
            orderData?.deliveryPartner?._id === user?._id && (
              <CustomButton
                onPress={orderDelivered}
                loading={false}
                disabled={false}
                title="Delivered"
              />
            )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    padding: 10,
  },
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

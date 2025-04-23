// withLiveOrder.tsx
import { useAuthStore } from "@/state/authStore";
import { sendLiveOrderUpdates } from "@/service/orderService";
import { Colors, Fonts } from "@/utils/Constants";
import { hocStyles } from "@/styles/globalStyles";
import CustomerText from "@/components/ui/CustomText";
import { router } from "expo-router";
import React, { FC, useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import * as Location from "expo-location";
import io from "socket.io-client";
import { SOCKET_URL } from "@/service/config";

const withLiveOrder = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): FC<P> => {
  const WithLiveOrder: FC<P> = (props) => {
    const { currentOrder, setCurrentOrder, user } = useAuthStore();
    const [myLocation, setMyLocation] = useState<any>(null);

    useEffect(() => {
      if (!currentOrder?._id) return;

      const socket = io(SOCKET_URL, { transports: ["websocket"] });
      socket.emit("joinRoom", currentOrder._id);

      socket.on("liveTrackingUpdates", (updatedOrder) => {
        setCurrentOrder(updatedOrder);
      });

      return () => {
        socket.disconnect();
      };
    }, [currentOrder?._id]);

    useEffect(() => {
      let subscription: Location.LocationSubscription;

      const startTracking = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.warn("Location permission not granted");
          return;
        }

        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000,
            distanceInterval: 10,
          },
          (loc) => {
            const { latitude, longitude } = loc.coords;
            setMyLocation({ latitude, longitude });
          }
        );
      };

      if (currentOrder) {
        startTracking();
      }

      return () => {
        if (subscription) subscription.remove();
      };
    }, [currentOrder]);

    useEffect(() => {
      const updateOrder = async () => {
        if (
          currentOrder &&
          currentOrder.deliveryPartner?._id === user?._id &&
          currentOrder.status !== "delivered" &&
          currentOrder.status !== "cancelled"
        ) {
          await sendLiveOrderUpdates(
            currentOrder._id,
            myLocation,
            currentOrder.status
          );
        }
      };

      updateOrder();
    }, [myLocation, currentOrder, user]);

    return (
      <View style={styles.container}>
        <WrappedComponent {...props} />
        {currentOrder && currentOrder.status !== "delivered" && (
          <View
            style={[
              hocStyles.cartContainer,
              {
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
              },
            ]}
          >
            <View style={styles.flexRow}>
              <View style={styles.img}>
                <Image
                  source={require("@/assets/icons/bucket.png")}
                  style={{ width: 20, height: 20 }}
                />
              </View>
              <View style={{ width: "65%" }}>
                <CustomerText variants="h6" fontFamily={Fonts.SemiBold}>
                  #{currentOrder?.orderId}
                </CustomerText>
                <CustomerText variants="h9" fontFamily={Fonts.Medium}>
                  {currentOrder?.deliveryLocation?.address}
                </CustomerText>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/features/delivery/DeliveryMap",
                  params: {
                    data: JSON.stringify(currentOrder),
                  },
                });
              }}
              style={styles.btn}
            >
              <CustomerText
                variants="h8"
                style={{ color: Colors.secondary }}
                fontFamily={Fonts.Medium}
              >
                Continue
              </CustomerText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return WithLiveOrder;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 15,
    paddingVertical: 10,
    padding: 10,
    gap: 10,
  },
  img: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    height: "auto",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderWidth: 0.9,
    borderRadius: 5,
    borderColor: Colors.secondary,
  },
});

export default withLiveOrder;

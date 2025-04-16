import CustomerText from "@/components/ui/CustomText";
import { getOrderById } from "@/service/orderService";
import { useAuthStore } from "@/state/authStore";
import { hocStyles } from "@/styles/globalStyles";
import { Colors, Fonts } from "@/utils/Constants";
import { useNavigationState } from "@react-navigation/native";
import { router } from "expo-router";
import React, { FC, useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const withLiveStatus = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): FC<P> => {
  const WithLiveStatusComponent: FC<P> = (props) => {
    const { currentOrder, setCurrentOrder } = useAuthStore();
    const routeName = useNavigationState(
      (state) => state.routes[state.index]?.name
    );

    useEffect(() => {
      if (currentOrder?._id) {
        fetchOrderDetails();
      }
    }, [currentOrder?._id]);

    const fetchOrderDetails = async () => {
      const data = await getOrderById(currentOrder?._id as any);
      setCurrentOrder(data);
    };

    return (
      <View style={styles.container}>
        <WrappedComponent {...props} />
        {currentOrder &&
          routeName === "features/dashboard/ProductDashboard" && (
            <View
              style={[
                hocStyles.cartContainer,
                { flexDirection: "row", alignContent: "center" },
              ]}
            >
              <View style={styles.flexRow}>
                <View style={styles.img}>
                  <Image
                    source={require("@assets/icons/bucket.png")}
                    style={{ width: 20, height: 20 }}
                  />
                </View>
                <View style={{ width: "60%" }}>
                  <CustomerText variants="h7" fontFamily={Fonts.SemiBold}>
                    Order is {currentOrder?.status}
                  </CustomerText>
                  <CustomerText variants="h9" fontFamily={Fonts.SemiBold}>
                    {currentOrder?.items![0]?.item.name +
                      (currentOrder?.items?.length - 1 > 0
                        ? ` and ${currentOrder?.items?.length - 1} more item(s)`
                        : "")}
                  </CustomerText>
                </View>
              </View>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => router.navigate("/features/map/LiveTracking")}
              >
                <CustomerText
                  fontFamily={Fonts.Medium}
                  variants="h8"
                  style={{ color: Colors.secondary }}
                >
                  View
                </CustomerText>
              </TouchableOpacity>
            </View>
          )}
      </View>
    );
  };

  return WithLiveStatusComponent;
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
    borderWidth: 0.7,
    borderRadius: 5,
    borderColor: Colors.secondary,
  },
});

export default withLiveStatus;

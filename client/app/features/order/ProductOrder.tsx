import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { FC, useState } from "react";
import CustomHeader from "@/components/ui/CustomHeader";
import { Colors, Fonts } from "@/utils/Constants";
import OrderList from "./OrderList";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import CustomerText from "@/components/ui/CustomText";
import { useCartStore } from "@/state/cartStore";
import BillDetails from "./BillDetails";
import { hocStyles } from "@/styles/globalStyles";
import { useAuthStore } from "@/state/authStore";
import ArrowButtom from "@/components/ui/ArrowButtom";
import { router } from "expo-router";
import { createOrder } from "@/service/orderService";

const ProductOrder: FC = () => {
  const { getTotalPrice, cart, clearCart } = useCartStore();
  const { user, setCurrentOrder, currentOrder } = useAuthStore();
  const totalItemPrice = getTotalPrice();
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (currentOrder !== null) {
      Alert.alert("Let your first order to be delivered");
      return;
    }
    const formattedData = cart.map((item) => ({
      id: item._id,
      item: item._id,
      count: item.count,
    }));
    if (formattedData.length == 0) {
      Alert.alert("Add any items to place order");
      return;
    }
    setLoading(true);
    const data = await createOrder(formattedData, totalItemPrice);

    if (data != null) {
      setCurrentOrder(data);
      clearCart();
      router.navigate("/features/order/OrderSuccess", { ...data });
    } else {
      Alert.alert("There was an error");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Checkout" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <OrderList />

        <View style={styles.flexRowBetwen}>
          <View style={styles.flexRow}>
            <Image
              source={require("@assets/icons/coupon.png")}
              style={{ width: 25, height: 25 }}
            />
            <CustomerText variants="h6" fontFamily={Fonts.SemiBold}>
              Use Coupons
            </CustomerText>
          </View>
          <Ionicons
            name="chevron-forward"
            size={RFValue(16)}
            color={Colors.text}
          />
        </View>

        <BillDetails totalItemPrice={totalItemPrice} />

        <View style={styles.flexRowBetwen}>
          <View>
            <CustomerText variants="h8" fontFamily={Fonts.SemiBold}>
              Cancellation Policy
            </CustomerText>
            <CustomerText
              variants="h9"
              style={styles.cancelText}
              fontFamily={Fonts.SemiBold}
            >
              Orders cannot be cancelled once packed for delivery, In case of
              unexpected delays, a refund will be provided, if applicable
            </CustomerText>
          </View>
        </View>
      </ScrollView>

      <View style={hocStyles.cartContainer}>
        <View style={styles.abosoluteContainer}>
          <View style={styles.addressContainer}>
            <View style={styles.flexRow}>
              <Image
                source={require("@assets/icons/home.png")}
                style={{ width: 20, height: 20 }}
              />
              <View style={{ width: "75%" }}>
                <CustomerText variants="h8" fontFamily={Fonts.Medium}>
                  Delivering to Home
                </CustomerText>
                <CustomerText
                  variants="h9"
                  numberOfLines={2}
                  style={{ opacity: 0.6 }}
                >
                  {user?.address}
                </CustomerText>
              </View>
            </View>
            <TouchableOpacity>
              <CustomerText
                fontFamily={Fonts.SemiBold}
                variants="h8"
                style={{ color: Colors.secondary }}
              >
                Change
              </CustomerText>
            </TouchableOpacity>
          </View>

          <View style={styles.paymentGateway}>
            <View style={{ width: "30%" }}>
              <CustomerText fontSize={RFValue(6)} fontFamily={Fonts.Regular}>
                PAY USING
              </CustomerText>
              <CustomerText
                variants="h9"
                style={{ marginTop: 2 }}
                fontFamily={Fonts.Regular}
              >
                Cash on Delivery
              </CustomerText>
            </View>
            <View style={{ width: "70%" }}>
              <ArrowButtom
                title="Place Order"
                loading={loading}
                price={totalItemPrice}
                onPress={async () => {
                  await handlePlaceOrder();
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addressContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
  },
  abosoluteContainer: {
    marginVertical: 15,
    marginBottom: Platform.OS == "ios" ? 30 : 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 10,
    paddingBottom: 250,
    backgroundColor: Colors.backgroundSecondary,
  },
  flexRowBetwen: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    flexDirection: "row",
    borderRadius: 15,
  },
  flexRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  cancelText: {
    marginTop: 4,
    opacity: 0.6,
  },
  paymentGateway: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 14,
  },
});

export default ProductOrder;

import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { useAuthStore } from "@/state/authStore";
import { useCartStore } from "@/state/cartStore";
import { fetchCustomerOrder } from "@/service/orderService";
import CustomerText from "@/components/ui/CustomText";
import { Fonts } from "@/utils/Constants";
import CustomHeader from "@/components/ui/CustomHeader";
import WalletSection from "./WalletSection";
import ActionButton from "./ActionButton";
import OrderItem from "./OrderItem";

const Profile: FC = () => {
  const [orders, setOrder] = useState([]);
  const { logout, user } = useAuthStore();
  const { clearCart } = useCartStore();

  const fetchOrders = async () => {
    const data = await fetchCustomerOrder(user?._id);
    setOrder(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderHeader = () => {
    return (
      <View>
        <CustomerText variants="h3" fontFamily={Fonts.SemiBold}>
          Your account
        </CustomerText>
        <CustomerText variants="h7" fontFamily={Fonts.Medium}>
          {user?.phone}
        </CustomerText>
        <WalletSection />

        <CustomerText variants="h8" style={styles.information}>
          YOUR INFORMATION
        </CustomerText>
        <ActionButton icon="book-outline" label="Address book" />
      </View>
    );
  };

  const renderOrders = ({ item }: any) => {
    return <OrderItem />;
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Profile" />
      <FlatList
        data={orders}
        ListEmptyComponent={renderHeader}
        renderItem={renderOrders}
        keyExtractor={(item: any) => item?.orderId}
        contentContainerStyle={styles.scrollViewContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    padding: 10,
    paddingTop: 20,
    paddingBottom: 10,
  },
  information: {
    opacity: 0.7,
    marginBottom: 20,
  },
  pastTest: { marginVertical: 20, opacity: 0.7 },
});

export default Profile;

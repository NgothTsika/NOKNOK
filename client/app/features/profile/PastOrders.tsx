// app/features/profile/PastOrders.tsx
import { View, StyleSheet, FlatList } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { useAuthStore } from "@/state/authStore";
import { fetchCustomerOrders } from "@/service/orderService";
import CustomHeader from "@/components/ui/CustomHeader";
import CustomerText from "@/components/ui/CustomText";
import { Fonts } from "@/utils/Constants";
import OrderItem from "./OrderItem";

// Adjust path if needed

const PastOrders: FC = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuthStore();

  useEffect(() => {
    const getOrders = async () => {
      if (user?._id) {
        const data = await fetchCustomerOrders(user._id);
        setOrders(data);
      }
    };
    getOrders();
  }, [user]);

  const renderItem = ({ item, index }: any) => (
    <OrderItem item={item} index={index} />
  );

  return (
    <View style={styles.container}>
      <CustomHeader title="Past Orders" />
      {orders.length > 0 ? (
        <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={(item: any, index: number) =>
            item?.orderId?.toString() || index.toString()
          }
          contentContainerStyle={styles.content}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <CustomerText variants="h7" fontFamily={Fonts.Medium}>
            No past orders found.
          </CustomerText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 16 },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PastOrders;

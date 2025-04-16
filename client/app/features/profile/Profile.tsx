import { View, Text, StyleSheet } from "react-native";
import React, { FC, useState } from "react";
import { useAuthStore } from "@/state/authStore";
import { useCartStore } from "@/state/cartStore";
import { fetchCustomerOrder } from "@/service/orderService";

const Profile: FC = () => {
  const [orders, setOrder] = useState([]);
  const { logout, user } = useAuthStore();
  const { clearCart } = useCartStore();

  const fetchOrders = async () => {
    const data = await fetchCustomerOrder(user?._id);
    setOrder(data);
  };

  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default Profile;

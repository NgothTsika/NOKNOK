import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/utils/Constants";
import DeliveryHeader from "@/components/delivery/DeliveryHeader";
import { useAuthStore } from "@/state/authStore";
import TabBar from "@/components/delivery/TabBar";
import { fetchOrders } from "@/service/orderService";
import { RefreshControl } from "react-native-gesture-handler";
import CustomerText from "@/components/ui/CustomText";
import DeliveryOrderItem from "@/components/delivery/DeliveryOrderItem";

const DeliveryDashboard = () => {
  const { user } = useAuthStore();
  const [selectedTab, setSelectedTab] = useState<"pending" | "delivered">(
    "pending"
  );
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const renderOrderItem = ({ item, index }: any) => (
    <DeliveryOrderItem index={index} item={item} />
  );

  const fetchData = async () => {
    setData([]);
    setRefreshing(true);
    setLoading(true);
    const data = await fetchOrders(selectedTab, user?._id, user?.branch);
    setData(data);
    setRefreshing(false);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [selectedTab]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <DeliveryHeader name={user?.name} email={user?.email} />
      </SafeAreaView>
      <View style={styles.subContainer}>
        <TabBar selectedTab={selectedTab} onTabChange={setSelectedTab} />

        <FlatList
          data={data}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={async () => await fetchData()}
            />
          }
          ListEmptyComponent={() => {
            if (loading) {
              return (
                <View style={styles.center}>
                  <ActivityIndicator color={Colors.secondary} size="small" />
                </View>
              );
            }
            return (
              <View style={styles.center}>
                <CustomerText>No Orders found yet!</CustomerText>
              </View>
            );
          }}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.orderId}
          contentContainerStyle={styles.flatlistContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  subContainer: {
    backgroundColor: Colors.backgroundSecondary,
    flex: 1,
    padding: 6,
  },
  flatlistContainer: {
    padding: 2,
    flexGrow: 1,
  },
  center: {
    flex: 1,
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DeliveryDashboard;

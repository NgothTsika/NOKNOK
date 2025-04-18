// app/features/profile/Profile.tsx
import { View, StyleSheet } from "react-native";
import React, { FC } from "react";
import { useAuthStore } from "@/state/authStore";
import { useCartStore } from "@/state/cartStore";
import CustomerText from "@/components/ui/CustomText";
import { Fonts } from "@/utils/Constants";
import CustomHeader from "@/components/ui/CustomHeader";
import ActionButton from "./ActionButton";
import WalletSection from "./WalletSection";
import { router } from "expo-router";
import { asyncStorage } from "@/state/storage";

const Profile: FC = () => {
  const { logout, user } = useAuthStore();
  const { clearCart } = useCartStore();

  return (
    <View style={styles.container}>
      <CustomHeader title="Profile" />
      <View style={styles.content}>
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
        <ActionButton icon="information-circle-outline" label="About us" />

        <ActionButton
          icon="archive-outline"
          label="Order story"
          onPress={() => router.push("/features/profile/PastOrders")}
        />

        <ActionButton
          icon="log-out-outline"
          label="Logout"
          onPress={async () => {
            clearCart();
            logout();
            await asyncStorage.clearAll();
            router.navigate("/features/auth/CustomerLogin");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 16 },
  information: { opacity: 0.7, marginVertical: 20 },
});

export default Profile;

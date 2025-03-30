import {
  View,
  Text,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { FC, useState } from "react";
import { Dimensions } from "react-native";
import { router } from "expo-router";
import { deliveryLogin } from "@/service/authService";
import LottieView from "lottie-react-native";
import CustomerText from "@/components/ui/CustomText";
import { Fonts } from "@/utils/Constants";
import CustomInput from "@/components/ui/CustomInput";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/ui/CustomButton";

const DeliverLogin: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await deliveryLogin(email, password);
      router.navigate("/features/delivery/DeliveryDashboard");
    } catch (error) {
      Alert.alert("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        className="h-full w-full"
      >
        <View className="flex-1 py-5 px-8 items-center">
          <View style={styles.lottieCOntainer}>
            <LottieView
              autoPlay
              loop
              style={styles.lottie}
              source={require("@assets/animations/delivery_man.json")}
            />
          </View>

          <CustomerText variants="h3" fontFamily={Fonts.Bold}>
            Delivery Partner Portal
          </CustomerText>

          <CustomerText variants="h7" fontFamily={Fonts.SemiBold}>
            Faster than Fash
          </CustomerText>

          <CustomInput
            onChangeText={setEmail}
            value={email}
            left={
              <Ionicons
                name="mail-outline"
                color="#F8890E"
                size={24}
                className="ml-4"
              />
            }
            placeholder="Email"
            inputMode="email"
            right={false}
          />
          <CustomInput
            onChangeText={setPassword}
            value={password}
            left={
              <Ionicons
                name="key-sharp"
                color="#F8890E"
                size={24}
                className="ml-4"
              />
            }
            placeholder="• • • • • • • •"
            secureTextEntry
            right={false}
          />
          <CustomButton
            disabled={email.length == 0 || password.length < 8}
            title="Login"
            onPress={handleLogin}
            loading={loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeliverLogin;

const styles = StyleSheet.create({
  lottie: {
    height: "100%",
    width: "100%",
  },
  lottieCOntainer: {
    height: Dimensions.get("window").height * 0.2,
    width: "100%",
  },
  texet: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
});

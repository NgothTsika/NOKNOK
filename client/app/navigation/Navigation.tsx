import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../features/auth/SplashScreen";
import DeliverLogin from "../features/auth/DeliverLogin";
import CustomerLogin from "../features/auth/CustomerLogin";
import DeliveryDashboard from "../features/delivery/DeliveryDashboard";
import ProductDashboard from "../features/dashboard/ProductDashboard";

const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="ProductDashboard" component={ProductDashboard} />
      <Stack.Screen name="DeliveryDashboard" component={DeliveryDashboard} />
      <Stack.Screen
        name="DeliveryLogin"
        component={DeliverLogin}
        options={{ animation: "fade" }}
      />
      <Stack.Screen
        name="CustomerLogin"
        component={CustomerLogin}
        options={{ animation: "fade" }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;

import React, { FC, useEffect, useRef, useState } from "react";
import {
  View,
  SafeAreaView,
  Animated,
  StyleSheet,
  Image,
  Keyboard,
  Alert,
} from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import ProductSlider from "../../../components/login/ProductSlider";
import Logo from "../../../assets/images/logo.png";
import CustomerText from "@/components/ui/CustomText";
import { Fonts, lightColors } from "@/utils/Constants";
import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";
import useKeyboardOffsetHeight from "@/components/ui/useKeyboardOffset";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient"; // Use expo-linear-gradient
import { customerLogin } from "@/service/authService";
import { router } from "expo-router";
import { getAndSendLocation } from "@/utils/locationHelprs";
import { useAuthStore } from "@/state/authStore";
import { asyncStorage } from "@/state/storage";

const bottomColors: [string, string, ...string[]] = [
  ...lightColors,
].reverse() as [string, string, ...string[]];

const CustomerLogin: FC = () => {
  const { setUser } = useAuthStore();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [gestureSequence, setGestureSequence] = useState<string[]>([]);
  const keyboardOffsetHeight = useKeyboardOffsetHeight();

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (keyboardOffsetHeight == 0) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: -keyboardOffsetHeight * 0.84,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [keyboardOffsetHeight]);

  // const handleAuth = async () => {
  //   Keyboard.dismiss();
  //   setLoading(true);
  //   try {
  //     await customerLogin(phoneNumber);
  //     await getAndSendLocation(setUser);
  //     router.replace("/features/dashboard/ProductDashboard");
  //   } catch (error: any) {
  //     if (error.response?.status === 401) {
  //       Alert.alert("Unauthorized", "Invalid phone number or credentials");
  //     } else {
  //       Alert.alert("Login Failed", "An unexpected error occurred");
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // const handleAuth = async () => {
  //   Keyboard.dismiss();
  //   setLoading(true);
  //   try {
  //     const user = await customerLogin(phoneNumber);
  //     if (user) {
  //       await asyncStorage.setItem("user", JSON.stringify(user));
  //       setUser(user);
  //       await getAndSendLocation(setUser);
  //       router.replace("/features/dashboard/ProductDashboard");
  //     } else {
  //       Alert.alert("Login Failed", "No user returned from server");
  //     }
  //   } catch (error: any) {
  //     if (error.response?.status === 401) {
  //       Alert.alert("Unauthorized", "Invalid phone number or credentials");
  //     } else {
  //       Alert.alert("Login Failed", "An unexpected error occurred");
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleAuth = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      const user = await customerLogin(phoneNumber); // tokens are already saved in customerLogin
      if (user) {
        await asyncStorage.setItem("user", JSON.stringify(user)); // optional if you still want to cache the user
        setUser(user);
        await getAndSendLocation(setUser);
        router.replace("/features/dashboard/ProductDashboard");
      } else {
        Alert.alert("Login Failed", "No user returned from server");
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        Alert.alert("Unauthorized", "Invalid phone number or credentials");
      } else {
        Alert.alert("Login Failed", "An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGesture = ({ nativeEvent }: any) => {
    if (!nativeEvent) return;

    if (nativeEvent.state === State.END) {
      const { translationX, translationY } = nativeEvent;
      let direction = "";

      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? "right" : "left";
      } else {
        direction = translationY > 0 ? "down" : "up";
      }

      console.log("Gesture detected:", translationX, translationY, direction);

      const newSequence = [...gestureSequence, direction].slice(-5);
      setGestureSequence(newSequence);

      if (newSequence.join(" ") === "up up down left right") {
        setGestureSequence([]);
        router.navigate("/features/auth/DeliverLogin");
      }
    }
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <View className="flex-1">
        <SafeAreaView className="flex-1">
          <ProductSlider />
          <PanGestureHandler onHandlerStateChange={handleGesture}>
            <Animated.ScrollView
              contentContainerStyle={styles.subContainer}
              bounces={false}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="handled"
              style={{ transform: [{ translateY: animatedValue }] }}
            >
              <LinearGradient colors={bottomColors} style={styles.gradient} />
              <View className=" bg-[#f8f9fc]  py-5 w-full items-center justify-center  px-5 pb-7">
                <Image source={Logo} className="h-16 w-16 mx-3 rounded-3xl" />
                <CustomerText variants="h3" fontFamily={Fonts.Bold}>
                  Congo's last minute app{" "}
                </CustomerText>
                <CustomerText
                  variants="h5"
                  fontFamily={Fonts.SemiBold}
                  style={styles.text}
                >
                  Log in or sign up
                </CustomerText>

                <CustomInput
                  onChangeText={(text) => {
                    setPhoneNumber(text.slice(0, 10));
                  }}
                  onClear={() => setPhoneNumber("")}
                  value={phoneNumber}
                  left={
                    <CustomerText
                      style={styles.phoneText}
                      variants="h5"
                      fontFamily={Fonts.SemiBold}
                    >
                      + 233
                    </CustomerText>
                  }
                  placeholder="Enter mobile number"
                  inputMode="numeric"
                />

                <CustomButton
                  title="Continue"
                  disabled={phoneNumber?.length != 9}
                  onPress={() => handleAuth()}
                  loading={loading}
                />
              </View>
            </Animated.ScrollView>
          </PanGestureHandler>
        </SafeAreaView>
        <View className="w-full p-3 bg-[#f8f9fc] items-center justify-center absolute bottom-0 z-20 pb-3 border border-border border-t-[0.8] ">
          <SafeAreaView>
            <CustomerText fontSize={RFValue(7)}>
              By Continuing, you agree to our Terms of Service & Privacy Policy
            </CustomerText>
          </SafeAreaView>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default CustomerLogin;

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
  phoneText: {
    marginLeft: 10,
  },
  gradient: {
    paddingTop: 30,
    width: "100%",
  },
});

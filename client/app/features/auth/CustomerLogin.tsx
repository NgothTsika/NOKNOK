import React, { FC, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Animated,
  StyleSheet,
  Image,
} from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import ProductSlider from "../../../components/login/ProductSlider";
import { resetAndNavigate } from "../../../utils/NavigationUtils";
import Logo from "../../../assets/images/logo.png";
import CustomerText from "@/components/ui/CustomText";
import { Fonts } from "@/utils/Constants";
import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";

const CustomerLogin: FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [gestureSequence, setGestureSequence] = useState<string[]>([]);

  const handleAuth = async () => {};

  const handleGesture = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.END) {
      const { transaltionX, transaltionY } = nativeEvent;
      let direction = "";
      if (Math.abs(transaltionX) > Math.abs(transaltionY)) {
        direction = transaltionX > 0 ? "right" : "left";
      } else {
        direction = transaltionY > 0 ? "down" : "up";
      }
      console.log(transaltionX, transaltionY, direction);

      const newSequence = [...gestureSequence, direction].slice(-5);
      setGestureSequence(newSequence);

      if (newSequence.join(" ") === "up up down left right") {
        setGestureSequence([]);
        resetAndNavigate("DeliveryLogin"); //check route after
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
            />
          </PanGestureHandler>
          {/* Place the View containing the Image at the bottom */}
          <View className="absolute bottom-8 w-full items-center justify-center  px-5 pb-5">
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
                  variants="h6"
                  fontFamily={Fonts.SemiBold}
                >
                  + 242
                </CustomerText>
              }
              placeholder="Enter mobile number"
              inputMode="numeric"
            />

            <CustomButton
              title="Continue"
              disabled={phoneNumber?.length != 10}
              onPress={() => handleAuth()}
              loading={loading}
            />
          </View>
        </SafeAreaView>
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
});

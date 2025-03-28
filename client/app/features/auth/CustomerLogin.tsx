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

const CustomerLogin: FC = () => {
  const [gestureSequence, setGestureSequence] = useState<string[]>([]);

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
});

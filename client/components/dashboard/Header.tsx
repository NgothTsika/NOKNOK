import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { FC } from "react";
import CustomerText from "../ui/CustomText";
import { Fonts } from "@/utils/Constants";
import { RFValue } from "react-native-responsive-fontsize";
import { useAuthStore } from "@/state/authStore";
import { Ionicons } from "@expo/vector-icons";

const Header: FC<{ showNotice: () => void }> = ({ showNotice }) => {
  const { setUser, user } = useAuthStore();

  return (
    <View style={styles.subContainer}>
      <TouchableOpacity activeOpacity={0.8}>
        <CustomerText fontFamily={Fonts.Bold} variants="h8" style={styles.text}>
          Delivery in
        </CustomerText>
        <View className=" flex-row items-center gap-1  ">
          <CustomerText
            fontFamily={Fonts.SemiBold}
            variants="h2"
            style={styles.text}
          >
            10 minutes
          </CustomerText>
          <TouchableOpacity className="bg-[#E8EAF5] rounded-full px-2 py-1 -bottom-[3px] ">
            <CustomerText fontSize={RFValue(5)} fontFamily={Fonts.SemiBold}>
              🌧 Rain
            </CustomerText>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center gap-0 justify-center  w-[70%]  ">
          <CustomerText
            variants="h9"
            fontFamily={Fonts.Medium}
            style={styles.text2}
          >
            {user?.address || "Konwhere, Somewhere 😅"}
          </CustomerText>
          <Ionicons
            name="caret-down-outline"
            color="#fff"
            style={{ bottom: -2 }}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <Ionicons
          name="person-circle-outline"
          size={RFValue(36)}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    paddingTop: Platform.OS === "ios" ? 10 : 5,
  },
  text: {
    color: "#fff",
  },
  text2: {
    color: "#fff",
    width: "90%",
    textAlign: "center",
  },
});

export default Header;

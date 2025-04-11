import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { FC } from "react";
import { Colors, Fonts } from "@/utils/Constants";
import CustomerText from "./CustomText";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface ArrowButtomProps {
  title: string;
  onPress?: () => void;
  price?: number;
  loading?: boolean;
}

const ArrowButtom: FC<ArrowButtomProps> = ({
  title,
  onPress,
  price,
  loading,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        { justifyContent: price != 0 ? "space-between" : "center" },
      ]}
      activeOpacity={0.8}
      disabled={loading}
      onPress={onPress}
    >
      {price != 0 && price && (
        <View>
          <CustomerText
            variants="h6"
            style={{ color: "white" }}
            fontFamily={Fonts.SemiBold}
          >
            ${price + 34}.0
          </CustomerText>
          <CustomerText
            fontFamily={Fonts.Medium}
            style={{ color: "white" }}
            variants="h9"
          >
            TOTAL
          </CustomerText>
        </View>
      )}
      <View
        style={[
          styles.flexRow,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <CustomerText
          variants="h6"
          style={{ color: "#fff" }}
          fontFamily={Fonts.Medium}
        >
          {title}
        </CustomerText>
        {loading ? (
          <ActivityIndicator
            style={{ marginHorizontal: 5 }}
            color="white"
            size="small"
          />
        ) : (
          <Ionicons name="chevron-forward" color="#fff" size={RFValue(20)} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.secondary,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ArrowButtom;

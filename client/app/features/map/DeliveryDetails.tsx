import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Colors, Fonts } from "@/utils/Constants";
import { Ionicons } from "@expo/vector-icons";
import CustomerText from "@/components/ui/CustomText";

const DeliveryDetails: FC<{ details: any }> = ({ details }) => {
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.iconContainer}>
          <Ionicons name="bicycle" size={24} color={Colors.disabled} />
        </View>
        <View>
          <CustomerText variants="h5" fontFamily={Fonts.SemiBold}>
            Your delivery details
          </CustomerText>
          <CustomerText variants="h8" fontFamily={Fonts.Medium}>
            Details of your current order
          </CustomerText>
        </View>
      </View>
      <View style={styles.flexRow2}>
        <View style={styles.iconContainer}>
          <Ionicons size={24} name="location-outline" color={Colors.disabled} />
        </View>
        <View style={{ width: "80%" }}>
          <CustomerText variants="h5" fontFamily={Fonts.Medium}>
            Dekivery at Home
          </CustomerText>
          <CustomerText
            numberOfLines={2}
            variants="h8"
            fontFamily={Fonts.Regular}
          >
            {details?.address || "-----"}
          </CustomerText>
        </View>
      </View>

      <View style={styles.flexRow2}>
        <View style={styles.iconContainer}>
          <Ionicons size={24} name="call-outline" color={Colors.disabled} />
        </View>
        <View style={{ width: "80%" }}>
          <CustomerText variants="h5" fontFamily={Fonts.Medium}>
            {details?.name || "___"}
            {details?.phone || "XXXXXXXXX"}
          </CustomerText>
          <CustomerText
            numberOfLines={2}
            variants="h8"
            fontFamily={Fonts.Regular}
          >
            Receiver's contact no.
          </CustomerText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 15,
    marginVertical: 15,
    paddingVertical: 10,
    backgroundColor: "#FFF",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
  },
  flexRow2: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  iconContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DeliveryDetails;

import { View, StyleSheet } from "react-native";
import React, { FC } from "react";
import CustomerText from "@/components/ui/CustomText";
import { Colors, Fonts } from "@/utils/Constants";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

const ReportItem: FC<{
  iconName: any;
  underline?: boolean;
  title: string;
  price: number;
}> = ({ iconName, underline, title, price }) => {
  return (
    <View style={[styles.flexRowBetween, { marginBottom: 10 }]}>
      <View style={styles.flexRow}>
        <Ionicons
          name={iconName as any}
          style={{ opacity: 0.7 }}
          size={RFValue(12)}
          color={Colors.text}
        />
        <CustomerText
          style={{
            textDecorationLine: underline ? "underline" : "none",
            textDecorationStyle: "dashed",
          }}
          variants="h8"
        >
          {title}
        </CustomerText>
      </View>
      <CustomerText variants="h8">${price}</CustomerText>
    </View>
  );
};

const BillDetails: FC<{ totalItemPrice: number }> = ({ totalItemPrice }) => {
  return (
    <View style={styles.container}>
      <CustomerText style={styles.text} fontFamily={Fonts.SemiBold}>
        Bill Details
      </CustomerText>
      <View style={styles.billContainer}>
        <ReportItem
          iconName="basket-outline"
          title="Items total"
          price={totalItemPrice}
        />
        <ReportItem
          iconName="bicycle-outline"
          title="Delivery charge"
          price={29}
        />
        <ReportItem
          iconName="bag-handle-outline"
          title="Handling charge"
          price={2}
        />
        <ReportItem
          iconName="thunderstorm-outline"
          title="Surge charge"
          price={3}
        />
      </View>
      <View style={[styles.flexRowBetween, { marginBottom: 15 }]}>
        <CustomerText
          variants="h7"
          style={styles.text}
          fontFamily={Fonts.SemiBold}
        >
          Grand Total
        </CustomerText>
        <CustomerText style={styles.text} fontFamily={Fonts.SemiBold}>
          ${totalItemPrice + 34}
        </CustomerText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    marginVertical: 15,
    backgroundColor: "#fff",
  },
  text: {
    marginHorizontal: 10,
    marginTop: 15,
  },
  billContainer: {
    padding: 10,
    paddingBottom: 0,
    borderBottomColor: Colors.border,
    borderBottomWidth: 0.7,
  },
  flexRowBetween: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
export default BillDetails;

import { View, StyleSheet, Image } from "react-native";
import React, { FC } from "react";
import { Colors, Fonts } from "@/utils/Constants";
import CustomerText from "@/components/ui/CustomText";
import UniversalAdd from "@/components/ui/UniversalAdd";

const OrderItem: FC<{ item: any }> = ({ item }) => {
  return (
    <View style={styles.fleRow}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item?.item?.image }} style={styles.img} />
      </View>
      <View style={{ width: "55%" }}>
        <CustomerText numberOfLines={2} variants="h8" fontFamily={Fonts.Medium}>
          {item.item.name}
        </CustomerText>
        <CustomerText variants="h9">{item.item.qunatity}</CustomerText>
      </View>
      <View style={{ width: "20%", alignItems: "flex-end" }}>
        <UniversalAdd item={item.item} />
        <CustomerText
          variants="h8"
          fontFamily={Fonts.Medium}
          style={{ alignSelf: "flex-end", marginTop: 4 }}
        >
          ${item.count * item.item.price}
        </CustomerText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 40,
    height: 40,
  },
  imageContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    borderRadius: 15,
    width: "17%",
  },
  fleRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: "12",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderTopWidth: 0.6,
    borderTopColor: Colors.border,
  },
});

export default OrderItem;

import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { FC } from "react";
import { useCartStore } from "@/state/cartStore";
import { Colors, Fonts } from "@/utils/Constants";
import CustomerText from "./CustomText";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

const UniversalAdd: FC<{ item: any }> = ({ item }) => {
  const count = useCartStore((state) => state.getItemCount(item._id));
  const { addItem, removeItem } = useCartStore();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: count === 0 ? "#fff" : Colors.secondary },
      ]}
    >
      {count === 0 ? (
        <Pressable onPress={() => addItem(item)} style={styles.add}>
          <CustomerText
            variants="h9"
            fontFamily={Fonts.SemiBold}
            style={styles.addText}
          >
            ADD
          </CustomerText>
        </Pressable>
      ) : (
        <View style={styles.counterContainer}>
          <Pressable onPress={() => removeItem(item._id)}>
            <Ionicons name="remove" color="#fff" size={RFValue(13)} />
          </Pressable>
          <CustomerText
            fontFamily={Fonts.SemiBold}
            style={styles.text}
            variants="h8"
          >
            {count}
          </CustomerText>
          <Pressable onPress={() => addItem(item)}>
            <Ionicons name="add" color="#fff" size={RFValue(13)} />
          </Pressable>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.secondary,
    width: 65,
    borderRadius: 8,
  },
  add: {
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    paddingVertical: 6,
  },
  addText: {
    color: Colors.secondary,
    textAlign: "center",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 4,
    paddingVertical: 6,
    justifyContent: "space-between",
  },
  text: {
    color: "#fff",
  },
});

export default UniversalAdd;

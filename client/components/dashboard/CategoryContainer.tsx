import { View, Text, Image, StyleSheet } from "react-native";
import React, { FC } from "react";
import ScalePress from "../ui/ScalePress";
import { router } from "expo-router";
import CustomerText from "../ui/CustomText";
import { Fonts } from "@/utils/Constants";

const CategoryContainer: FC<{ data: any }> = ({ data }) => {
  const renderItems = (items: any[]) => {
    return (
      <>
        {items.map((item, index) => {
          return (
            <ScalePress
              onPress={() =>
                router.navigate("/features/dashboard/ProductDashboard")
              }
              key={index}
              style={styles.item}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={item.image}
                  resizeMode="contain"
                  style={styles.image}
                />
              </View>
              <CustomerText
                variants="h8"
                fontFamily={Fonts.Medium}
                style={styles.text}
              >
                {item.name}
              </CustomerText>
            </ScalePress>
          );
        })}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>{renderItems(data?.slice(0, 4))}</View>
      <View style={styles.row}>{renderItems(data?.slice(4))}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  text: {
    textAlign: "center",
  },
  item: {
    width: "22%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E5F3F3",
    borderRadius: 10,
    marginBottom: 8,
    padding: 6,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
export default CategoryContainer;

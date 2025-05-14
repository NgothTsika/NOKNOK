import React, { FC } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import CustomerText from "../ui/CustomText";
import { Fonts } from "@/utils/Constants";

interface Category {
  _id: string;
  name: string;
  image: any; // Replace with string if you're using a URL
}

interface Props {
  categories: Category[];
}

const ProductSliderScroll: FC<Props> = ({ categories }) => {
  const dataToShow = categories.slice(0, 6);

  return (
    <View style={styles.container}>
      <FlatList
        data={dataToShow}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              router.push({
                pathname: "/features/category/ProductCategories",
                params: { selectedCategoryId: item._id },
              })
            }
          >
            <View style={styles.imageContainer}>
              <Image
                source={item.image}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            <CustomerText
              variants="h8"
              fontFamily={Fonts.Medium}
              style={styles.text}
            >
              {item.name}
            </CustomerText>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <TouchableOpacity
            style={[styles.item, styles.seeMore]}
            onPress={() => router.push("/features/category/ProductCategories")}
          >
            <View
              style={[styles.imageContainer, { backgroundColor: "#E0E0E0" }]}
            >
              <CustomerText
                variants="h8"
                fontFamily={Fonts.Bold}
                style={{ textAlign: "center" }}
              >
                +
              </CustomerText>
            </View>
            <CustomerText variants="h8" fontFamily={Fonts.Medium}>
              See More
            </CustomerText>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  list: {
    gap: 15,
  },
  item: {
    width: 80,
    alignItems: "center",
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#E5F3F3",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    textAlign: "center",
    fontSize: 12,
  },
  seeMore: {
    justifyContent: "center",
  },
});

export default ProductSliderScroll;

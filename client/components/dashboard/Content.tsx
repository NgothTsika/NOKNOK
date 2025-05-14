import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import AdCorousal from "./AdCorousal";
import { adData, categories } from "@/utils/dummyData";
import CustomerText from "../ui/CustomText";
import { Fonts } from "@/utils/Constants";
import CategoryContainer from "./CategoryContainer";
import ProductSliderScroll from "./ProductSliderScroll";

const Content = () => {
  return (
    <View className="px-5">
      <AdCorousal adData={adData} />
      <CustomerText variants="h5" fontFamily={Fonts.SemiBold}>
        Category
      </CustomerText>
      <ProductSliderScroll
        categories={categories.map((cat) => ({
          _id: cat.id.toString(),
          name: cat.name,
          image: cat.image,
        }))}
      />
      <CustomerText variants="h5" fontFamily={Fonts.SemiBold}>
        Bestsellers
      </CustomerText>
      <CategoryContainer data={categories} />
      <CustomerText variants="h5" fontFamily={Fonts.SemiBold}>
        Snack & Drinks
      </CustomerText>
      <CategoryContainer data={categories} />
      <CustomerText variants="h5" fontFamily={Fonts.SemiBold}>
        Home & Lifestyle
      </CustomerText>
      <CategoryContainer data={categories} />
    </View>
  );
};

export default Content;

import { Dimensions, Platform } from "react-native";

export const screenWidth: number = Dimensions.get("window").width;
export const screenheight: number = Dimensions.get("window").height;

export const NoticeHeight =
  Platform.OS === "ios" ? screenheight * 0.12 : screenheight * 0.07;

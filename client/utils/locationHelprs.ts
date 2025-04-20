// utils/locationHelpers.ts
import * as Location from "expo-location";
import { updateUserLocation } from "@/service/authService";

export const getAndSendLocation = async (setUser: any) => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;

    const { coords } = await Location.getCurrentPositionAsync({});
    await updateUserLocation(
      {
        liveLocation: {
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
      },
      setUser
    );
  } catch (error) {
    console.log("Location fetch/send error", error);
  }
};

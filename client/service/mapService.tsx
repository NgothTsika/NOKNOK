import axios from "axios";
import { updateUserLocation } from "./authService";
import * as Location from "expo-location";
// import { GOOGLE_MAP_API } from "./config";

export const reverseGeocode = async (
  latitude: number,
  longitude: number,
  setUser: any
) => {
  try {
    const result = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (result && result.length > 0) {
      const address = `${result[0].name}, ${result[0].city}`;
      updateUserLocation(
        { liveLocation: { latitude, longitude }, address },
        setUser
      );
    }
    // const response = await axios.get(
    //   `https://maps.googleapis.com/api/geocode/json?latlng=${latitude},${longitude}&key${GOOGLE_MAP_API}`
    // );
    // if (response.data.status == "OK") {
    //   const address = response.data.result[0].formatted_address;
    //   updateUserLocation(
    //     { liveLocation: { latitude, longitude }, address },
    //     setUser
    //   );}
    else {
      console.log("Geo Code Failded");
    }
  } catch (error) {
    console.log("Geo Code Failded");
  }
};

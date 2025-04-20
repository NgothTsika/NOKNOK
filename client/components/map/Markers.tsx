import React from "react";
import { Image, StyleSheet } from "react-native";
import { Marker } from "react-native-maps"; // ✅ Use this directly, not MarkerView

const Markers = ({
  deliveryLocation,
  pickupLocation,
  deliveryPersonLocation,
}: any) => {
  return (
    <>
      {deliveryLocation?.latitude && deliveryLocation?.longitude && (
        <Marker coordinate={deliveryLocation}>
          <Image
            source={require("@assets/icons/my_pin.png")}
            style={styles.markerImage}
          />
        </Marker>
      )}

      {pickupLocation?.latitude && pickupLocation?.longitude && (
        <Marker coordinate={pickupLocation}>
          <Image
            source={require("@assets/icons/store.png")}
            style={styles.markerImage}
          />
        </Marker>
      )}

      {deliveryPersonLocation?.latitude &&
        deliveryPersonLocation?.longitude && (
          <Marker coordinate={deliveryPersonLocation}>
            <Image
              source={require("@assets/icons/delivery.png")}
              style={styles.deliveryPersoneMarker}
            />
          </Marker>
        )}
    </>
  );
};

const styles = StyleSheet.create({
  markerImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  deliveryMarker: {
    width: 15,
    height: 15,
    resizeMode: "contain",
  },
  deliveryPersoneMarker: {
    width: 35,
    height: 35,
    resizeMode: "contain",
    position: "absolute",
    zIndex: 99,
  },
});

export default Markers;

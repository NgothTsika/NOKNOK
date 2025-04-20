import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { FC, useEffect } from "react";
import { screenheight } from "@/utils/Scalling";
import { Colors } from "@/utils/Constants";
import { useMapRefStore } from "@/state/mapStore";
import MapViewComponent from "@/components/map/MapView";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { hantleFitToPath } from "@/components/map/mapUtils";

interface LiveMapProps {
  deliveryPersonLocation: any;
  pickupLocation: any;
  deliveryLocation: any;
  hasPickedUp: any;
  hasAccepted: any;
}

const LiveMap: FC<LiveMapProps> = ({
  deliveryLocation,
  deliveryPersonLocation,
  hasAccepted,
  hasPickedUp,
  pickupLocation,
}) => {
  const { mapRef, setMapRef } = useMapRefStore();
  useEffect(() => {
    if (mapRef) {
      hantleFitToPath(
        mapRef,
        deliveryLocation,
        pickupLocation,
        hasPickedUp,
        hasAccepted,
        deliveryPersonLocation
      );
    }
  }, [mapRef, deliveryPersonLocation, hasAccepted, hasPickedUp]);
  return (
    <View style={styles.container}>
      <MapViewComponent
        mapRef={mapRef}
        setMapRef={setMapRef}
        hasAccepted={hasAccepted}
        deliveryLocation={deliveryLocation}
        pickupLocation={pickupLocation}
        deliveryPersonLocation={deliveryPersonLocation}
        hasPickedUp={hasPickedUp}
      />
      <TouchableOpacity
        onPress={() => {
          hantleFitToPath(
            mapRef,
            deliveryLocation,
            pickupLocation,
            hasPickedUp,
            hasAccepted,
            deliveryPersonLocation
          );
        }}
        style={styles.fitButton}
      >
        <Ionicons
          name="locate-outline"
          size={RFValue(14)}
          color={Colors.text}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fitButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    padding: 5,
    backgroundColor: "#fff",
    borderWidth: 0.8,
    borderColor: Colors.border,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowColor: "Black",
    elevation: 5,
    borderRadius: 35,
  },
  container: {
    height: screenheight * 0.35,
    width: "100%",
    borderRadius: 15,
    backgroundColor: "#fff",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
    position: "relative",
  },
});

export default LiveMap;

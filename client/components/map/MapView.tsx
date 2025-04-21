import { customMapStyle } from "@/utils/CustomMap";
import React from "react";
import MapView, { Polyline } from "react-native-maps";
import Markers from "./Markers";
import { Colors } from "@/utils/Constants";
import { getPoints } from "./getPoints";

const MapViewComponent = ({
  mapRef,
  setMapRef,
  hasAccepted,
  hasPickedUp,
  deliveryLocation,
  pickupLocation,
  deliveryPersonLocation,
  camera,
  yourLocation,
}: any) => {
  return (
    <MapView
      ref={setMapRef}
      style={{ flex: 1 }}
      // ✅ Use native map provider (no Google Maps key required)
      initialRegion={{
        latitude: yourLocation?.latitude,
        longitude: yourLocation?.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      camera={camera}
      paddingAdjustmentBehavior="always"
      mapType="standard"
      customMapStyle={customMapStyle}
      showsUserLocation={true}
      userLocationCalloutEnabled={true}
      showsTraffic={false}
      pitchEnabled={false}
      followsUserLocation={true}
      showsCompass={true}
      showsBuildings={false}
      showsIndoors={false}
      showsScale={false}
      showsIndoorLevelPicker={false}
    >
      {/* 🚚 Polyline for delivery route (from driver to current target) */}
      {deliveryLocation && pickupLocation && deliveryPersonLocation && (
        <Polyline
          coordinates={getPoints([
            deliveryPersonLocation,
            hasAccepted ? pickupLocation : deliveryLocation,
          ])}
          strokeColor="#2871F2"
          strokeWidth={5}
        />
      )}

      {/* 📍 All Markers (custom markers recommended to avoid native <Marker /> if needed) */}
      <Markers
        deliveryPersonLocation={deliveryPersonLocation}
        deliveryLocation={deliveryLocation}
        pickupLocation={pickupLocation}
      />

      {/* 📦 Dashed line from pickup to delivery (if package not picked up yet) */}
      {!hasPickedUp && deliveryLocation && pickupLocation && (
        <Polyline
          coordinates={getPoints([pickupLocation, deliveryLocation])}
          strokeColor={Colors.text}
          strokeWidth={2}
          geodesic={true}
          lineDashPattern={[12, 10]}
        />
      )}
    </MapView>
  );
};

export default MapViewComponent;

import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

const { width, height } = Dimensions.get("window");

function getBoundingRegion(coords: { latitude: number; longitude: number }[]) {
  let minLat = coords[0].latitude,
    maxLat = coords[0].latitude;
  let minLng = coords[0].longitude,
    maxLng = coords[0].longitude;

  coords.forEach((coord) => {
    minLat = Math.min(minLat, coord.latitude);
    maxLat = Math.max(maxLat, coord.latitude);
    minLng = Math.min(minLng, coord.longitude);
    maxLng = Math.max(maxLng, coord.longitude);
  });

  const latitude = (minLat + maxLat) / 2;
  const longitude = (minLng + maxLng) / 2;
  const latitudeDelta = (maxLat - minLat) * 1.5 || 0.01;
  const longitudeDelta = (maxLng - minLng) * 1.5 || 0.01;

  return { latitude, longitude, latitudeDelta, longitudeDelta };
}

export default function RouteMapScreen() {
  const { routeData, startLocation, endLocation } = useLocalSearchParams<{
    routeData: string;
    startLocation: string;
    endLocation: string;
  }>();

  const route = JSON.parse(routeData);
  const start = JSON.parse(startLocation);
  const end = JSON.parse(endLocation);

  const routeCoordinates = route.geometry.coordinates.map(
    (coord: number[]) => ({
      latitude: coord[1],
      longitude: coord[0],
    })
  );

  const boundingRegion = getBoundingRegion(routeCoordinates);

  return (
    <View style={mapStyles.container}>
      <MapView style={mapStyles.map} initialRegion={boundingRegion}>
        {/* Start Marker */}
        <Marker
          coordinate={{
            latitude: start.latitude,
            longitude: start.longitude,
          }}
          title="Start"
          description={start.address}
          pinColor="green"
        />

        {/* End Marker */}
        <Marker
          coordinate={{
            latitude: end.latitude,
            longitude: end.longitude,
          }}
          title="End"
          description={end.address}
          pinColor="red"
        />

        {/* Route Path */}
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="#007AFF"
          strokeWidth={4}
          lineDashPattern={[0]}
        />
      </MapView>
    </View>
  );
}

const mapStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height,
  },
});

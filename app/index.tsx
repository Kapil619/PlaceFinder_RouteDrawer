import { useLocation } from "@/utils/LocationContext";
import { IndexStyles } from "@/utils/styles";
import { RouteOption } from "@/utils/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function RouteInputScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const { startLocation, setStartLocation, endLocation, setEndLocation } =
    useLocation();

  const [routeOptions, setRouteOptions] = useState<RouteOption[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params.selectedLocation && params.fieldType) {
      const location = JSON.parse(params.selectedLocation as string);
      const fieldType = params.fieldType as string;

      if (fieldType === "start") {
        setStartLocation(location);
      } else if (fieldType === "end") {
        setEndLocation(location);
      }

      router.setParams({ selectedLocation: "", fieldType: "" });
    }
  }, [params.selectedLocation, params.fieldType]);

  const handleLocationSearch = (fieldType: "start" | "end") => {
    router.push({
      pathname: "/search",
      params: { fieldType },
    });
  };

  const fetchRoute = async () => {
    if (!startLocation || !endLocation) {
      Alert.alert("Error", "Please select both start and end locations");
      return;
    }

    setLoading(true);
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${startLocation.longitude},${startLocation.latitude};${endLocation.longitude},${endLocation.latitude}?overview=full&geometries=geojson`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const routes = data.routes.map((route: any) => ({
          distance: route.distance,
          duration: route.duration,
          geometry: route.geometry,
        }));
        setRouteOptions(routes);
      } else {
        Alert.alert("Error", "No routes found");
      }
    } catch (error) {
      console.log("Error fetching route:", error);
      Alert.alert("Error", "Failed to fetch route");
    } finally {
      setLoading(false);
    }
  };

  const handleRouteSelect = (route: RouteOption) => {
    router.push({
      pathname: "/map",
      params: {
        routeData: JSON.stringify(route),
        startLocation: JSON.stringify(startLocation),
        endLocation: JSON.stringify(endLocation),
      },
    });
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.round(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${minutes}m`;
  };

  const formatDistance = (meters: number) => {
    const km = (meters / 1000).toFixed(1);
    return `${km} km`;
  };

  return (
    <View style={IndexStyles.container}>
      <View style={IndexStyles.inputSection}>
        <TouchableOpacity
          style={IndexStyles.inputField}
          onPress={() => handleLocationSearch("start")}
        >
          <Text style={IndexStyles.inputLabel}>Start Point</Text>
          <Text style={IndexStyles.inputText}>
            {startLocation
              ? startLocation.address
              : "Tap to select start location"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={IndexStyles.inputField}
          onPress={() => handleLocationSearch("end")}
        >
          <Text style={IndexStyles.inputLabel}>End Point</Text>
          <Text style={IndexStyles.inputText}>
            {endLocation ? endLocation.address : "Tap to select end location"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            IndexStyles.searchButton,
            (!startLocation || !endLocation) &&
              IndexStyles.searchButtonDisabled,
          ]}
          onPress={fetchRoute}
          disabled={!startLocation || !endLocation || loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={IndexStyles.searchButtonText}>Find Routes</Text>
          )}
        </TouchableOpacity>
      </View>

      {routeOptions.length > 0 && (
        <View style={IndexStyles.routeSection}>
          <Text style={IndexStyles.routeTitle}>Route Options:</Text>
          <FlatList
            data={routeOptions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={IndexStyles.routeOption}
                onPress={() => handleRouteSelect(item)}
              >
                <Text style={IndexStyles.routeOptionTitle}>
                  Route {index + 1}
                </Text>
                <Text style={IndexStyles.routeOptionDetail}>
                  Distance: {formatDistance(item.distance)}
                </Text>
                <Text style={IndexStyles.routeOptionDetail}>
                  Duration: {formatDuration(item.duration)}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

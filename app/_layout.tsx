import { LocationProvider } from "@/utils/LocationContext";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <LocationProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="search" options={{ title: "Search Location" }} />
          <Stack.Screen name="map" options={{ title: "Route Map" }} />
        </Stack>
      </LocationProvider>
    </GestureHandlerRootView>
  );
}

# 🗺️ Task 2 – Place Finder & Route Drawer (React Native)

This React Native application allows users to search for a **Start** and **End** location using live search powered by the **OneMap API**, fetch the driving route using **OSRM Routing API**, and draw the path visually on an interactive map using **GeoJSON**.

---

## ✅ Features

- 📍 **Live Location Search**
  - Powered by OneMap Singapore API
  - Displays a list of matching results as the user types
- ✍️ **Interactive Route Input**
  - Two fields: Start and End points
  - Select location via a search screen
- 🛣️ **Route Fetching**
  - Route is fetched using [OSRM](http://project-osrm.org/) API
- 🗺️ **Map Visualization**
  - Route is displayed on the map with zoom-to-fit using GeoJSON
- 🔁 **Multi-Screen Flow**
  - Input screen → Search screen → Route Map screen

---

## 📽️ Demo

> 👉 Available in the /assets directory  : https://github.com/Kapil619/PlaceFinder_RouteDrawer/blob/master/assets/placefinder.mp4

---

## 🔧 Tech Stack

- React Native (via Expo)
- Expo Router
- TypeScript
- react-native-maps
- react-native-svg
- OneMap Search API
- OSRM Routing API

---

## 🧪 How It Works

### Screen 1: Route Input

- Two input fields: Start Point and End Point
- On tap, user is navigated to a **search screen**

### Screen 2: Live Search

- As the user types, fetch suggestions using: OneMap Singapore API
- - Selecting a result sends the chosen coordinates back to the Route Input screen

### Screen 1 (continued)

- Once both locations are filled, a **"Draw Route"** button appears
- On tap, makes a GET request to OSRM Routing API
- Navigates to map screen with fetched route

### Screen 3: Route Map

- Displays the fetched route using `react-native-maps` and `react-native-svg`
- Zooms and fits the route using coordinates
---

## 📁 Project Structure
/app<br>
├── index.tsx      # Route Input screen <br>
├── search.tsx     # Location Search screen<br>
├── route-map.tsx  # Route display on map<br>
└── _layout.tsx    # Stack navigation<br>

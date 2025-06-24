import { searchStyles } from "@/utils/styles";
import { SearchResult } from "@/utils/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LocationSearchScreen() {
  const router = useRouter();
  const { fieldType } = useLocalSearchParams<{ fieldType: string }>();

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const searchLocations = async (query: string) => {
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const encodedQuery = encodeURIComponent(query);
      const url = `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${encodedQuery}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.results) {
        setSearchResults(data.results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchLocations(searchText);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchText]);

  const handleLocationSelect = (result: SearchResult) => {
    const locationData = {
      address: result.ADDRESS,
      latitude: parseFloat(result.LATITUDE),
      longitude: parseFloat(result.LONGITUDE),
    };

    router.replace({
      pathname: "/",
      params: {
        selectedLocation: JSON.stringify(locationData),
        fieldType: fieldType,
      },
    });
  };

  return (
    <View style={searchStyles.container}>
      <View style={searchStyles.searchContainer}>
        <TextInput
          style={searchStyles.searchInput}
          placeholder="Search for a location..."
          value={searchText}
          onChangeText={setSearchText}
          autoFocus
        />
        {loading && <ActivityIndicator style={searchStyles.loader} />}
      </View>

      <FlatList
        data={searchResults}
        keyExtractor={(item, index) =>
          `${item.LATITUDE}-${item.LONGITUDE}-${index}`
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={searchStyles.resultItem}
            onPress={() => handleLocationSelect(item)}
          >
            <Text style={searchStyles.resultTitle}>{item.SEARCH_VAL}</Text>
            <Text style={searchStyles.resultAddress}>{item.ADDRESS}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          !loading && searchText.length >= 3 ? (
            <View style={searchStyles.emptyContainer}>
              <Text style={searchStyles.emptyText}>No results found</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}

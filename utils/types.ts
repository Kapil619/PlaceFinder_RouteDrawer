export type LocationData = {
    address: string;
    latitude: number;
    longitude: number;
};

export type RouteOption = {
    distance: number;
    duration: number;
    geometry: {
        coordinates: number[][];
        type: string;
    };
};

export interface SearchResult {
    SEARCH_VAL: string;
    ADDRESS: string;
    LATITUDE: string;
    LONGITUDE: string;
}

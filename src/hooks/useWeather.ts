import { CoordinatesType } from "@/api/types";
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEYS = {
  weather: (coords: CoordinatesType) => ["weather", coords] as const,
  forecast: (coords: CoordinatesType) => ["forecast", coords] as const,
  location: (coords: CoordinatesType) => ["location", coords] as const,
  search: (query: string) => ["location-search", query] as const,
} as const;

export const useWeatherQuery = (coordinants: CoordinatesType | null) => {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinants ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinants ? weatherAPI.getCurrentWeather(coordinants) : null,
    enabled: !!coordinants,
  });
};

export const useForecastQuery = (coordinants: CoordinatesType | null) => {
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(coordinants ?? { lat: 0, lon: 0 }),
    queryFn: () => (coordinants ? weatherAPI.getForcast(coordinants) : null),
    enabled: !!coordinants,
  });
};

export const useReverseGeocodeQuery = (coordinants: CoordinatesType | null) => {
  return useQuery({
    queryKey: WEATHER_KEYS.location(coordinants ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinants ? weatherAPI.reverseGeoCode(coordinants) : null,
    enabled: !!coordinants,
  });
};

export const useLocationSearch = (query: string) => {
  return useQuery({
    queryKey: WEATHER_KEYS.search(query),
    queryFn: () => weatherAPI.searchLocation(query),
    enabled: query.length >= 3,
  });
};

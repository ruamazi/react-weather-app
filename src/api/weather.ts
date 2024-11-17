import { API_CONFIG } from "./config";
import {
  CoordinatesType,
  ForecastDataType,
  GeocodingResponseType,
  WeatherDataType,
} from "./types";

class WeatherAPI {
  private createUrl(endpoint: string, params: Record<string, string | number>) {
    const searchParams = new URLSearchParams({
      appid: API_CONFIG.API_KEY,
      ...params,
    });
    return `${endpoint}?${searchParams.toString()}`;
  }
  private async fetchData<T>(url: string): Promise<T> {
    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error(`Weather API Error: ${resp.statusText}`);
    }
    return resp.json();
  }
  async getCurrentWeather({
    lat,
    lon,
  }: CoordinatesType): Promise<WeatherDataType> {
    const url = this.createUrl(`${API_CONFIG.WEATHER_URL}/weather`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: API_CONFIG.DEFAULT_PARAMS.units,
    });
    return this.fetchData<WeatherDataType>(url);
  }
  async getForcast({ lat, lon }: CoordinatesType): Promise<ForecastDataType> {
    const url = this.createUrl(`${API_CONFIG.WEATHER_URL}/forecast`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: API_CONFIG.DEFAULT_PARAMS.units,
    });
    return this.fetchData<ForecastDataType>(url);
  }
  async reverseGeoCode({
    lat,
    lon,
  }: CoordinatesType): Promise<GeocodingResponseType[]> {
    const url = this.createUrl(`${API_CONFIG.GEO_URL}/reverse`, {
      lat: lat.toString(),
      lon: lon.toString(),
      limit: "1",
    });
    return this.fetchData<GeocodingResponseType[]>(url);
  }

  async searchLocation(query: string): Promise<GeocodingResponseType[]> {
    const url = this.createUrl(`${API_CONFIG.GEO_URL}/direct`, {
      q: query,
      limit: "5",
    });
    return this.fetchData<GeocodingResponseType[]>(url);
  }
}

export const weatherAPI = new WeatherAPI();

export interface CoordinatesType {
  lat: number;
  lon: number;
}

export interface GeocodingResponseType {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface WeatherConditionType {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherDataType {
  coord: CoordinatesType;
  weather: WeatherConditionType[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
    country: string;
  };
  name: string;
  dt: number;
}

export interface ForecastDataType {
  list: Array<{
    dt: number;
    main: WeatherDataType["main"];
    weather: WeatherDataType["weather"];
    wind: WeatherDataType["wind"];
    dt_txt: string;
  }>;
  city: {
    name: string;
    country: string;
    sunrise: number;
    sunset: number;
  };
}

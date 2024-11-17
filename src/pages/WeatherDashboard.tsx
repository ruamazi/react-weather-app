import { GeocodingResponseType } from "@/api/types";
import CurrentWeather from "@/components/CurrentWeather";
import FavoriteCities from "@/components/FavoriteCities";
import HourlyTemperature from "@/components/HourlyTemperature";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherForecast from "@/components/WeatherForecast";
import useGeoLocation from "@/hooks/useGeoLocation";
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "@/hooks/useWeather";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";

const WeatherDashboard = () => {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeoLocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };

  if (locationLoading) {
    return <LoadingSkeleton />;
  }

  if (locationError || !coordinates) {
    return (
      <Alert variant={"destructive"}>
        {locationError && <AlertTriangle className="h-4 w-4" />}
        <AlertTitle>Location {locationError ? "Error" : "Required"}</AlertTitle>
        <AlertDescription>
          <p>
            {locationError
              ? locationError
              : "Enable location access to see your local weather."}
          </p>
        </AlertDescription>
        <Button
          onClick={getLocation}
          variant={"outline"}
          className="w-full mt-3 "
        >
          <MapPin className="mr-2 h-4 w-4" />
          Enable location
        </Button>
      </Alert>
    );
  }

  if (weatherQuery.error || forecastQuery.error) {
    <Alert variant={"destructive"}>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        <p>Failed to fetch weather data. Please try again.</p>
      </AlertDescription>
      <Button
        onClick={handleRefresh}
        variant={"outline"}
        className="w-full mt-3 "
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        Try again
      </Button>
    </Alert>;
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <LoadingSkeleton />;
  }

  const locationName = locationQuery.data?.[0] as GeocodingResponseType;

  return (
    <div className="space-y-4">
      <FavoriteCities />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCw
            className={`h-4 w-4 ${
              weatherQuery.isFetching ? "animate-spin" : ""
            }`}
          />
        </Button>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather
            data={weatherQuery.data}
            locationName={locationName}
          />
          <HourlyTemperature data={forecastQuery.data} />
        </div>

        <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;

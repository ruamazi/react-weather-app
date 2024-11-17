import { CoordinatesType } from "@/api/types";
import { useEffect, useState } from "react";

interface GeolocationStateType {
  coordinates: CoordinatesType | null;
  error: string | null;
  isLoading: boolean;
}

const useGeoLocation = () => {
  const [locationData, setLocationData] = useState<GeolocationStateType>({
    coordinates: null,
    error: null,
    isLoading: true,
  });

  const getLocation = () => {
    setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));
    if (!navigator.geolocation) {
      setLocationData({
        coordinates: null,
        error: "Geolocation is not supported by the browser",
        isLoading: false,
      });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (location) => {
        setLocationData({
          coordinates: {
            lat: location.coords.latitude,
            lon: location.coords.longitude,
          },
          error: null,
          isLoading: false,
        });
      },
      (error) => {
        let errorMsg: string;

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMsg =
              "Location permission denied. Please enable location access.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMsg = "Location information unavailable.";
            break;
          case error.TIMEOUT:
            errorMsg = "Location request timed out.";
            break;
          default:
            errorMsg = "An unknown error occured.";
        }
        setLocationData({
          coordinates: null,
          error: errorMsg,
          isLoading: false,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };
  useEffect(() => {
    getLocation();
  }, []);

  return {
    ...locationData,
    getLocation,
  };
};

export default useGeoLocation;

import { LocationGeocodedAddress } from "@/presentation/permissions/interfaces/geo-code";
import { LatLng } from "@/presentation/permissions/interfaces/lat-lang";
import * as Location from "expo-location";

export const getCurrentLocation = async (): Promise<LatLng> => {
  try {
    const { coords } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    return {
      latitude: coords.latitude,
      longitude: coords.longitude,
    };
  } catch (error) {
    throw new Error("Error getting location");
  }
};

export const getCurrentAddress = async (
  location: LatLng | null
): Promise<LocationGeocodedAddress> => {
  
  if (location !== null) {
    try {
      const geocoded = await Location.reverseGeocodeAsync({
        latitude: location.latitude,
        longitude: location.longitude,
      });

      return geocoded[0];
    } catch (error) {
      console.log(error);
    }
  }
  
  throw new Error("Error getting address");
};

export const watchCurrentPosition = (
  locationCallback: (location: LatLng) => void
) => {
  return Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.Balanced,
      // timeInterval: 1000
      distanceInterval: 10,
    },
    ({ coords }) => {
      locationCallback({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    }
  );
};

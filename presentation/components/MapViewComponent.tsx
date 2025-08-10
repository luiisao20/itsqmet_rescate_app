import { useEffect, useRef, useState } from "react";
import { View, Text, Pressable } from "react-native";
import MapView, { Region } from "react-native-maps";
import { ActivityIndicator } from "react-native-paper";

import { useLocationStore } from "@/presentation/location/useLocationStore";
import { IconCompass, IconMapPin } from "@/components/ui/Icons";
import { Colors } from "@/constants/Colors";
import { AddressDB } from "@/core/database/interfaces/address";
import { LatLng } from "@/infraestructure/interfaces/lat-lang";

interface Props {
  locationRef?: AddressDB;

  onUpdateLocation: (location: LatLng, address: string) => void;
}

const MapViewComponent = ({ locationRef, onUpdateLocation }: Props) => {
  const { getAddress, getLocation } = useLocationStore();
  const mapRef = useRef<MapView>(null);
  const didMount = useRef(false);
  const [region, setRegion] = useState<Region>();
  const [newAddres, setNewAddress] = useState<string>();
  const [loading, setLoading] = useState(false);

  const goCurrentLocation = async () => {
    const currentLocation = await getLocation();

    const addressObj = await getAddress(currentLocation);

    const currentAddress: string = `${
      addressObj?.street ? addressObj.street + ", " : ""
    }${addressObj?.name}, ${addressObj?.city}`;

    setNewAddress(currentAddress);
    followCurrentLocation(currentLocation);
  };

  const followCurrentLocation = (latLng: LatLng | null) => {
    if (!mapRef.current) return;

    if (latLng) {
      mapRef.current.animateCamera({
        center: latLng,
      });
    }
  };

  const handleRegionChange = async (newRegion: Region) => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    const newLocation: LatLng = {
      latitude: newRegion.latitude,
      longitude: newRegion.longitude,
    };

    const addressObj = await getAddress(newLocation);

    const currentAddress: string = `${
      addressObj?.street ? addressObj.street + ", " : ""
    }${addressObj?.name}, ${addressObj?.city}`;

    setRegion(newRegion);
    onUpdateLocation(newLocation, newAddres!);
    setNewAddress(currentAddress);
  };

  const loadInitialRegion = async () => {
    setLoading(true);
    const currentLocation = await getLocation();
    const currentAddress = await getAddress(currentLocation);
    const formattedAddress =
      currentAddress.street || currentAddress.city
        ? `${currentAddress.street}, ${currentAddress.city}`
        : "";

    setRegion({
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      latitudeDelta: 0.0005,
      longitudeDelta: 0.005,
    });

    onUpdateLocation(currentLocation, formattedAddress!);

    setNewAddress(formattedAddress);
    setLoading(false);
  };

  useEffect(() => {
    if (!locationRef) loadInitialRegion();
  }, []);

  useEffect(() => {
    if (locationRef) {
      setRegion({
        latitude: locationRef.latitude,
        longitude: locationRef.longitude,
        latitudeDelta: 0.0005,
        longitudeDelta: 0.005,
      });
    }
  }, [locationRef]);

  if (loading) {
    return <ActivityIndicator size={30} className="my-10" />;
  }

  return (
    <>
      <Text className="text-xl text-color font-light my-4">
        {locationRef ? locationRef.description : newAddres}
      </Text>
      <View className="relative h-3/5 my-2">
        <MapView
          ref={mapRef}
          region={region}
          onRegionChangeComplete={handleRegionChange}
          style={{ height: "100%", width: "100%" }}
        />
        <View className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-full">
          <IconMapPin color={Colors.color} />
        </View>
        <Pressable
          onPress={goCurrentLocation}
          className="absolute right-4 bottom-10 bg-background rounded-full active:opacity-60"
        >
          <IconCompass color={Colors.color} size={36} />
        </Pressable>
      </View>
    </>
  );
};

export default MapViewComponent;

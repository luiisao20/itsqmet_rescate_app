import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MapView, { Region } from "react-native-maps";
import { ActivityIndicator } from "react-native-paper";

import { IconCompass, IconMapPin } from "@/components/ui/Icons";
import { Colors } from "@/constants/Colors";
import { AddressDB } from "@/core/database/interfaces/address";
import { useLocationStore } from "@/presentation/location/useLocationStore";
import { LatLng } from "@/presentation/permissions/interfaces/lat-lang";

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
      <Text style={styles.title}>
        {locationRef ? locationRef.description : newAddres}
      </Text>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          region={region}
          onRegionChangeComplete={handleRegionChange}
          style={{ height: "100%", width: "100%" }}
        />
        <View style={styles.pinContainer}>
          <IconMapPin color={Colors.color} />
        </View>
        <Pressable onPress={goCurrentLocation} style={styles.compassButton}>
          <IconCompass color={Colors.color} size={36} />
        </Pressable>
      </View>
    </>
  );
};

export default MapViewComponent;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: Colors.color,
    fontWeight: "300",
    marginVertical: 16,
  },
  mapContainer: {
    position: "relative",
    height: "60%",
    marginVertical: 8
  },
  map: {
    height: "100%",
    width: "100%",
  },
  pinContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -12 }, { translateY: -24 }],
  },
  compassButton: {
    position: "absolute",
    right: 16,
    bottom: 40,
    backgroundColor: Colors.background,
    borderRadius: 9999,
    opacity: 1,
    padding: 4,
  },
});

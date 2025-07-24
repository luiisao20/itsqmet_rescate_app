import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { getSomeLocation } from "@/hooks/getLocations";
import MapView, { LatLng, Region } from "react-native-maps";
import { IconCompass, IconMapPin } from "@/components/ui/Icons";
import { Colors } from "@/constants/Colors";
import { useLocationStore } from "@/components/store/useLocationStore";
import { ModalLocation } from "@/components/Modal";

const EditAdress = () => {
  const { lastKnwonLocation, locationAddress, getAddress, getLocation } =
    useLocationStore();

  const { id } = useLocalSearchParams();
  const isNew = id === "new";
  const { location, alias, address } = isNew
    ? {
        location: lastKnwonLocation,
        alias: "Mi ubicacion",
        address: locationAddress
          ? `${locationAddress?.street}, ${locationAddress?.city}`
          : "Ubicacion acual",
      }
    : getSomeLocation(id);

  const mapRef = useRef<MapView>(null);
  const didMount = useRef(false);
  const [region, setRegion] = useState<Region>();
  const [newAddres, setNewAddress] = useState<string>();
  const [showSave, setShowSave] = useState<boolean>(false);
  const [modalProps, setModalProps] = useState<{
    isOpen: boolean;
    infoLocation: {
      alias: string;
      description: string;
    };
  }>({
    isOpen: false,
    infoLocation: {
      description: address,
      alias: alias,
    },
  });

  useEffect(() => {
    if (!location || !location.latitude || !location.longitude) {
      getLocation();
      return;
    }

    setRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.0005,
      longitudeDelta: 0.005,
    });
    setNewAddress(address);
  }, [location]);

  const handleRegionChange = (newRegion: Region) => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    setShowSave(true);
    const newLocation: LatLng = {
      latitude: newRegion.latitude,
      longitude: newRegion.longitude,
    };

    getAddress(newLocation);
    setRegion(newRegion);

    const currentAddress: string = `${
      locationAddress?.street ? locationAddress.street + ", " : ""
    }${locationAddress?.name}, ${locationAddress?.city}`;
    setModalProps((prev) => ({
      ...prev,
      infoLocation: {
        ...prev.infoLocation,
        description: currentAddress,
      },
    }));

    setNewAddress(currentAddress);
  };

  const followCurrentLocation = (latLng: LatLng | null) => {
    if (!mapRef.current) return;

    if (latLng) {
      mapRef.current.animateCamera({
        center: latLng,
      });
    }
  };

  const goCurrentLocation = () => {
    getLocation();

    getAddress(lastKnwonLocation);

    const currentAddress: string = `${
      locationAddress?.street ? locationAddress.street + ", " : ""
    }${locationAddress?.name}, ${locationAddress?.city}`;

    setNewAddress(currentAddress);
    followCurrentLocation(lastKnwonLocation);
  };

  if (lastKnwonLocation === null && isNew) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View className="px-6 py-4">
      <Text className="text-2xl text-color text-center">{alias}</Text>
      <Text className="text-xl text-color font-light">{newAddres}</Text>
      <View className="relative h-3/5 my-4">
        <MapView
          ref={mapRef}
          region={region}
          onRegionChangeComplete={(region) => handleRegionChange(region)}
          style={{ height: "100%", width: "100%" }}
          onLongPress={(coordinate) => {
            console.log(coordinate);
          }}
        />
        <View className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-full">
          <IconMapPin color={Colors.color} />
        </View>
        <Pressable
          onPress={() => goCurrentLocation()}
          className="absolute right-4 bottom-10 bg-background rounded-full active:opacity-60"
        >
          <IconCompass color={Colors.color} size={36} />
        </Pressable>
      </View>
      <View className="flex flex-row gap-4 justify-around items-center">
        <Pressable
          onPress={() =>
            setModalProps((prev) => ({
              ...prev,
              isOpen: true,
            }))
          }
          className="bg-button p-4 rounded-xl active:bg-button/60"
        >
          <Text className="text-xl text-white font-semibold">Editar</Text>
        </Pressable>
        {showSave && (
          <Pressable className="bg-success p-4 rounded-xl active:bg-success/60">
            <Text className="text-xl text-white font-semibold">Guardar</Text>
          </Pressable>
        )}
        <Pressable className="bg-danger p-4 rounded-xl active:bg-danger/60">
          <Text className="text-xl text-white font-semibold">Eliminar</Text>
        </Pressable>
      </View>
      <ModalLocation
        isOpen={modalProps.isOpen}
        infoLocation={modalProps.infoLocation}
        onClose={() =>
          setModalProps((prev) => ({
            ...prev,
            isOpen: false,
          }))
        }
        onUpdateLocation={() => console.log("Por implementar")}
      />
    </View>
  );
};

export default EditAdress;

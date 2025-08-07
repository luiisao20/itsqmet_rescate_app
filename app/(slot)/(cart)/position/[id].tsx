import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { useEffect, useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import MapView, { LatLng, Region } from "react-native-maps";
import { IconCompass, IconMapPin } from "@/components/ui/Icons";
import { Colors } from "@/constants/Colors";
import { useLocationStore } from "@/components/store/useLocationStore";
import { ModalLocation } from "@/components/Modal";
import { useAddressStore } from "@/components/store/useAddressStore";
import { useCustomerStore } from "@/components/store/useDb";

interface ModalProps {
  isOpen: boolean;
  infoLocation: {
    alias: string;
    description: string;
    latitude: number | undefined;
    longitude: number | undefined;
  };
}

const EditAdress = () => {
  const { lastKnwonLocation, locationAddress, getAddress, getLocation } =
    useLocationStore();
  const { getAddressById, fetchAddresses } = useAddressStore();

  const { id } = useLocalSearchParams();
  const isNew = id === "new";
  const selectedAddress = !isNew ? getAddressById(id) : null;
  const { customer } = useCustomerStore();

  const mapRef = useRef<MapView>(null);
  const didMount = useRef(false);
  const [region, setRegion] = useState<Region>();
  const [loading, setIsLoading] = useState<boolean>(false);
  const [newAddres, setNewAddress] = useState<string>();
  const [modalProps, setModalProps] = useState<ModalProps>({
    isOpen: false,
    infoLocation: {
      description: selectedAddress?.description || "Ubicación actual",
      alias: selectedAddress?.alias || "Mi ubicación",
      latitude: selectedAddress?.latitude,
      longitude: selectedAddress?.longitude,
    },
  });

  useEffect(() => {
    const loadInitialRegion = async () => {
      if (!isNew && selectedAddress) {
        setRegion({
          latitude: selectedAddress.latitude,
          longitude: selectedAddress.longitude,
          latitudeDelta: 0.0005,
          longitudeDelta: 0.005,
        });
        setNewAddress(selectedAddress.description);
        return;
      }

      const currentLocation = await getLocation();
      const currentAddress = await getAddress(currentLocation);
      const formattedAddress = `${currentAddress?.street}, ${currentAddress?.city}`;

      setRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.0005,
        longitudeDelta: 0.005,
      });

      setNewAddress(formattedAddress);

      setModalProps((prev) => ({
        ...prev,
        infoLocation: {
          alias: "Mi ubicación",
          description: formattedAddress,
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        },
      }));
    };

    loadInitialRegion();
  }, []);

  const handleRegionChange = (newRegion: Region) => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

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
        latitude: newLocation.latitude,
        longitude: newLocation.longitude,
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

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      fetchAddresses(customer?.id!);
      router.dismiss();
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
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
      <Text className="text-2xl text-color text-center">
        {modalProps.infoLocation.alias}
      </Text>
      <Text className="text-xl text-color font-light">{newAddres}</Text>
      <View className="relative h-3/5 my-4">
        <MapView
          ref={mapRef}
          region={region}
          onRegionChangeComplete={(region) => handleRegionChange(region)}
          style={{ height: "100%", width: "100%" }}
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
        <Pressable
          disabled={loading}
          onPress={handleDelete}
          className="bg-danger p-4 rounded-xl active:bg-danger/60"
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-xl text-white font-semibold">Eliminar</Text>
          )}
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
      />
    </View>
  );
};

export default EditAdress;

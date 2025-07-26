import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Pressable,
  Linking,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  router,
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { Colors } from "@/constants/Colors";
import { Pack } from "@/infraestructure/interfaces/PackInterface";
import HeaderPackSolo from "@/components/ui/HeaderPackSolo";
import {
  IconBag,
  IconGo,
  IconMap,
  IconStandard,
  IconStar,
} from "@/components/ui/Icons";
import { LatLng } from "@/infraestructure/interfaces/lat-lang";
import { ModalProps } from "@/components/PackCard";
import { ModalInfo } from "@/components/Modal";

interface Address {
  label: string;
  latLng: LatLng;
}

const DetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const currentPack: Pack = {
    title: "Kentucky Fried Chicken",
    price: 8.99,
    distance: 1,
    rate: 4.8,
    pickUp: "12:00PM - 1:00PM",
    packsLeft: 3,
    logo: require("@/assets/images/packs/logo-kfc.png"),
    background: require("@/assets/images/packs/background-kfc.png"),
  };
  const [enabled, setEnabled] = useState<boolean>(true);
  const address: Address = {
    label: "Diagonal a parada de metro, Av. 6 de Diciembre, Quito 170402",
    latLng: {
      latitude: -0.20830874018740156,
      longitude: -78.49557458400517,
    },
  };
  const [modalProps, setModalProps] = useState<ModalProps>({
    product: "",
    message: "",
    isOpen: false,
    cart: false,
  });

  useEffect(() => {
    setEnabled(currentPack.packsLeft > 0);
    setModalProps((prev) => ({
      ...prev,
      product: currentPack.title,
    }));
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: id,
      headerTitleStyle: {
        color: Colors.color,
      },
    });
  }, [navigation, id]);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("light-content");
      StatusBar.setBackgroundColor("#5C8A72");
    }, [])
  );

  const openInGoogleMaps = ({ latitude, longitude }: LatLng) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url).catch((err) =>
      console.error("Error abriendo Google Maps", err)
    );
  };

  return (
    <View className="flex flex-1">
      <HeaderPackSolo
        onSetFavorite={() =>
          setModalProps((prev) => ({
            ...prev,
            isOpen: true,
            message: "ha sido añadido a favoritos",
          }))
        }
        pack={currentPack}
        enabled={enabled}
      />
      <View className="px-6 my-4">
        <View className="flex gap-2">
          <View className="flex flex-row items-center gap-4">
            <IconBag size={16} />
            <Text className="text-base font-semibold text-color">
              Pack Sorpresa
            </Text>
          </View>
          <View className="flex flex-row items-baseline gap-4">
            <IconStar size={16} color={Colors.color} />
            <Text className="text-base font-semibold text-color">
              {currentPack.rate}{" "}
              <Text className="text-gray-700 font-light">(121)</Text>
            </Text>
          </View>
          <View className="flex flex-row items-baseline gap-4">
            <IconStandard size={16} color={Colors.color} />
            <Text className="text-base font-semibold text-color">
              Recoger entre:{" "}
              <Text className="font-light">{currentPack.pickUp}</Text>
            </Text>
          </View>
        </View>
        <Pressable
          onPress={() => openInGoogleMaps(address.latLng)}
          className="flex p-2 flex-row my-4 justify-between items-center border-b-2 border-color active:bg-gray-200"
        >
          <IconMap color={Colors.color} />
          <View className="w-4/5">
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              className="text-lg font-light"
            >
              {address.label}
            </Text>
          </View>
          <IconGo color={Colors.color} />
        </Pressable>
        <Pressable
          onPress={() => setModalProps((prev) => ({ ...prev, isOpen: true }))}
          className="bg-button p-4 rounded-xl active:bg-button/60 my-4"
        >
          <Text className="text-white text-center font-semibold text-xl">
            Agregar al carrito ${currentPack.price}{" "}
          </Text>
        </Pressable>
      </View>
      <ModalInfo
        product={modalProps.product}
        message={modalProps.message}
        cart={modalProps.cart}
        onClose={() =>
          setModalProps((prev) => ({
            ...prev,
            isOpen: false,
            message: "ha sido reservado en el carrito",
          }))
        }
        onUnDone={() => console.log("Por implementar deshacer")}
        isOpen={modalProps.isOpen}
      />
    </View>
  );
};

export default DetailsScreen;

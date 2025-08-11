import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Linking, Pressable, StatusBar, Text, View } from "react-native";

import { ModalInfo } from "@/components/Modal";
import { ModalProps } from "@/components/PackCard";
import HeaderPackSolo from "@/components/ui/HeaderPackSolo";
import {
  IconBag,
  IconGo,
  IconMap,
  IconMapOff,
  IconStandard,
  IconStar,
} from "@/components/ui/Icons";
import { Colors } from "@/constants/Colors";
import { useCartStore } from "@/presentation/packages/store/usePacksStore";
import { usePackage } from "@/presentation/packages/usePackages";

const DetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const idPackage = parseInt(`${id}`);
  const { packageQuery } = usePackage(idPackage);
  const [modalProps, setModalProps] = useState<ModalProps>({
    product: "",
    message: "",
    isOpen: false,
    cart: false,
  });
  const { addToCart, removeFromCart } = useCartStore();
  const [remove, setRemove] = useState<boolean>(false);

  useEffect(() => {
    setModalProps((prev) => ({
      ...prev,
      product: packageQuery.data?.title!,
    }));
  }, [packageQuery.data]);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("light-content");
      StatusBar.setBackgroundColor("#5C8A72");
    }, [])
  );

  const openInGoogleMaps = (
    latitude: number | null,
    longitude: number | null
  ) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url).catch((err) =>
      console.error("Error abriendo Google Maps", err)
    );
  };

  if (packageQuery.isLoading) return <Text>Cargando...</Text>;

  const {
    rate,
    title,
    pickup,
    description,
    price,
    latitude,
    longitude,
    packs_left,
  } = packageQuery.data!;

  return (
    <View className="flex flex-1">
      <HeaderPackSolo pack={packageQuery.data!} />
      <View className="px-6 my-4">
        <View className="flex gap-2">
          <View className="flex flex-row items-center gap-4">
            <IconBag size={16} />
            <Text className="text-base font-semibold text-color">{title}</Text>
          </View>
          <View className="flex flex-row items-baseline gap-4">
            <IconStar size={16} color={Colors.color} />
            <Text className="text-base font-semibold text-color">
              {rate} <Text className="text-gray-700 font-light">(121)</Text>
            </Text>
          </View>
          <View className="flex flex-row items-baseline gap-4">
            <IconStandard size={16} color={Colors.color} />
            <Text className="text-base font-semibold text-color">
              Recoger entre: <Text className="font-light">{pickup}</Text>
            </Text>
          </View>
        </View>
        <Pressable
          disabled={!description}
          onPress={() => openInGoogleMaps(latitude, longitude)}
          className="flex p-2 flex-row my-4 justify-between items-center border-b-2 border-color active:bg-gray-200"
        >
          {description ? (
            <IconMap color={Colors.color} />
          ) : (
            <IconMapOff color={Colors.color} />
          )}
          <View className="w-4/5">
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              className="text-lg font-light"
            >
              {description ??
                "No existe ubicación para este restaurante, lo sentimos :c"}
            </Text>
          </View>
          <IconGo color={Colors.color} />
        </Pressable>
        <Pressable
          onPress={() => {
            if (remove) {
              removeFromCart(packageQuery.data?.id!);
              setRemove(false);
            } else {
              addToCart(packageQuery.data!);
              setRemove(true);
            }
          }}
          disabled={packs_left === 0}
          className={`p-4 rounded-xl active:bg-button/60 my-4 ${packs_left > 0 ? "bg-button" : "bg-gray-300"}`}
        >
          <Text className="text-white text-center font-semibold text-xl">
            {remove ? "Eliminar del carrito" : "Agregar al carrito"} $ {price}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/(slot)/(cart)")}
          className="bg-success rounded-xl p-4 active:bg-success/60"
        >
          <Text className="text-white font-semibold text-center text-xl">
            Ir al carrito
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
        isOpen={modalProps.isOpen}
      />
    </View>
  );
};

export default DetailsScreen;

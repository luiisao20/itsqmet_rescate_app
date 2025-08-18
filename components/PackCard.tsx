import { useState } from "react";
import { router } from "expo-router";
import { Image } from "expo-image";
import { Pressable, PressableProps, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

import { Colors } from "@/constants/Colors";
import { Package } from "@/core/database/interfaces/packages";
import { useCartStore } from "../presentation/packages/store/usePacksStore";
import {
  IconAdd,
  IconHeartFilled,
  IconHeartOut,
  IconMinus,
  IconPlus,
  IconStar,
  IconTrash,
} from "./ui/Icons";
import LogoPack from "./ui/LogoPack";
import { useFavoritePackage } from "@/presentation/packages/useFavoritePackages";

interface Props extends PressableProps {
  info: PackItem;
  home?: boolean;
  className?: string;
  isFavorite?: boolean;
}

export interface ModalProps {
  product: string;
  message: string;
  isOpen: boolean;
  cart?: boolean;
}

interface PackItem extends Package {
  quantity?: number;
}

const PackCard = ({
  info,
  home = true,
  className = "",
  isFavorite = false,
  ...rest
}: Props) => {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const { addToCart, decreaseQuantity } = useCartStore();
  const { favoriteMutation, deleteFavoriteMutation } = useFavoritePackage({});

  const handleFavorite = () => {
    if (isFavorite) deleteFavoriteMutation.mutate(info.id);
    else favoriteMutation.mutate(info);
  };

  const handleGoPack = () => {
    router.push({
      pathname: "/(slot)/(packs)/details/[id]",
      params: { id: info.id! },
    });
  };

  return (
    <View
      className={`bg-background rounded-2xl shadow-xl android:elevation-sm ${className}`}
    >
      <View className="relative">
        {!backgroundLoaded && (
          <View
            style={{
              height: 180,
              width: "100%",
              backgroundColor: "#f0f0f0",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color={Colors.color} />
          </View>
        )}

        {backgroundLoaded && (
          <LinearGradient
            colors={["rgba(0,0,0,0.6)", "transparent"]}
            start={[1, 1]}
            end={[1, 0.6]}
            style={{
              height: 180,
              position: "absolute",
              zIndex: 1,
              width: "100%",
              borderTopLeftRadius: 20,
            }}
          />
        )}
        <Image
          source={{
            uri: `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/background-general.png`,
          }}
          style={{
            height: 180,
            width: "100%",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            opacity: backgroundLoaded ? (info.packs_left > 0 ? 1 : 0.4) : 0,
          }}
          contentFit="cover"
          transition={300}
          onLoad={() => setBackgroundLoaded(true)}
          onLoadStart={() => setBackgroundLoaded(false)}
          placeholder={{ blurhash: "L6PZfSi_.AyE_3t7t7R**0o#DgR4" }}
        />
        {backgroundLoaded && <LogoPack title={info.name} />}
        {backgroundLoaded && (
          <>
            <View
              className={`absolute p-2 rounded-xl top-2 left-2 ${info.packs_left > 0 ? "bg-button" : "bg-gray-500"}`}
            >
              {info.packs_left > 0 ? (
                <Text className="text-white font-semibold ">
                  Quedan {info.packs_left}
                </Text>
              ) : (
                <Text className="text-white font-semibold ">Agotado</Text>
              )}
            </View>
            <View className="absolute top-2 right-2">
              {home ? (
                <View className="flex gap-2">
                  <Pressable
                    disabled={
                      deleteFavoriteMutation.isPending ||
                      favoriteMutation.isPending
                    }
                    onPress={() => handleFavorite()}
                    {...rest}
                    className="bg-white p-2 rounded-full active:scale-125 z-20"
                  >
                    {isFavorite ? (
                      <IconHeartFilled size={18} color={Colors.color} />
                    ) : (
                      <IconHeartOut size={18} />
                    )}
                  </Pressable>
                  {info.packs_left > 0 && (
                    <Pressable
                      {...rest}
                      onPress={() => addToCart(info)}
                      className="bg-white p-2 rounded-full active:scale-125 z-20"
                    >
                      <IconAdd size={18} />
                    </Pressable>
                  )}
                </View>
              ) : (
                <View className="flex flex-row items-center z-20 gap-2 justify-center bg-white rounded-full p-1">
                  <Pressable
                    {...rest}
                    onPress={() => decreaseQuantity(info.id!)}
                    className="active:scale-125"
                  >
                    {info.quantity! > 1 ? (
                      <IconMinus />
                    ) : (
                      <IconTrash size={24} />
                    )}
                  </Pressable>
                  <Text className="text-center font-semibold text-lg">
                    {info.quantity}
                  </Text>
                  <Pressable
                    {...rest}
                    onPress={() => addToCart(info)}
                    className="active:scale-125"
                  >
                    <IconPlus />
                  </Pressable>
                </View>
              )}
            </View>
          </>
        )}
      </View>
      <Pressable onLongPress={handleGoPack} className="p-4 active:opacity-45">
        <View className="flex flex-row items-end justify-between gap-4 mx-2">
          <Text className="text-lg font-semibold text-color w-1/2 text-wrap">
            {info.title}
          </Text>
          <Text className="text-xs font-light text-wrap w-1/2 text-right">
            Mantén presionado para ver detalles
          </Text>
        </View>
        <Text className="text-base font-light text-color">
          Recoger entre {info.pickup}
        </Text>
        <View className="flex flex-row justify-between">
          <View className="flex flex-row gap-4">
            <View className="flex flex-row items-baseline gap-2">
              <IconStar size={16} color={Colors.color} />
              <Text className="text-lg font-semibold text-color">
                {info.rate}
              </Text>
            </View>
            <View className="w-0.5 h-full bg-gray-300 rounded-full" />
            <Text className="text-lg font-semibold text-color">
              {info.distance} km
            </Text>
          </View>
          <Text
            className={`text-xl font-bold ${info.packs_left > 0 ? "text-color" : "text-gray-300"}`}
          >
            $ {info.price}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default PackCard;

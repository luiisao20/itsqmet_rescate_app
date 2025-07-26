import { Colors } from "@/constants/Colors";
import { Pack } from "@/infraestructure/interfaces/PackInterface";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Pressable, PressableProps, Text, View } from "react-native";
import {
  IconAdd,
  IconHeartOut,
  IconMinus,
  IconPlus,
  IconStar,
  IconTrash,
} from "./ui/Icons";
import { ActivityIndicator } from "react-native-paper";
import { ModalInfo } from "./Modal";
import { router } from "expo-router";
import LogoPack from "./ui/LogoPack";

interface Props extends PressableProps {
  info: Pack;
  home?: boolean;
  className?: string;
}

export interface ModalProps {
  product: string;
  message: string;
  isOpen: boolean;
  cart?: boolean;
}

const PackCard = ({ info, home = true, className = "", ...rest }: Props) => {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  const [quantity, setQuantity] = useState<number>(info.quantity || 0);
  const [enabled, setEnabled] = useState<boolean>(true);

  const [modalProps, setModalProps] = useState<ModalProps>({
    product: "",
    message: "",
    isOpen: false,
    cart: false,
  });

  // Setea si hay producto disponible
  useEffect(() => {
    setEnabled(info.packsLeft > 0);
    // Setea el nombre del producto para el Modal
    setModalProps((prev) => ({
      ...prev,
      product: info.title,
    }));
  }, []);

  // Setea la cantidad si se encuentra en el carrito
  useEffect(() => {
    setQuantity(info.quantity || 0);
  }, [info.quantity]);

  // Funciones para cuando el pack esté en el carrito
  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const minus = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    } else {
      setModalProps((prev) => ({
        ...prev,
        isOpen: true,
        message: "será eliminado del carrito",
        cart: true,
      }));
    }
  };

  /* TODO: undone de modal, usando useContext, tanto el 
  de index, packs y cart es el mismo, solo hay que 
  diferenciar el undone de los favoritos
  */

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
          source={info.background}
          style={{
            height: 180,
            width: "100%",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            opacity: backgroundLoaded ? (enabled ? 1 : 0.4) : 0,
          }}
          contentFit="cover"
          transition={300}
          priority="high"
          cachePolicy="memory-disk"
          onLoad={() => setBackgroundLoaded(true)}
          onLoadStart={() => setBackgroundLoaded(false)}
          placeholder={{ blurhash: "L6PZfSi_.AyE_3t7t7R**0o#DgR4" }}
        />
        {backgroundLoaded && <LogoPack route={info.logo} title={info.title} />}
        {backgroundLoaded && (
          <>
            <View
              className={`absolute p-2 rounded-xl top-2 left-2 ${enabled ? "bg-button" : "bg-gray-500"}`}
            >
              {enabled ? (
                <Text className="text-white font-semibold ">
                  Quedan {info.packsLeft}
                </Text>
              ) : (
                <Text className="text-white font-semibold ">Agotado</Text>
              )}
            </View>
            <View className="absolute top-2 right-2">
              {home ? (
                <View className="flex gap-2">
                  <Pressable
                    onPress={() =>
                      setModalProps((prev) => ({
                        ...prev,
                        isOpen: true,
                        message: "ha sido añadido a favoritos",
                      }))
                    }
                    {...rest}
                    className="bg-white p-2 rounded-full active:scale-125 z-20"
                  >
                    <IconHeartOut size={18} />
                  </Pressable>
                  {enabled && (
                    <Pressable
                      {...rest}
                      onPress={() =>
                        setModalProps((prev) => ({
                          ...prev,
                          isOpen: true,
                          message: "ha sido reservado en el carrito",
                        }))
                      }
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
                    onPress={() => minus()}
                    className="active:scale-125"
                  >
                    {quantity > 1 ? <IconMinus /> : <IconTrash size={24} />}
                  </Pressable>
                  <Text className="text-center font-semibold text-lg">
                    {quantity}
                  </Text>
                  <Pressable
                    {...rest}
                    onPress={() => increment()}
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
      <Pressable
        onLongPress={() =>
          router.push({
            pathname: "/(slot)/(packs)/details/[id]",
            params: { id: info.title },
          })
        }
        className="p-4 active:opacity-45"
      >
        <View className="flex flex-row items-end justify-between gap-4">
          <Text className="text-lg font-semibold text-color">
            Paquete Sorpresa
          </Text>
          <Text className="text-xs font-light text-wrap w-1/2 text-right">
            Mantén presionado para ver detalles
          </Text>
        </View>
        <Text className="text-base font-light text-color">
          Recoger entre {info.pickUp}
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
            className={`text-xl font-bold ${enabled ? "text-color" : "text-gray-300"}`}
          >
            $ {info.price}
          </Text>
        </View>
      </Pressable>
      <ModalInfo
        product={modalProps.product}
        message={modalProps.message}
        cart={modalProps.cart}
        onClose={() => setModalProps((prev) => ({ ...prev, isOpen: false }))}
        onUnDone={() => console.log("Por implementar deshacer")}
        isOpen={modalProps.isOpen}
      />
    </View>
  );
};

export default PackCard;

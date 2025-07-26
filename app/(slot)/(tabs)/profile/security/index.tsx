import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { IconGo } from "@/components/ui/Icons";
import { ModalCard } from "@/components/Modal";

interface Card {
  number: string;
  type: string;
  month: number;
  year: number
}

const SecurityProfile = () => {
  const [password, setPassword] = useState<{
    oldPassword: string;
    newPassword: string;
  }>({
    oldPassword: "",
    newPassword: "",
  });
  const info:Card = {
    number: "7654",
    month: 12,
    year: 29,
    type: 'Visa'
  };
  const [modalProps, setModalProps] = useState<{
    label: string;
    isOpen: boolean;
    showDelete?: boolean;
  }>({
    label: "",
    isOpen: false,
    showDelete: true,
  });

  return (
    <View className="px-6 my-4">
      <Text className="text-3xl font-semibold text-center text-color">
        Seguridad
      </Text>
      <View className="p-4 my-4 border border-color rounded-xl flex gap-4">
        <Text className="text-xl text-center text-color font-normal">
          Cambiar contraseña
        </Text>
        <TextInput
          className="bg-background"
          label="Ingrese su actual contraseña"
          autoCapitalize="none"
          mode="flat"
          secureTextEntry
          inputMode="text"
          textColor={Colors.color}
          underlineColor={Colors.color}
          activeUnderlineColor={Colors.button}
          value={password.oldPassword}
          onChangeText={(value) =>
            setPassword({ ...password, oldPassword: value })
          }
        />
        <TextInput
          className="bg-background"
          label="Ingrese su nueva contraseña"
          autoCapitalize="none"
          mode="flat"
          secureTextEntry
          inputMode="text"
          textColor={Colors.color}
          underlineColor={Colors.color}
          activeUnderlineColor={Colors.button}
          value={password.newPassword}
          onChangeText={(value) =>
            setPassword({ ...password, newPassword: value })
          }
        />
      </View>
      <View className="p-4 my-4 border border-color rounded-xl flex gap-4">
        <Text className="text-xl text-center text-color font-normal">
          Administrar tarjetas
        </Text>
        <Pressable
          onPress={() =>
            setModalProps((prev) => ({
              ...prev,
              isOpen: true,
            }))
          }
          className="py-4 flex flex-row items-center justify-between border-b-2 border-color active:bg-gray-200"
        >
          <View>
            <Text className="font-semibold text-xl text-color">
              Visa ****{info.number.slice(-4)}
            </Text>
            <Text className="font-normal text-lg text-color">Activa</Text>
          </View>
          <IconGo size={20} />
        </Pressable>
        <Pressable
          onPress={() =>
            setModalProps((prev) => ({
              ...prev,
              isOpen: true,
              showDelete: false,
            }))
          }
          className="bg-button active:bg-button/60 p-4 rounded-xl mx-10"
        >
          <Text className="text-xl text-white font-semibold text-center">
            Añadir tarjeta
          </Text>
        </Pressable>
      </View>
      <ModalCard
        isOpen={modalProps.isOpen}
        showDelete={modalProps.showDelete}
        onClose={() => setModalProps((prev) => ({ ...prev, isOpen: false }))}
        onSendData={(text) => console.log(text)}
      />
    </View>
  );
};

export default SecurityProfile;

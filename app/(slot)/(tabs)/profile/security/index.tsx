import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { IconGo } from "@/components/ui/Icons";
import { ModalCard } from "@/components/Modal";

const SecurityProfile = () => {
  const [password, setPassword] = useState<{
    oldPassword: string;
    newPassword: string;
  }>({
    oldPassword: "",
    newPassword: "",
  });
  const info = {
    number: "3234345698987654",
    cvv: "704",
    date: "12/29",
  };
  const [modalProps, setModalProps] = useState<{
    label: string;
    isOpen: boolean;
  }>({
    label: "",
    isOpen: false,
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
      </View>
      <ModalCard
        label={"tarjeta"}
        isOpen={modalProps.isOpen}
        infoCard={info}
        onClose={() => setModalProps((prev) => ({ ...prev, isOpen: false }))}
        onSendData={(text) => console.log(text)}
      />
    </View>
  );
};

export default SecurityProfile;

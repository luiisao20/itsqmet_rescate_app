import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { IconGo } from "@/components/ui/Icons";
import { ModalCard } from "@/components/Modal";
import InputThemed from "@/components/ui/InputThemed";
import { User } from "firebase/auth";
import { useAuthStore } from "@/components/store/useAuth";
import { changePassword } from "@/utils/auth";

interface Card {
  number: string;
  type: string;
  month: number;
  year: number;
}

const SecurityProfile = () => {
  const user: User | null = useAuthStore((state) => state.user);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [update, setUpdate] = useState<{
    oldPassword: string;
    newPassword: string;
  }>({
    oldPassword: "",
    newPassword: "",
  });

  const [icon, setIcon] = useState<{
    old: string;
    seeOld: boolean;
    new: string;
    seeNew: boolean;
  }>({
    old: "eye",
    new: "eye",
    seeOld: true,
    seeNew: true,
  });

  const info: Card = {
    number: "7654",
    month: 12,
    year: 29,
    type: "Visa",
  };
  const [validForm, setIsValidForm] = useState<boolean>(false);

  const [modalProps, setModalProps] = useState<{
    label: string;
    isOpen: boolean;
    showDelete?: boolean;
  }>({
    label: "",
    isOpen: false,
    showDelete: true,
  });

  const handleUpdate = async() => {
    setIsLoading(true);
    try {
      await changePassword(user, update.oldPassword, update.newPassword);
      alert('¡La contraseña ha sido cambiada con éxito!')
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
    setIsLoading(false);
  };

  return (
    <ScrollView className="px-6 my-4">
      <Text className="text-3xl font-semibold text-center text-color">
        Seguridad
      </Text>
      <View className="p-4 my-4 border border-color rounded-xl flex gap-4">
        <Text className="text-xl text-center text-color font-normal">
          Cambiar contraseña
        </Text>
        <InputThemed
          label="Ingrese su actual contraseña"
          autoCapitalize="none"
          secureTextEntry={icon.seeOld}
          updateText={(text) =>
            setUpdate((prev) => ({
              ...prev,
              oldPassword: text,
            }))
          }
          right={
            <TextInput.Icon
              onPress={() =>
                setIcon((prev) => ({
                  ...prev,
                  seeOld: !prev.seeOld,
                  old: prev.old === "eye" ? "eye-off" : "eye",
                }))
              }
              icon={icon.old}
              color={Colors.color}
            />
          }
        />
        <InputThemed
          label="Ingrese su actual contraseña"
          autoCapitalize="none"
          secureTextEntry={icon.seeNew}
          updateText={(text, disabled) => {
            setUpdate((prev) => ({
              ...prev,
              newPassword: text,
            }));
            setIsValidForm(disabled);
          }}
          right={
            <TextInput.Icon
              onPress={() =>
                setIcon((prev) => ({
                  ...prev,
                  seeNew: !prev.seeNew,
                  new: prev.new === "eye" ? "eye-off" : "eye",
                }))
              }
              icon={icon.new}
              color={Colors.color}
            />
          }
        />
        <Pressable
          disabled={!validForm}
          onPress={() =>handleUpdate()}
          className={`py-4 rounded-xl my-4 active:bg-button/60 ${validForm ? "bg-button" : "bg-gray-300"}`}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center text-xl font-semibold">
              Registrarse
            </Text>
          )}
        </Pressable>
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
    </ScrollView>
  );
};

export default SecurityProfile;

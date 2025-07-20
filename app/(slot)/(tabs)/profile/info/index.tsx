import { Pressable, View, Text, ScrollView } from "react-native";
import { useState } from "react";
import { IconGo, IconPencil, IconProfileHome } from "@/components/ui/Icons";
import { Colors } from "@/constants/Colors";
import { ModalInput } from "@/components/Modal";

type InputType = "decimal" | "email" | "numeric" | "text";

const ProfileHome = () => {
  const [modalProps, setModalProps] = useState<{
    label: string;
    isOpen: boolean;
    inputMode: InputType;
    inputValue: string;
  }>({
    label: "",
    isOpen: false,
    inputMode: "text",
    inputValue: ''
  });

  const content: { label: string; type: InputType; data: string }[] = [
    {
      label: "Nombre",
      type: "text",
      data: "Luis Eduardo",
    },
    {
      label: "Apellido",
      type: "text",
      data: "Bravo",
    },
    {
      label: "Número de celular",
      type: "numeric",
      data: "+593 97 882 3632",
    },
    {
      label: "Dirección",
      type: "text",
      data: "Quevedo, el Guayacan",
    },
  ];

  return (
    <ScrollView>
      <View className="px-6 my-4">
        <View className="relative">
          <IconProfileHome
            size={120}
            color={Colors.color}
          />
          <Pressable className="absolute bottom-4 left-20 bg-button rounded-full">
            <IconPencil color="white" />
          </Pressable>
        </View>
        {content.map((item, index) => (
          <Pressable
            key={index}
            onPress={() =>
              setModalProps((prev) => ({
                ...prev,
                isOpen: true,
                label: item.label,
                inputMode: item.type,
                inputValue: item.data
              }))
            }
            className="py-4 flex flex-row items-center justify-between border-b-2 border-color active:bg-gray-200"
          >
            <View>
              <Text className="font-semibold text-xl text-color">
                {item.label}
              </Text>
              <Text className="font-normal text-lg text-color">
                {item.data}
              </Text>
            </View>
            <IconGo size={20} />
          </Pressable>
        ))}
        <ModalInput
          label={modalProps.label}
          isOpen={modalProps.isOpen}
          textValue={modalProps.inputValue}
          inputMode={modalProps.inputMode}
          onClose={() => setModalProps((prev) => ({ ...prev, isOpen: false }))}
          onSendData={(text) => console.log(text)}
        />
      </View>
    </ScrollView>
  );
};

export default ProfileHome;

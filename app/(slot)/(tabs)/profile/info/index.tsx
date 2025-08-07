import { Pressable, View, Text, KeyboardAvoidingView } from "react-native";
import { useEffect, useState } from "react";
import { IconPencil, IconProfileHome } from "@/components/ui/Icons";
import { Colors } from "@/constants/Colors";
import InputThemed from "@/components/ui/InputThemed";
import { ActivityIndicator } from "react-native-paper";

interface ValidForm {
  name: boolean;
  lastName: boolean;
  phone: boolean;
}

const ProfileHome = () => {
  const [inputs, setInputs] = useState({
    name: "",
    lastName: "",
    phone: "",
  });
  const [validForm, setValidForm] = useState<ValidForm>({
    name: true,
    lastName: true,
    phone: true,
  });
  const [isValid, setIsValid] = useState<boolean>(false);
  const [loading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const allValid = Object.values(validForm).every(Boolean);
    setIsValid(allValid && inputs.phone.length > 0);
  }, [validForm]);

  const hanldeUpdate = async () => {
    setIsLoading(true);
    setIsLoading(false);
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <View className="px-6 my-4">
        <View className="relative">
          <IconProfileHome size={120} color={Colors.color} />
          <Pressable className="absolute bottom-4 left-20 bg-button rounded-full">
            <IconPencil color="white" />
          </Pressable>
        </View>
        <InputThemed
          label="Nombre"
          autoCapitalize="words"
          value={inputs.name}
          updateText={(text, disabled) => {
            setInputs((prev) => ({
              ...prev,
              name: text,
            }));
            setValidForm((prev) => ({ ...prev, name: disabled }));
          }}
        />
        <InputThemed
          label="Apellido"
          autoCapitalize="words"
          value={inputs.lastName}
          updateText={(text, disabled) => {
            setInputs((prev) => ({
              ...prev,
              lastName: text,
            }));
            setValidForm((prev) => ({ ...prev, lastName: disabled }));
          }}
        />
        <InputThemed
          label="Celular"
          autoCapitalize="words"
          value={inputs.phone}
          inputMode="numeric"
          updateText={(text, disabled) => {
            setInputs((prev) => ({
              ...prev,
              phone: text,
            }));
            setValidForm((prev) => ({ ...prev, phone: disabled }));
          }}
        />
        <Pressable
          disabled={!isValid}
          onPress={hanldeUpdate}
          className={`p-4 rounded-xl my-6 active:bg-button/60 ${isValid ? "bg-button" : "bg-gray-300"}`}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-xl text-white font-semibold text-center">
              Actualizar información
            </Text>
          )}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProfileHome;

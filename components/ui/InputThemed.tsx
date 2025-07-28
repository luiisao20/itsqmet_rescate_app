import { Text, View } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { useState } from "react";

interface Props extends TextInputProps {
  value?: string;

  updateText: (text: string, disabled: boolean) => void;
}

const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const nameRegex: RegExp = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{10,}$/;

const InputThemed = ({
  label,
  autoCapitalize = "words",
  inputMode = "text",
  value,
  updateText,
  ...rest
}: Props) => {
  const [error, setError] = useState<{ message: string; show: boolean }>({
    show: false,
    message: "",
  });

  const setText = (text: string) => {
    switch (label) {
      case "Correo electrónico":
        if (!emailRegex.test(text)) {
          setError({ show: true, message: "El correo es inválido" });
        } else setError((prev) => ({ ...prev, show: false }));
        updateText(text, emailRegex.test(text));
        break;
      case "Nombre":
        if (!nameRegex.test(text)) {
          setError({
            show: true,
            message: "El nombre debe tener mínimo 10 caracteres",
          });
        } else setError((prev) => ({ ...prev, show: false }));
        updateText(text, nameRegex.test(text));
        break;
      case "Apellido":
        if (!nameRegex.test(text)) {
          setError({
            show: true,
            message: "El apellido debe tener mínimo 10 caracteres",
          });
        } else setError((prev) => ({ ...prev, show: false }));
        updateText(text, nameRegex.test(text));
        break;
      case "Contraseña":
        if (!passwordRegex.test(text)) {
          setError({
            show: true,
            message:
              "La contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un caracter especial (!'&+-,./-@?:;)",
          });
        } else setError((prev) => ({ ...prev, show: false }));
        updateText(text, passwordRegex.test(text));
        break;
      case "Ingrese su actual contraseña":
        if (!passwordRegex.test(text)) {
          setError({
            show: true,
            message:
              "La contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un caracter especial (!'&+-,./-@?:;)",
          });
        } else setError((prev) => ({ ...prev, show: false }));
        updateText(text, passwordRegex.test(text));
        break;
      case "Ingrese su actual contraseña":
        if (!passwordRegex.test(text)) {
          setError({
            show: true,
            message:
              "La contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un caracter especial (!'&+-,./-@?:;)",
          });
        } else setError((prev) => ({ ...prev, show: false }));
        updateText(text, passwordRegex.test(text));
        break;
      case "Celular":
        if (text.length < 10) {
          setError({
            show: true,
            message:
              "El número celular debe tener mínimo 10 dígitos",
          });
        } else setError((prev) => ({ ...prev, show: false }));
        updateText(text, !(text.length < 10));
        break;
      case "Confirmar contraseña":
        updateText(text, false);
        break;
      default:
        break;
    }
  };

  return (
    <View>
      <TextInput
        {...rest}
        className="bg-white w-full"
        label={label}
        autoCapitalize={autoCapitalize}
        mode="flat"
        inputMode={inputMode}
        textColor={Colors.color}
        underlineColor={Colors.color}
        activeUnderlineColor={Colors.button}
        value={value}
        onChangeText={(text) => setText(text)}
      />
      {error.show && (
        <Text className="text-danger font-light mt-4 px-2 text-xs">
          {`Error! ${error.message}`}
        </Text>
      )}
    </View>
  );
};

export default InputThemed;

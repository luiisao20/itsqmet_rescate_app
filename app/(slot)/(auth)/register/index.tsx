import { View, Text, KeyboardAvoidingView, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import InputThemed from "@/components/ui/InputThemed";
import { CustomerDB } from "@/infraestructure/database/tables";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";

interface Login {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  seePassword: boolean;
  seeConfirmPassword: boolean;
  icon: string;
  iconConfirm: string;
}

interface ValidForm {
  name: boolean;
  lastName: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
}

const RegisterScreen = () => {
  const [form, setForm] = useState<Login>({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    seePassword: true,
    seeConfirmPassword: true,
    icon: "eye",
    iconConfirm: "eye",
  });
  const [validForm, setValidForm] = useState<ValidForm>({
    name: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [loading, setIsLoading] = useState<boolean>(false);
  const { register } = useAuthStore();

  const onRegister = async () => {
    if (!validForm.confirmPassword) {
      setError({
        show: true,
        message: "Las contraseñas no coinciden",
      });
      return;
    }

    setIsLoading(true);
    const wasSuccessful = await register(
      form.email,
      form.password,
      form.name,
      form.lastName
    );
    if (wasSuccessful) router.replace("/login");
    setIsLoading(false);
  };

  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [error, setError] = useState<{ show: boolean; message: string }>({
    message: "",
    show: false,
  });

  useEffect(() => {
    const allValid = Object.values(validForm).every(Boolean);
    setIsFormValid(allValid);
  }, [validForm]);

  useEffect(() => {
    const equals = form.confirmPassword === form.password;
    setValidForm((prev) => ({ ...prev, confirmPassword: equals }));
  }, [form.password, form.confirmPassword]);

  return (
    <KeyboardAvoidingView behavior="position">
      <SafeAreaView>
        <View className="bg-background w-[95%] p-4 rounded-xl mx-auto">
          <Image
            source={require("@/assets/images/rescate-app-logo.png")}
            style={{
              resizeMode: "contain",
              width: "100%",
              height: 180,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          />
          <View className="flex gap-2">
            <Text className="text-2xl text-center my-4 text-color font-semibold">
              Crea tu nueva cuenta
            </Text>
            <InputThemed
              label="Nombre"
              autoCapitalize="words"
              updateText={(text, disabled) => {
                setForm((prev) => ({ ...prev, name: text }));
                setValidForm((prev) => ({ ...prev, name: disabled }));
              }}
            />
            <InputThemed
              label="Apellido"
              autoCapitalize="words"
              updateText={(text, disabled) => {
                setForm((prev) => ({ ...prev, lastName: text }));
                setValidForm((prev) => ({ ...prev, lastName: disabled }));
              }}
            />
            <InputThemed
              label="Correo electrónico"
              autoCapitalize="none"
              updateText={(text, disabled) => {
                setForm((prev) => ({ ...prev, email: text }));
                setValidForm((prev) => ({ ...prev, email: disabled }));
              }}
              right={<TextInput.Icon icon="email" color={Colors.color} />}
            />
            <InputThemed
              label="Contraseña"
              autoCapitalize="none"
              secureTextEntry={form.seePassword}
              updateText={(text, disabled) => {
                setForm((prev) => ({
                  ...prev,
                  password: text,
                }));
                setValidForm((prev) => ({ ...prev, password: disabled }));
              }}
              right={
                <TextInput.Icon
                  onPress={() =>
                    setForm((prev) => ({
                      ...prev,
                      seePassword: !prev.seePassword,
                      icon: prev.icon === "eye" ? "eye-off" : "eye",
                    }))
                  }
                  icon={form.icon}
                  color={Colors.color}
                />
              }
            />
            <InputThemed
              label="Confirmar contraseña"
              autoCapitalize="none"
              id="confirm-password"
              secureTextEntry={form.seeConfirmPassword}
              updateText={(text) =>
                setForm((prev) => ({
                  ...prev,
                  confirmPassword: text,
                }))
              }
              right={
                <TextInput.Icon
                  onPress={() =>
                    setForm((prev) => ({
                      ...prev,
                      seeConfirmPassword: !prev.seeConfirmPassword,
                      iconConfirm:
                        prev.iconConfirm === "eye" ? "eye-off" : "eye",
                    }))
                  }
                  icon={form.iconConfirm}
                  color={Colors.color}
                />
              }
            />
            {error.show && (
              <Text className="text-danger font-light mt-4 px-2 text-xs">
                {`Error! ${error.message}`}
              </Text>
            )}
          </View>
          <Pressable
            disabled={!isFormValid}
            onPress={() => onRegister()}
            className={`py-4 rounded-xl my-4 active:bg-button/60 ${isFormValid ? "bg-button" : "bg-gray-300"}`}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-center text-xl font-semibold">
                Registrarse
              </Text>
            )}
          </Pressable>
          <Pressable onPress={() => router.push("/(slot)/(auth)/login")}>
            <Text className="text-lg">
              ¿Ya posees una cuenta?{" "}
              <Text className="text-color underline underline-offset-2">
                Inicia sesión aquí.
              </Text>
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

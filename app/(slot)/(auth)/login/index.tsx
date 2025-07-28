import { useState } from "react";
import { View, Text, KeyboardAvoidingView, Pressable } from "react-native";
import { router } from "expo-router";

import { ActivityIndicator, TextInput } from "react-native-paper";
import { Image } from "expo-image";
import { Colors } from "@/constants/Colors";
import { loginUser } from "@/utils/auth";
import { ModalInput } from "@/components/Modal";

interface Login {
  email: string;
  password: string;
  seePassword: boolean;
  icon: string;
}

const LoginScreen = () => {
  const [login, setLogin] = useState<Login>({
    email: "",
    password: "",
    seePassword: true,
    icon: "eye",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setIsOpen] = useState<boolean>(false);

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      const user = await loginUser(login.email, login.password);
      router.push("/(slot)/(tabs)");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }

    setIsLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="flex justify-center items-center flex-1 bg-button"
    >
      <View className="bg-background mx-10 w-4/5 p-4 rounded-xl">
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
        <View className="flex gap-4">
          <Text className="text-2xl text-center my-4 text-color font-semibold">
            Ingresa a tu cuenta
          </Text>
          <TextInput
            label="Correo electrónico"
            className="bg-background w-full"
            autoCapitalize="none"
            textColor={Colors.color}
            underlineColor={Colors.color}
            activeUnderlineColor={Colors.button}
            inputMode="email"
            onChangeText={(text) =>
              setLogin((prev) => ({
                ...prev,
                email: text,
              }))
            }
            right={<TextInput.Icon icon="email" color={Colors.color} />}
          />
          <TextInput
            label="Contraseña"
            autoCapitalize="none"
            className="bg-background w-full"
            textColor={Colors.color}
            underlineColor={Colors.color}
            activeUnderlineColor={Colors.button}
            secureTextEntry={login.seePassword}
            onChangeText={(text) =>
              setLogin((prev) => ({
                ...prev,
                password: text,
              }))
            }
            right={
              <TextInput.Icon
                onPress={() =>
                  setLogin((prev) => ({
                    ...prev,
                    seePassword: !prev.seePassword,
                    icon: prev.icon === "eye" ? "eye-off" : "eye",
                  }))
                }
                icon={login.icon}
                color={Colors.color}
              />
            }
          />
        </View>
        <Pressable
          onPress={() => handleLogin()}
          disabled={isLoading}
          className="bg-button py-4 rounded-xl my-4 active:bg-button/60"
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center text-xl font-semibold">
              Iniciar sesión
            </Text>
          )}
        </Pressable>
        <Pressable
          onPress={() => setIsOpen(true)}
          className="my-4"
        >
          <Text className="text-lg">
            ¿Olvidaste tu contraseña?{" "}
            <Text className="text-color underline underline-offset-2">
              Haz clic aquí.
            </Text>
          </Text>
        </Pressable>
        <Pressable onPress={() => router.push("/(slot)/(auth)/register")}>
          <Text className="text-lg">
            ¿No posees una cuenta?{" "}
            <Text className="text-color underline underline-offset-2">
              Regístrate aquí.
            </Text>
          </Text>
        </Pressable>
      </View>
      <ModalInput
        isOpen={open}
        inputMode="email"
        label="Correo electrónico"
        labelButton="Enviar"
        message="Envía un correo de reestablecimiento de contraseña"
        onClose={() => setIsOpen(false)}
      />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

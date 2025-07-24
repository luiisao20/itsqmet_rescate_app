import { View, Text, KeyboardAvoidingView, Pressable } from "react-native";
import { useState } from "react";
import { Image } from "expo-image";
import { TextInput } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const RegisterScreen = () => {
  const [login, setLogin] = useState<{
    name: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    seePassword: boolean;
    seeConfirmPassword: boolean;
    icon: string;
    iconConfirm: string;
  }>({
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

  return (
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
            <TextInput
              label="Nombre"
              className="bg-background w-full"
              autoCapitalize="words"
              textColor={Colors.color}
              underlineColor={Colors.color}
              activeUnderlineColor={Colors.button}
              inputMode="text"
              onChangeText={(text) =>
                setLogin((prev) => ({
                  ...prev,
                  name: text,
                }))
              }
            />
            <TextInput
              label="Apellido"
              className="bg-background w-full"
              autoCapitalize="words"
              textColor={Colors.color}
              underlineColor={Colors.color}
              activeUnderlineColor={Colors.button}
              inputMode="text"
              onChangeText={(text) =>
                setLogin((prev) => ({
                  ...prev,
                  lastName: text,
                }))
              }
            />
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
            <TextInput
              label="Confirmar contraseña"
              autoCapitalize="none"
              className="bg-background w-full"
              textColor={Colors.color}
              underlineColor={Colors.color}
              activeUnderlineColor={Colors.button}
              secureTextEntry={login.seeConfirmPassword}
              onChangeText={(text) =>
                setLogin((prev) => ({
                  ...prev,
                  confirmPassword: text,
                }))
              }
              right={
                <TextInput.Icon
                  onPress={() =>
                    setLogin((prev) => ({
                      ...prev,
                      seeConfirmPassword: !prev.seeConfirmPassword,
                      iconConfirm:
                        prev.iconConfirm === "eye" ? "eye-off" : "eye",
                    }))
                  }
                  icon={login.iconConfirm}
                  color={Colors.color}
                />
              }
            />
          </View>
          <Pressable
            onPress={() => router.push("/(slot)/(tabs)")}
            className="bg-button py-4 rounded-xl my-4 active:bg-button/60"
          >
            <Text className="text-white text-center text-xl font-semibold">
              Registrarse
            </Text>
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
  );
};

export default RegisterScreen;

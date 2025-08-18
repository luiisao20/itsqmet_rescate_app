import {
  View,
  Text,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";

import { Colors } from "@/constants/Colors";
import InputThemed from "@/components/ui/InputThemed";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { registerSchema } from "@/presentation/customer/error/get-error-form";
import { CustomErrorMessage } from "@/components/CustomErrorMessage";

interface Login {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  seePassword: boolean;
  seeConfirmPassword: boolean;
}

const RegisterScreen = () => {
  const form: Login = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    seePassword: true,
    seeConfirmPassword: true,
  };
  const { register } = useAuthStore();

  return (
    <KeyboardAvoidingView behavior="padding">
      <SafeAreaView>
        <ScrollView>
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
            <Formik
              validationSchema={registerSchema}
              initialValues={form}
              onSubmit={async (formLike, { setSubmitting }) => {
                const wasSuccessful = await register(
                  formLike.email,
                  formLike.password,
                  formLike.name,
                  formLike.lastName
                );
                setSubmitting(false);
                if (wasSuccessful) router.replace("/login");
              }}
            >
              {({
                values,
                errors,
                touched,
                isValid,
                isSubmitting,

                setFieldValue,
                handleSubmit,
                handleChange,
                handleBlur,
              }) => (
                <>
                  <View className="flex gap-2">
                    <Text className="text-2xl text-center my-4 text-color font-semibold">
                      Crea tu nueva cuenta
                    </Text>
                    <InputThemed
                      label="Nombre"
                      autoCapitalize="words"
                      value={values.name}
                      updateText={handleChange("name")}
                      onBlur={handleBlur("name")}
                    />
                    <CustomErrorMessage
                      name="name"
                      errors={errors}
                      touched={touched}
                    />
                    <InputThemed
                      label="Apellido"
                      autoCapitalize="words"
                      value={values.lastName}
                      updateText={handleChange("lastName")}
                      onBlur={handleBlur("lastName")}
                    />
                    <CustomErrorMessage
                      name="lastName"
                      errors={errors}
                      touched={touched}
                    />
                    <InputThemed
                      label="Correo electrónico"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      value={values.email}
                      updateText={handleChange("email")}
                      right={
                        <TextInput.Icon icon="email" color={Colors.color} />
                      }
                      onBlur={handleBlur("email")}
                    />
                    <CustomErrorMessage
                      name="email"
                      errors={errors}
                      touched={touched}
                    />
                    <InputThemed
                      label="Contraseña"
                      autoCapitalize="none"
                      secureTextEntry={values.seePassword}
                      value={values.password}
                      updateText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      right={
                        <TextInput.Icon
                          onPress={() =>
                            setFieldValue("seePassword", !values.seePassword)
                          }
                          icon={values.seePassword ? "eye" : "eye-off"}
                          color={Colors.color}
                        />
                      }
                    />
                    <CustomErrorMessage
                      name="password"
                      errors={errors}
                      touched={touched}
                    />
                    <InputThemed
                      label="Confirmar contraseña"
                      autoCapitalize="none"
                      id="confirm-password"
                      secureTextEntry={values.seeConfirmPassword}
                      updateText={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      right={
                        <TextInput.Icon
                          onPress={() =>
                            setFieldValue(
                              "seeConfirmPassword",
                              !values.seeConfirmPassword
                            )
                          }
                          icon={values.seeConfirmPassword ? "eye" : "eye-off"}
                          color={Colors.color}
                        />
                      }
                    />
                    <CustomErrorMessage
                      name="confirmPassword"
                      errors={errors}
                      touched={touched}
                    />
                  </View>
                  <Pressable
                    disabled={!isValid && isSubmitting}
                    onPress={() => handleSubmit()}
                    className={`py-4 rounded-xl my-4 active:bg-button/60 ${isValid ? "bg-button" : "bg-gray-300"}`}
                  >
                    {isSubmitting ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Text className="text-white text-center text-xl font-semibold">
                        Registrarse
                      </Text>
                    )}
                  </Pressable>
                </>
              )}
            </Formik>
            <Pressable onPress={() => router.push("/(slot)/(auth)/login")}>
              <Text className="text-lg">
                ¿Ya posees una cuenta?{" "}
                <Text className="text-color underline underline-offset-2">
                  Inicia sesión aquí.
                </Text>
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

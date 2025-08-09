import { Pressable, View, Text, KeyboardAvoidingView } from "react-native";
import { Formik } from "formik";
import { ActivityIndicator } from "react-native-paper";

import { IconPencil, IconProfileHome } from "@/components/ui/Icons";
import { Colors } from "@/constants/Colors";
import InputThemed from "@/components/ui/InputThemed";
import { useCustomer } from "@/presentation/customer/useCustomer";
import { userInfoSchema } from "@/presentation/customer/error/get-error-form";
import { CustomErrorMessage } from "@/components/CustomErrorMessage";

const ProfileHome = () => {
  const { customerQuery, customerMutation } = useCustomer();

  if (!customerQuery.data) {
    return;
  }

  const customer = customerQuery.data;
  return (
    <KeyboardAvoidingView behavior="padding">
      <View className="px-6 my-4">
        <View className="relative">
          <IconProfileHome size={120} color={Colors.color} />
          <Pressable className="absolute bottom-4 left-20 bg-button rounded-full">
            <IconPencil color="white" />
          </Pressable>
        </View>
        <Formik
          initialValues={customer}
          onSubmit={async (customerLike, { setSubmitting }) => {
            await customerMutation.mutateAsync({ ...customerLike });
            setSubmitting(false);
          }}
          validationSchema={userInfoSchema}
        >
          {({
            values,
            errors,
            touched,
            isValid,
            isSubmitting,

            handleSubmit,
            handleChange,
            handleBlur,
          }) => (
            <View>
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
                value={values.last_name}
                updateText={handleChange("last_name")}
                onBlur={handleBlur("last_name")}
              />
              <CustomErrorMessage
                name="last_name"
                errors={errors}
                touched={touched}
              />
              <InputThemed
                label="Celular"
                autoCapitalize="words"
                value={values.cellphone ? values.cellphone : ""}
                inputMode="numeric"
                updateText={handleChange("cellphone")}
                onBlur={handleBlur("cellphone")}
              />
              <CustomErrorMessage
                name="cellphone"
                errors={errors}
                touched={touched}
              />
              <Pressable
                disabled={!isValid || isSubmitting}
                onPress={() => handleSubmit()}
                className={`p-4 rounded-xl my-6 active:bg-button/60 ${isValid ? "bg-button" : "bg-gray-300"}`}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-xl text-white font-semibold text-center">
                    Actualizar información
                  </Text>
                )}
              </Pressable>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProfileHome;

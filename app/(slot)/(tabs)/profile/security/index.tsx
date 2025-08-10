import {
  View,
  Text,
  Pressable,
  ScrollView,
  Alert,
  RefreshControl,
} from "react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { Formik } from "formik";

import { Colors } from "@/constants/Colors";
import { IconGo } from "@/components/ui/Icons";
import InputThemed from "@/components/ui/InputThemed";
import { updatePasswordSchema } from "@/presentation/customer/error/get-error-form";
import { CustomErrorMessage } from "@/components/CustomErrorMessage";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { ModalCard } from "@/presentation/card/components/Modal";
import { CardDB } from "@/core/database/interfaces/card";
import { useCards } from "@/presentation/card/useCards";

const SecurityProfile = () => {
  const update: { oldPassword: string; newPassword: string } = {
    oldPassword: "",
    newPassword: "",
  };
  const [icon, setIcon] = useState<{ seeOld: boolean; seeNew: boolean }>({
    seeOld: true,
    seeNew: true,
  });
  const [customerCards, setCustomerCards] = useState<CardDB[] | null>();
  const [idCardToUpdate, setIdCardToUpdate] = useState<number | undefined>();
  const { changePassword } = useAuthStore();
  const { cardQuery } = useCards();

  useEffect(() => {
    if (cardQuery.data) {
      setCustomerCards(cardQuery.data);
    }
  }, [cardQuery.data]);

  const [modalProps, setModalProps] = useState<{
    label: string;
    isOpen: boolean;
    showDelete?: boolean;
  }>({
    label: "",
    isOpen: false,
    showDelete: true,
  });

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={cardQuery.isFetching}
          onRefresh={async () => await cardQuery.refetch()}
        />
      }
      className="px-6 my-4"
    >
      <Text className="text-3xl font-semibold text-center text-color">
        Seguridad
      </Text>
      <View className="p-4 my-4 border border-color rounded-xl flex gap-4">
        <Text className="text-xl text-center text-color font-normal">
          Cambiar contraseña
        </Text>
        <Formik
          validationSchema={updatePasswordSchema}
          initialValues={update}
          onSubmit={async (formLike, { setSubmitting }) => {
            const success = await changePassword(
              formLike.oldPassword,
              formLike.newPassword
            );

            if (success)
              Alert.alert(
                "Exito",
                "La contraseña se ha actualizado con éxito!"
              );
            setSubmitting(false);
          }}
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
            <>
              <InputThemed
                label="Ingrese su actual contraseña"
                autoCapitalize="none"
                secureTextEntry={icon.seeOld}
                value={values.oldPassword}
                updateText={handleChange("oldPassword")}
                onBlur={handleBlur("oldPassword")}
                right={
                  <TextInput.Icon
                    onPress={() =>
                      setIcon((prev) => ({ ...prev, seeOld: !prev.seeOld }))
                    }
                    icon={icon.seeOld ? "eye" : "eye-off"}
                    color={Colors.color}
                  />
                }
              />
              <InputThemed
                label="Ingrese su nueva contraseña"
                autoCapitalize="none"
                secureTextEntry={icon.seeNew}
                value={values.newPassword}
                updateText={handleChange("newPassword")}
                onBlur={handleBlur("newPassword")}
                right={
                  <TextInput.Icon
                    onPress={() =>
                      setIcon((prev) => ({ ...prev, seeNew: !prev.seeNew }))
                    }
                    icon={icon.seeNew ? "eye" : "eye-off"}
                    color={Colors.color}
                  />
                }
              />
              <CustomErrorMessage
                name="newPassword"
                errors={errors}
                touched={touched}
              />
              <Pressable
                disabled={!isValid}
                onPress={() => handleSubmit()}
                className={`py-4 rounded-xl mb-4 active:bg-button/60 ${isValid ? "bg-button" : "bg-gray-300"}`}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white text-center text-xl font-semibold">
                    Actualizar contraseña
                  </Text>
                )}
              </Pressable>
            </>
          )}
        </Formik>
      </View>
      <View className="p-4 my-4 border border-color rounded-xl flex gap-4">
        <Text className="text-xl text-center text-color font-normal">
          Administrar tarjetas
        </Text>
        {cardQuery.isPending ? (
          <ActivityIndicator color={Colors.button} size={50} />
        ) : (
          customerCards?.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => {
                setIdCardToUpdate(item.id);
                setModalProps((prev) => ({
                  ...prev,
                  isOpen: true,
                  showDelete: true,
                }));
              }}
              className="py-4 flex flex-row items-center justify-between border-b-2 border-color active:bg-gray-200"
            >
              <View>
                <Text className="font-semibold text-xl text-color">
                  {item.type} ****{item.number}
                </Text>
                <Text className="font-normal text-lg text-color">
                  Activa {item.month} / {item.year}
                </Text>
              </View>
              <IconGo size={20} />
            </Pressable>
          ))
        )}
        <Pressable
          onPress={() => {
            setIdCardToUpdate(undefined);
            setModalProps((prev) => ({
              ...prev,
              isOpen: true,
              showDelete: false,
            }));
          }}
          className="bg-button active:bg-button/60 p-4 rounded-xl mx-10"
        >
          <Text className="text-xl text-white font-semibold text-center">
            Añadir tarjeta
          </Text>
        </Pressable>
      </View>
      <ModalCard
        idCurrentCard={idCardToUpdate}
        isOpen={modalProps.isOpen}
        showDelete={modalProps.showDelete}
        onClose={() => setModalProps((prev) => ({ ...prev, isOpen: false }))}
      />
    </ScrollView>
  );
};

export default SecurityProfile;

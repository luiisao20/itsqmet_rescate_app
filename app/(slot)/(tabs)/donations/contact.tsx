import { CustomErrorMessage } from "@/components/CustomErrorMessage";
import Select from "@/components/Select";
import InputThemed from "@/components/ui/InputThemed";
import { Colors } from "@/constants/Colors";
import { sendContactInfo } from "@/core/database/actions/contact/send-contact-info.action";
import { Contact } from "@/core/database/interfaces/contact";
import {
  establishmentTypes,
  foodTypes,
} from "@/presentation/contact/constants";
import { contactInfoSchema } from "@/presentation/customer/error/get-error-form";
import { router } from "expo-router";
import { Formik } from "formik";
import { KeyboardAvoidingView, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";

const contact = () => {
  const contactInfo: Contact = {
    companyName: "",
    brandName: "",
    ruc: "",
    establishmentType: "",
    foodType: "",
    address: "",
    phone: "",
    email: "",
    contactName: "",
    contactLastName: "",
    contactId: "",
    contactPosition: "",
    contactPhone: "",
    contactEmail: "",
  };

  return (
    <KeyboardAvoidingView behavior="position">
      <ScrollView className="px-6" keyboardShouldPersistTaps="handled">
        <Text className="text-lg text-justify text-color">
          Ingrese la información necesaria y el equipo de Rescate App se
          contactará con ustedes en la mayor brevedad posible
        </Text>
        <View className="mb-20 flex gap-6">
          <Formik
            validationSchema={contactInfoSchema}
            initialValues={contactInfo}
            onSubmit={async (contactLike, { setSubmitting }) => {
              try {
                await sendContactInfo(contactLike);
                router.push("/donations/success");
              } catch (error) {
                console.log(error);
              }
              setSubmitting(false);
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
                <View className="bg-background w-[95%] p-4 rounded-xl mx-auto">
                  <Text className="text-color text-lg font-semibold text-center">
                    Información del establecimiento
                  </Text>
                  <InputThemed
                    label="Razón social (obligatorio)"
                    autoCapitalize="words"
                    inputMode="text"
                    value={values.companyName}
                    updateText={handleChange("companyName")}
                    onBlur={handleBlur("companyName")}
                  />
                  <CustomErrorMessage
                    name="companyName"
                    errors={errors}
                    touched={touched}
                  />
                  <InputThemed
                    label="Nombre comercial"
                    autoCapitalize="words"
                    inputMode="text"
                    value={values.brandName}
                    updateText={handleChange("brandName")}
                    onBlur={handleBlur("brandName")}
                  />
                  <InputThemed
                    label="RUC"
                    inputMode="numeric"
                    textColor={Colors.color}
                    value={values.ruc}
                    updateText={handleChange("ruc")}
                    onBlur={handleBlur("ruc")}
                  />
                  <CustomErrorMessage
                    name="ruc"
                    errors={errors}
                    touched={touched}
                  />
                  <Select
                    title="Escoja el tipo de establecimiento (obligatorio)"
                    elements={establishmentTypes}
                    onSelected={(item) =>
                      setFieldValue("establishmentType", item)
                    }
                    type="Tipo de establecimiento"
                    onOtherValue={(value) =>
                      setFieldValue("establishmentType", value)
                    }
                  />
                  <CustomErrorMessage
                    name="establishmentType"
                    errors={errors}
                    touched={touched}
                  />
                  <Select
                    title="Escoja la categoría de comida (obligatorio)"
                    elements={foodTypes}
                    onSelected={(item) => setFieldValue("foodType", item)}
                    type="Categoría de comida"
                    onOtherValue={(value) => setFieldValue("foodType", value)}
                  />
                  <CustomErrorMessage
                    name="foodType"
                    errors={errors}
                    touched={touched}
                  />
                  <InputThemed
                    label="Dirección principal"
                    autoCapitalize="words"
                    inputMode="text"
                    value={values.address}
                    updateText={handleChange("address")}
                  />
                  <CustomErrorMessage
                    name="address"
                    errors={errors}
                    touched={touched}
                  />
                  <InputThemed
                    label="Teléfono del local"
                    autoCapitalize="words"
                    inputMode="numeric"
                    value={values.phone}
                    updateText={handleChange("phone")}
                  />
                  <InputThemed
                    label="Correo electrónico del local"
                    autoCapitalize="words"
                    inputMode="email"
                    value={values.email}
                    updateText={handleChange("email")}
                    onBlur={handleBlur("email")}
                  />
                </View>
                <View className="bg-background w-[95%] p-4 rounded-xl mx-auto">
                  <Text className="text-color text-lg font-semibold text-center">
                    Información del Representante legal
                  </Text>
                  <InputThemed
                    label="Nombres"
                    autoCapitalize="words"
                    inputMode="text"
                    value={values.contactName}
                    updateText={handleChange("contactName")}
                    onBlur={handleBlur("contactName")}
                  />
                  <CustomErrorMessage
                    name="contactName"
                    errors={errors}
                    touched={touched}
                  />
                  <InputThemed
                    label="Apellidos"
                    autoCapitalize="words"
                    inputMode="text"
                    value={values.contactLastName}
                    updateText={handleChange("contactLastName")}
                    onBlur={handleBlur("contactLastName")}
                  />
                  <CustomErrorMessage
                    name="contactLastName"
                    errors={errors}
                    touched={touched}
                  />
                  <InputThemed
                    label="Cédula o documento de identidad"
                    inputMode="numeric"
                    value={values.contactId}
                    updateText={handleChange("contactId")}
                    onBlur={handleBlur("contactId")}
                  />
                  <CustomErrorMessage
                    name="contactId"
                    errors={errors}
                    touched={touched}
                  />
                  <InputThemed
                    label="Cargo (ej. gerente)"
                    autoCapitalize="words"
                    inputMode="text"
                    value={values.contactPosition}
                    updateText={handleChange("contactPosition")}
                    onBlur={handleBlur("contactPosition")}
                  />
                  <CustomErrorMessage
                    name="contactPosition"
                    errors={errors}
                    touched={touched}
                  />
                  <InputThemed
                    label="Teléfono de contacto"
                    autoCapitalize="words"
                    inputMode="numeric"
                    value={values.contactPhone}
                    updateText={handleChange("contactPhone")}
                    onBlur={handleBlur("contactPhone")}
                  />
                  <CustomErrorMessage
                    name="contactPhone"
                    errors={errors}
                    touched={touched}
                  />
                  <InputThemed
                    label="Correo electrónico personal / laboral"
                    autoCapitalize="words"
                    inputMode="email"
                    value={values.contactEmail}
                    updateText={handleChange("contactEmail")}
                    onBlur={handleBlur("contactEmail")}
                  />
                  <CustomErrorMessage
                    name="contactEmail"
                    errors={errors}
                    touched={touched}
                  />
                  <Pressable
                    disabled={!isValid || isSubmitting}
                    onPress={() => handleSubmit()}
                    className={`py-4 rounded-xl my-4 active:bg-button/60 ${isValid ? "bg-button" : "bg-gray-300"}`}
                  >
                    {isSubmitting ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Text className="text-white text-center text-xl font-semibold">
                        Enviar datos
                      </Text>
                    )}
                  </Pressable>
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default contact;

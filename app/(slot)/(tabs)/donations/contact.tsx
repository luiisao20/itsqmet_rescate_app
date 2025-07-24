import { View, Text, KeyboardAvoidingView, Pressable } from "react-native";
import { TextInput } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import Select from "@/components/Select";
import { EstablishmentType } from "@/infraestructure/interfaces/selections";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import {
  ContactCompany,
  ContactPerson,
} from "@/infraestructure/interfaces/contact-info";
import {router} from "expo-router";

const contact = () => {
  const establishmentTypes: EstablishmentType[] = [
    { label: "SELECCIONAR", value: "0" },
    { label: "Restaurante", value: "restaurante" },
    { label: "Cafetería", value: "cafeteria" },
    { label: "Panadería", value: "panaderia" },
    { label: "Pastelería", value: "pasteleria" },
    { label: "Comida rápida", value: "comida_rapida" },
    { label: "Food Truck", value: "food_truck" },
    { label: "Buffet", value: "buffet" },
    { label: "Bar / Lounge", value: "bar_lounge" },
    { label: "Catering / Eventos", value: "catering" },
    { label: "Tienda de abarrotes", value: "tienda" },
    { label: "Supermercado pequeño", value: "supermercado_pequeno" },
    { label: "Frutería", value: "fruteria" },
    { label: "Mercado local / plaza", value: "mercado_local" },
    { label: "Otro (especifique)", value: "1" },
  ];

  const foodTypes: EstablishmentType[] = [
    { label: "SELECCIONAR", value: "0" },
    { label: "Comida típica ecuatoriana", value: "tipica_ecuatoriana" },
    { label: "Comida rápida", value: "comida_rapida" },
    { label: "Gourmet", value: "gourmet" },
    { label: "Vegetariana", value: "vegetariana" },
    { label: "Vegana", value: "vegana" },
    { label: "Internacional", value: "internacional" },
    { label: "Asiática", value: "asiatica" },
    { label: "Italiana", value: "italiana" },
    { label: "Postres y dulces", value: "postres_dulces" },
    { label: "Panadería", value: "panaderia" },
    { label: "Pescados y mariscos", value: "mariscos" },
    { label: "Comida casera", value: "comida_casera" },
    { label: "Bebidas y jugos", value: "bebidas" },
    { label: "Otro (especifique)", value: "1" },
  ];

  const [companyInfo, setCompanyInfo] = useState<ContactCompany>({
    companyName: "",
    brandName: "",
    ruc: "",
    establishmentType: "",
    foodType: "",
    address: "",
    phone: "",
    email: "",
  });

  const [contactInfo, setContactInfo] = useState<ContactPerson>({
    name: "",
    lastName: "",
    id: "",
    position: "",
    cellphone: "",
    email: "",
  });

  return (
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={90}>
      <ScrollView className="px-6" keyboardShouldPersistTaps="handled">
        <Text className="text-base text-justify text-color">
          Ingrese la información necesaria y el equipo de Rescate App se
          contactará con ustedes en la mayor brevedad posible
        </Text>
        <View className="mb-20 flex gap-6">
          <View className="bg-background w-[95%] p-4 rounded-xl mx-auto">
            <Text className="text-color text-lg font-semibold text-center">
              Información del establecimiento
            </Text>
            <TextInput
              label="Razón social (obligatorio)"
              className="bg-background w-full"
              autoCapitalize="words"
              textColor={Colors.color}
              underlineColor={Colors.color}
              activeUnderlineColor={Colors.button}
              inputMode="text"
              value={companyInfo.companyName}
              onChangeText={(text) =>
                setCompanyInfo((prev) => ({ ...prev, companyName: text }))
              }
            />
            <TextInput
              label="Nombre comercial"
              className="bg-background w-full"
              autoCapitalize="words"
              textColor={Colors.color}
              underlineColor={Colors.color}
              activeUnderlineColor={Colors.button}
              inputMode="text"
              value={companyInfo.brandName}
              onChangeText={(text) =>
                setCompanyInfo((prev) => ({ ...prev, brandName: text }))
              }
            />
            <TextInput
              label="RUC"
              className="bg-background w-full"
              textColor={Colors.color}
              underlineColor={Colors.color}
              activeUnderlineColor={Colors.button}
              inputMode="numeric"
              value={companyInfo.ruc}
              onChangeText={(text) =>
                setCompanyInfo((prev) => ({ ...prev, ruc: text }))
              }
            />
            <Select
              title="Escoja el tipo de establecimiento (obligatorio)"
              elements={establishmentTypes}
              onSelected={(item) =>
                setCompanyInfo((prev) => ({
                  ...prev,
                  establishmentType: item,
                }))
              }
              type="Tipo de establecimiento"
              onOtherValue={(value) =>
                setCompanyInfo((prev) => ({
                  ...prev,
                  establishmentType: value,
                }))
              }
            />
            <Select
              title="Escoja la categoría de comida (obligatorio)"
              elements={foodTypes}
              onSelected={(item) =>
                setCompanyInfo((prev) => ({
                  ...prev,
                  foodType: item,
                }))
              }
              type="Categoría de comida"
              onOtherValue={(value) =>
                setCompanyInfo((prev) => ({
                  ...prev,
                  foodType: value,
                }))
              }
            />
            <TextInput
              label="Dirección principal"
              className="bg-background w-full"
              autoCapitalize="words"
              textColor={Colors.color}
              underlineColor={Colors.color}
              activeUnderlineColor={Colors.button}
              inputMode="text"
              value={companyInfo.address}
              onChangeText={(text) =>
                setCompanyInfo((prev) => ({ ...prev, address: text }))
              }
            />
            <TextInput
              label="Teléfono del local"
              className="bg-background w-full"
              autoCapitalize="words"
              textColor={Colors.color}
              underlineColor={Colors.color}
              activeUnderlineColor={Colors.button}
              inputMode="numeric"
              value={companyInfo.phone}
              onChangeText={(text) =>
                setCompanyInfo((prev) => ({ ...prev, phone: text }))
              }
            />
            <TextInput
              label="Correo electrónico del local"
              className="bg-background w-full"
              autoCapitalize="words"
              textColor={Colors.color}
              underlineColor={Colors.color}
              activeUnderlineColor={Colors.button}
              inputMode="email"
              value={companyInfo.email}
              onChangeText={(text) =>
                setCompanyInfo((prev) => ({ ...prev, email: text }))
              }
            />
          </View>
          <View className="bg-background w-[95%] p-4 rounded-xl mx-auto">
            <Text className="text-color text-lg font-semibold text-center">
              Información del Representante legal
            </Text>
            <TextInput
              label="Nombres"
              className="bg-background w-full"
              autoCapitalize="words"
              textColor={Colors.color}
              underlineColor={Colors.color}
              activeUnderlineColor={Colors.button}
              inputMode="text"
              value={contactInfo.name}
              onChangeText={(text) =>
                setContactInfo((prev) => ({ ...prev, name: text }))
              }
            />
            <TextInput
              label="Apellidos"
              className="bg-background w-full"
              autoCapitalize="words"
              textColor={Colors.color}
              underlineColor={Colors.color}
              activeUnderlineColor={Colors.button}
              inputMode="text"
              value={contactInfo.lastName}
              onChangeText={(text) =>
                setContactInfo((prev) => ({ ...prev, lastName: text }))
              }
            />
            <TextInput
              label="Cédula o documento de identidad"
              className="bg-background w-full"
              textColor={Colors.color}
              underlineColor={Colors.color}
              activeUnderlineColor={Colors.button}
              inputMode="numeric"
              value={contactInfo.id}
              onChangeText={(text) =>
                setContactInfo((prev) => ({ ...prev, id: text }))
              }
            />
            <TextInput
              label="Cargo (ej. gerente)"
              className="bg-background w-full"
              autoCapitalize="words"
              textColor={Colors.color}
              underlineColor={Colors.color}
              activeUnderlineColor={Colors.button}
              inputMode="text"
              value={contactInfo.position}
              onChangeText={(text) =>
                setContactInfo((prev) => ({ ...prev, position: text }))
              }
            />
            <TextInput
              label="Teléfono de contacto"
              className="bg-background w-full"
              autoCapitalize="words"
              textColor={Colors.color}
              underlineColor={Colors.color}
              activeUnderlineColor={Colors.button}
              inputMode="numeric"
              value={contactInfo.cellphone}
              onChangeText={(text) =>
                setContactInfo((prev) => ({ ...prev, cellphone: text }))
              }
            />
            <TextInput
              label="Correo electrónico personal / laboral"
              className="bg-background w-full"
              autoCapitalize="words"
              textColor={Colors.color}
              underlineColor={Colors.color}
              activeUnderlineColor={Colors.button}
              inputMode="email"
              value={contactInfo.email}
              onChangeText={(text) =>
                setContactInfo((prev) => ({ ...prev, email: text }))
              }
            />
          </View>
          <Pressable onPress={() => router.push('/(slot)/(tabs)/donations/success')} className="bg-button p-4 rounded-xl active:bg-button/60">
            <Text className="text-xl text-white font-semibold text-center">
              Enviar datos
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default contact;

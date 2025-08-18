import { EstablishmentType } from "@/core/database/interfaces/selections";

export const establishmentTypes: EstablishmentType[] = [
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

export const foodTypes: EstablishmentType[] = [
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

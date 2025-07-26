import { Pack } from "@/infraestructure/interfaces/PackInterface";

export const getPacks = (key: string | string[]): Pack[] => {
  switch (key) {
    case "today":
      return todayPacks;
    case "missed":
      return missedPacks;
    case "favorite":
      return favoritePacks;
    case "popular":
      return popularPacks;
    case "nearBy":
      return nearByPacks;
    default:
      throw new Error("No existe el key buscado");
  }
};

const todayPacks: Pack[] = [
  {
    title: "Menestras del Negro",
    price: 3.75,
    distance: 1.8,
    rate: 3.9,
    pickUp: "7:00PM - 8:00PM",
    packsLeft: 0,
    logo: require("@/assets/images/packs/logo-general.png"),
    background: require("@/assets/images/packs/background-general.png"),
  },
  {
    title: "El Español",
    price: 4.25,
    distance: 2.1,
    rate: 4.3,
    pickUp: "6:30PM - 7:30PM",
    packsLeft: 4,
    logo: require("@/assets/images/packs/logo-general.png"),
    background: require("@/assets/images/packs/background-general.png"),
  },
  {
    title: "Los Cebiches de la Rumiñahui",
    price: 5.0,
    distance: 3.5,
    rate: 4.7,
    pickUp: "12:00PM - 1:30PM",
    packsLeft: 1,
    logo: require("@/assets/images/packs/logo-general.png"),
    background: require("@/assets/images/packs/background-general.png"),
  },
  {
    title: "La Choza",
    price: 6.5,
    distance: 1.2,
    rate: 4.8,
    pickUp: "1:00PM - 2:00PM",
    packsLeft: 3,
    logo: require("@/assets/images/packs/logo-general.png"),
    background: require("@/assets/images/packs/background-general.png"),
  },
  {
    title: "Don Ceviche",
    price: 4.75,
    distance: 2.7,
    rate: 4.2,
    pickUp: "7:30PM - 8:30PM",
    packsLeft: 5,
    logo: require("@/assets/images/packs/logo-general.png"),
    background: require("@/assets/images/packs/background-general.png"),
  },
];

const missedPacks: Pack[] = [
  {
    title: "Casa Manaba",
    price: 3.95,
    distance: 2.0,
    rate: 4.0,
    pickUp: "6:00PM - 7:00PM",
    packsLeft: 0,
    logo: require("@/assets/images/packs/logo-general.png"),
    background: require("@/assets/images/packs/background-general.png"),
  },
  {
    title: "Picantería La Rumi",
    price: 3.5,
    distance: 1.5,
    rate: 3.8,
    pickUp: "12:00PM - 2:00PM",
    packsLeft: 0,
    logo: require("@/assets/images/packs/logo-general.png"),
    background: require("@/assets/images/packs/background-general.png"),
  },
  {
    title: "Sazón Quiteña",
    price: 4.1,
    distance: 0.9,
    rate: 4.1,
    pickUp: "1:00PM - 2:30PM",
    packsLeft: 0,
    logo: require("@/assets/images/packs/logo-general.png"),
    background: require("@/assets/images/packs/background-general.png"),
  },
  {
    title: "Asadero El Gran Pollo",
    price: 3.25,
    distance: 1.6,
    rate: 3.7,
    pickUp: "7:00PM - 8:00PM",
    packsLeft: 0,
    logo: require("@/assets/images/packs/logo-general.png"),
    background: require("@/assets/images/packs/background-general.png"),
  },
  {
    title: "Ñaño Miguel",
    price: 2.95,
    distance: 1.3,
    rate: 3.6,
    pickUp: "5:30PM - 6:30PM",
    packsLeft: 0,
    logo: require("@/assets/images/packs/logo-general.png"),
    background: require("@/assets/images/packs/background-general.png"),
  },
];

const favoritePacks: Pack[] = [
  {
    title: "Cevichochos La 10",
    price: 2.5,
    distance: 1.0,
    rate: 3.9,
    pickUp: "11:00AM - 12:00PM",
    packsLeft: 1,
    logo: require("@/assets/images/packs/logo-general.png"),
    background: require("@/assets/images/packs/background-general.png"),
  },
  {
    title: "Pollos Gus",
    price: 3.9,
    distance: 2.2,
    rate: 4.2,
    pickUp: "6:30PM - 7:30PM",
    packsLeft: 4,
    logo: require("@/assets/images/packs/logo-general.png"),
    background: require("@/assets/images/packs/background-general.png"),
  },
  {
    title: "Yahuarlocro de Doña Ceci",
    price: 4.0,
    distance: 3.0,
    rate: 4.5,
    pickUp: "12:00PM - 1:00PM",
    packsLeft: 2,
    logo: require("@/assets/images/packs/logo-general.png"),
    background: require("@/assets/images/packs/background-general.png"),
  },
  {
    title: "El Fogón Quiteño",
    price: 5.0,
    distance: 1.4,
    rate: 4.6,
    pickUp: "2:00PM - 3:00PM",
    packsLeft: 1,
    logo: require("@/assets/images/packs/logo-general.png"),
    background: require("@/assets/images/packs/background-general.png"),
  },
  {
    title: "Comedor Las Delicias",
    price: 3.2,
    distance: 1.1,
    rate: 3.8,
    pickUp: "7:00PM - 8:00PM",
    packsLeft: 5,
    logo: require("@/assets/images/packs/logo-general.png"),
    background: require("@/assets/images/packs/background-general.png"),
  },
];

const popularPacks: Pack[] = [
  {
    title: "Chifa Chung Hua",
    price: 4.75,
    distance: 2.4,
    rate: 4.4,
    pickUp: "6:00PM - 7:30PM",
    packsLeft: 2,
    logo: require("@/assets/images/packs/logo-general.png"),
    background: require("@/assets/images/packs/background-general.png"),
  },
  {
    title: "Arepas y Más",
    price: 3.9,
    distance: 0.7,
    rate: 4.1,
    pickUp: "4:30PM - 5:30PM",
    packsLeft: 4,
    logo: require("@/assets/images/packs/logo-general.png"),
    background: require("@/assets/images/packs/background-general.png"),
  },
  {
    title: "Kiosco de la Esquina",
    price: 2.95,
    distance: 1.9,
    rate: 3.5,
    pickUp: "10:00AM - 11:00AM",
    packsLeft: 3,
    logo: require("@/assets/images/packs/logo-general.png"),
    background: require("@/assets/images/packs/background-general.png"),
  },
  {
    title: "El Caldero Manabita",
    price: 4.4,
    distance: 3.1,
    rate: 4.6,
    pickUp: "12:30PM - 1:30PM",
    packsLeft: 2,
    logo: require("@/assets/images/packs/logo-general.png"),
    background: require("@/assets/images/packs/background-general.png"),
  },
  {
    title: "Guatita Queen",
    price: 3.8,
    distance: 1.7,
    rate: 4.3,
    pickUp: "7:00AM - 8:00AM",
    packsLeft: 5,
    logo: require("@/assets/images/packs/logo-general.png"),
    background: require("@/assets/images/packs/background-general.png"),
  },
];

const nearByPacks: Pack[] = [
  {
    title: "La Fritada Express",
    price: 4.3,
    distance: 2.0,
    rate: 4.2,
    pickUp: "2:30PM - 3:30PM",
    packsLeft: 4,
    logo: require("@/assets/images/packs/logo-general.png"),
    background: require("@/assets/images/packs/background-general.png"),
  },
  {
    title: "Chifa El Dragón Dorado",
    price: 5.0,
    distance: 2.6,
    rate: 4.5,
    pickUp: "5:00PM - 6:00PM",
    packsLeft: 2,
    logo: require("@/assets/images/packs/logo-general.png"),
    background: require("@/assets/images/packs/background-general.png"),
  },
  {
    title: "Empanadas La Merced",
    price: 2.5,
    distance: 0.5,
    rate: 4.0,
    pickUp: "3:00PM - 4:00PM",
    packsLeft: 6,
    logo: require("@/assets/images/packs/logo-general.png"),
    background: require("@/assets/images/packs/background-general.png"),
  },
  {
    title: "Sanduchería Quito Viejo",
    price: 3.65,
    distance: 1.2,
    rate: 4.1,
    pickUp: "8:00PM - 9:00PM",
    packsLeft: 3,
    logo: require("@/assets/images/packs/logo-general.png"),
    background: require("@/assets/images/packs/background-general.png"),
  },
  {
    title: "Hamburguesas Don Juan",
    price: 4.1,
    distance: 1.8,
    rate: 4.3,
    pickUp: "6:00PM - 7:00PM",
    packsLeft: 4,
    logo: require("@/assets/images/packs/logo-general.png"),
    background: require("@/assets/images/packs/background-general.png"),
  },
];

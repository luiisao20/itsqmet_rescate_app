import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

interface Props {
  size?: number;
  color?: string;
  className?: string;
}

export const IconHome = ({ size = 24, color = "black", className }: Props) => (
  <Entypo name="home" size={size} color={color} className={className} />
);

export const IconPack = ({ size = 24, color = "black", className }: Props) => (
  <MaterialCommunityIcons name="package" size={size} color={color} className={className} />
);

export const IconEmpty = ({ size = 24, color = "black", className }: Props) => (
  <MaterialCommunityIcons name="cart-off" size={size} color={color} className={className} />
);

export const IconMap = ({ size = 24, color = "black", className }: Props) => (
  <MaterialCommunityIcons name="map-marker-right" size={size} color={color} className={className} />
);

export const IconTrash = ({ size = 24, color = "black", className }: Props) => (
  <MaterialCommunityIcons name="trash-can-outline" size={size} color={color} className={className} />
);

export const IconGive = ({ size = 24, color = "black", className }: Props) => (
  <FontAwesome5 name="hand-holding-heart" size={size} color={color} className={className} />
);

export const IconHands = ({ size = 24, color = "black", className }: Props) => (
  <FontAwesome5 name="handshake" size={size} color={color} className={className} />
);

export const IconMapPin = ({ size = 24, color = "black", className }: Props) => (
  <FontAwesome5 name="map-pin" size={size} color={color} className={className} />
);

export const IconCard = ({ size = 24, color = "black", className }: Props) => (
  <FontAwesome5 name="credit-card" size={size} color={color} className={className} />
);

export const IconProfile = ({ size = 24, color = "black", className }: Props) => (
  <Ionicons name="person" size={size} color={color} className={className} />
);

export const IconBag = ({ size = 24, color = "black", className }: Props) => (
  <Ionicons name="bag-outline" size={size} color={color} className={className} />
);

export const IconCash = ({ size = 24, color = "black", className }: Props) => (
  <Ionicons name="cash-sharp" size={size} color={color} className={className} />
);

export const IconGoBack = ({ size = 24, color = "black", className }: Props) => (
  <Ionicons name="arrow-back-circle" size={size} color={color} className={className} />
);

export const IconCompass = ({ size = 24, color = "black", className }: Props) => (
  <Ionicons name="compass-sharp" size={size} color={color} className={className} />
);

export const IconCar = ({ size = 24, color = "black", className }: Props) => (
  <Feather name="shopping-cart" size={size} color={color} className={className} />
);

export const IconGo = ({ size = 24, color = "black", className }: Props) => (
  <MaterialIcons name="arrow-forward-ios" size={size} color={color} className={className} />
);

export const IconAdd = ({ size = 24, color = "black", className }: Props) => (
  <MaterialIcons name="add-shopping-cart" size={size} color={color} className={className} />
);

export const IconWait = ({ size = 24, color = "black", className }: Props) => (
  <MaterialIcons name="chair" size={size} color={color} className={className} />
);

export const IconHouse = ({ size = 24, color = "black", className }: Props) => (
  <MaterialIcons name="food-bank" size={size} color={color} className={className} />
);

export const IconStore = ({ size = 24, color = "black", className }: Props) => (
  <MaterialCommunityIcons name="storefront" size={size} color={color} className={className} />
);

export const IconProfileHome = ({ size = 24, color = "black", className }: Props) => (
  <Ionicons name="person-circle-sharp" size={size} color={color} className={className} />
);

export const IconFastFood = ({ size = 24, color = "black", className }: Props) => (
  <Ionicons name="fast-food" size={size} color={color} className={className} />
);

export const IconClose = ({ size = 24, color = "black", className }: Props) => (
  <MaterialCommunityIcons name="window-close" size={size} color={color} className={className}  />
);

export const IconFast = ({ size = 24, color = "black", className }: Props) => (
  <MaterialCommunityIcons name="lightning-bolt" size={size} color={color} className={className}  />
);

export const IconPencil = ({ size = 24, color = "black", className }: Props) => (
  <Entypo name="pencil" size={size} color={color} className={className} />
);

export const IconStandard = ({ size = 24, color = "black", className }: Props) => (
  <Entypo name="stopwatch" size={size} color={color} className={className} />
);

export const IconInfo = ({ size = 24, color = "black", className }: Props) => (
  <FontAwesome5 name="info-circle" size={size} color={color} className={className} />
);

export const IconSecurity = ({ size = 24, color = "black", className }: Props) => (
  <MaterialCommunityIcons name="security" size={size} color={color} className={className} />
);

export const IconPlus = ({ size = 24, color = "black", className }: Props) => (
  <AntDesign name="plus" size={size} color={color} className={className} />
);

export const IconGoBackLine = ({ size = 24, color = "black", className }: Props) => (
  <AntDesign name="arrowleft" size={size} color={color} className={className} />
);


export const IconMinus = ({ size = 24, color = "black", className }: Props) => (
  <AntDesign name="minus" size={size} color={color} className={className} />
);

export const IconSelect = ({ size = 24, color = "black", className }: Props) => (
  <AntDesign name="checkcircle" size={size} color={color} className={className} />
);

export const IconStar = ({ size = 24, color = "black", className }: Props) => (
  <AntDesign name="star" size={size} color={color} className={className} />
);

export const IconHeartFilled = ({ size = 24, color = "black", className }: Props) => (
  <AntDesign name="heart" size={size} color={color} className={className} />
);

export const IconHeartOut = ({ size = 24, color = "black", className }: Props) => (
  <AntDesign name="hearto" size={size} color={color} className={className} />
);

export const IconLike = ({ size = 24, color = "black", className }: Props) => (
  <MaterialCommunityIcons name="cart-check" size={size} color={color} className={className} />
);
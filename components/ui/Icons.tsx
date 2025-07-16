import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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

export const IconGive = ({ size = 24, color = "black", className }: Props) => (
  <FontAwesome5 name="hand-holding-heart" size={size} color={color} className={className} />
);

export const IconProfile = ({ size = 24, color = "black", className }: Props) => (
  <Ionicons name="person" size={size} color={color} className={className} />
);

export const IconCar = ({ size = 24, color = "black", className }: Props) => (
  <Feather name="shopping-cart" size={size} color={color} className={className} />
);

export const IconGo = ({ size = 24, color = "black", className }: Props) => (
  <MaterialIcons name="arrow-forward-ios" size={size} color={color} className={className} />
);

export const IconStore = ({ size = 24, color = "black", className }: Props) => (
  <MaterialCommunityIcons name="storefront" size={size} color={color} className={className} />
);
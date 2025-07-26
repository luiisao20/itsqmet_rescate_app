import {ImageSourcePropType} from "react-native";

export interface Pack {
  title: string;
  price: number;
  distance: number;
  rate: number;
  pickUp: string;
  packsLeft: number;
  logo: ImageSourcePropType;
  background: ImageSourcePropType;
  quantity?: number;
}

export interface PackView {
  key: string;
  title?: string
  subtitle?: string;
}
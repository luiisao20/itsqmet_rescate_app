import { View } from "react-native";
import { useEffect, useLayoutEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Colors } from "@/constants/Colors";
import { FlatList } from "react-native-gesture-handler";
import PackCard from "@/components/PackCard";
import { PackageDB } from "@/infraestructure/database/tables";
import { useFavStore, usePacksStore } from "@/components/store/usePacksStore";

const IndexPacks = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const { packs } = usePacksStore();

  const title = (id: string | string[]): string => {
    switch (id) {
      case "today":
        return "Hoy";
      case "missed":
        return "No disponibles";
      case "favorite":
        return "Tus favoritos";
      case "popular":
        return "Populares";
      case "nearBy":
        return "Cerca de tu ubicación";
      default:
        return "Packs";
    }
  };
  const [ownPacks, setOwnPacks] = useState<PackageDB[]>();
  const {favorites} = useFavStore();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title(id),
      headerTitleStyle: {
        color: Colors.color,
      },
    });
  }, [navigation, id]);

  useEffect(() => {
    if (id === 'favorite') setOwnPacks(favorites)
    else setOwnPacks(packs[id as string]);
  }, []);

  useEffect(() => {
    setOwnPacks(favorites)
  }, [favorites])

  return (
    <View className="bg-white">
      <FlatList
        className="px-6 my-4"
        data={ownPacks}
        renderItem={({ item }) => <PackCard info={item} className="my-2" />}
      />
    </View>
  );
};

export default IndexPacks;

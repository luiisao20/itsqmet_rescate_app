import { View } from "react-native";
import { useEffect, useLayoutEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Colors } from "@/constants/Colors";
import { getPacks } from "@/hooks/getPacks";
import { Pack } from "@/infraestructure/interfaces/PackInterface";
import { FlatList } from "react-native-gesture-handler";
import PackCard from "@/components/PackCard";

const IndexPacks = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

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
  const [packs, setPacks] = useState<Pack[]>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title(id),
      headerTitleStyle: {
        color: Colors.color,
      },
    });
  }, [navigation, id]);

  useEffect(() => {
    setPacks(getPacks(id));
  }, []);

  return (
    <View className="bg-white">
      <FlatList
        className="px-6 my-4"
        data={packs}
        renderItem={({ item }) => (
          <PackCard
            info={item}
            className="my-2"
          />
        )}
      />
    </View>
  );
};

export default IndexPacks;

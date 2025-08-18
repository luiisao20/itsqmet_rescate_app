import { useLayoutEffect } from "react";
import { View } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { FlatList } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";

import { Colors } from "@/constants/Colors";
import PackCard from "@/components/PackCard";
import { usePackages } from "@/presentation/packages/usePackages";
import { useCategory } from "@/presentation/categories/useCategories";
import { useFavoritePackage } from "@/presentation/packages/useFavoritePackages";

const IndexPacks = () => {
  const { id } = useLocalSearchParams();
  const idCategory = parseInt(`${id}`);
  const { categoryQuery } = useCategory(idCategory);
  const { packagesQuery } = usePackages({ idCategory: idCategory, limit: 10 });
  const { favoritePackagesQuery } = useFavoritePackage({});
  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (categoryQuery.data) {
      navigation.setOptions({
        title: categoryQuery.data.title,
        headerTitleStyle: {
          color: Colors.color,
        },
      });
    }
  }, [categoryQuery.data]);

  if (
    categoryQuery.isPending ||
    packagesQuery.isPending ||
    favoritePackagesQuery.isPending
  ) {
    return <ActivityIndicator size={30} className="my-10" />;
  }

  return (
    <View className="bg-white">
      <FlatList
        className="px-6 my-4"
        data={packagesQuery.data}
        renderItem={({ item }) => {
          const isFavorite = favoritePackagesQuery.data?.some(
            (fav) => fav.id === item.id
          );
          return (
            <PackCard info={item} className="my-2" isFavorite={isFavorite} />
          );
        }}
      />
    </View>
  );
};

export default IndexPacks;

import { useLayoutEffect } from "react";
import { View } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { FlatList } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";

import { Colors } from "@/constants/Colors";
import PackCard from "@/components/PackCard";
import { usePackages } from "@/presentation/packages/usePackages";
import { useCategory } from "@/presentation/categories/useCategories";

const IndexPacks = () => {
  const { id } = useLocalSearchParams();
  const idCategory = parseInt(`${id}`);
  const { categoryQuery } = useCategory(idCategory);
  const { packagesQuery } = usePackages({ idCategory: idCategory, limit: 10 });
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

  if (categoryQuery.isPending || packagesQuery.isLoading) {
    return <ActivityIndicator size={30} className="my-10" />;
  }

  return (
    <View className="bg-white">
      <FlatList
        className="px-6 my-4"
        data={packagesQuery.data}
        renderItem={({ item }) => <PackCard info={item} className="my-2" />}
      />
    </View>
  );
};

export default IndexPacks;

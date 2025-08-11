import { useCallback } from "react";
import { FlatList, ListRenderItem, Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { RefreshControl } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";

import HomeCards from "@/components/HomeCards";
import PackCard from "@/components/PackCard";
import { IconGo } from "@/components/ui/Icons";
import { Colors } from "@/constants/Colors";
import { usePackages } from "@/presentation/packages/usePackages";
import { Package } from "@/core/database/interfaces/packages";

export default function HomeTab() {
  const { packagesQuery } = usePackages({ idCategory: 5 });

  const HeaderComponent = () => (
    <>
      <Image
        style={{
          resizeMode: "contain",
          width: "100%",
          height: 240,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
        source={require("@/assets/images/portada.jpg")}
        contentFit="cover"
        priority="high"
        cachePolicy="memory-disk"
      />
      <View className="px-6 my-4">
        <Text className="text-5xl font-extrabold text-color">Rescate App</Text>
        <Pressable className="py-4 rounded-xl px-4 flex flex-row justify-between items-center active:bg-button/60">
          <Text className="text-xl font-medium text-color">
            Productos recomendados
          </Text>
          <IconGo color="#2F5744" size={20} />
        </Pressable>
        <View className="flex flex-row gap-2 justify-center">
          <HomeCards icon="gift" title="Donaciones" />
          <HomeCards icon="store" title="Restaurantes aliados" />
        </View>
        <Text className="text-xl font-medium text-color mt-4">
          Packs del día
        </Text>
      </View>
    </>
  );

  const renderItem: ListRenderItem<Package> = useCallback(
    ({ item }) => (
      <View className="px-6 mb-4">
        <PackCard info={item} />
      </View>
    ),
    []
  );

  return (
    <>
      {packagesQuery.isLoading ? (
        <ActivityIndicator size={60} color={Colors.color} />
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={packagesQuery.isFetching}
              onRefresh={async () => await packagesQuery.refetch()}
            />
          }
          data={packagesQuery.data}
          keyExtractor={(_, index) => index.toString()}
          ListHeaderComponent={<HeaderComponent />}
          renderItem={renderItem}
          removeClippedSubviews={true}
          maxToRenderPerBatch={5}
          updateCellsBatchingPeriod={100}
          initialNumToRender={5}
          windowSize={10}
          getItemLayout={(_, index) => ({
            length: 300,
            offset: 300 * index,
            index,
          })}
          showsVerticalScrollIndicator={false}
        />
      )}
    </>
  );
}

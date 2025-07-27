import { useCallback } from "react";
import { FlatList, ListRenderItem, Pressable, Text, View } from "react-native";
import { Image } from "expo-image";

import { Pack } from "@/infraestructure/interfaces/PackInterface";

import HomeCards from "@/components/HomeCards";
import PackCard from "@/components/PackCard";
import { IconGo } from "@/components/ui/Icons";

export default function HomeTab() {

  const packs: Pack[] = [
    {
      title: "Kentucky Fried Chicken",
      price: 8.99,
      distance: 1,
      rate: 4.8,
      pickUp: "12:00PM - 1:00PM",
      packsLeft: 3,
      logo: require("@/assets/images/packs/logo-kfc.png"),
      background: require("@/assets/images/packs/background-kfc.png"),
    },
    {
      title: "La Casa de la Humita",
      price: 3.5,
      distance: 0.8,
      rate: 4.6,
      pickUp: "10:30AM - 11:30AM",
      packsLeft: 5,
      logo: require("@/assets/images/packs/logo-humitas.png"),
      background: require("@/assets/images/packs/background-humitas.png"),
    },
    {
      title: "El Español Tapas y Vinos",
      price: 12.99,
      distance: 2.3,
      rate: 4.7,
      pickUp: "6:00PM - 7:00PM",
      packsLeft: 2,
      logo: require("@/assets/images/packs/logo-espanol.png"),
      background: require("@/assets/images/packs/background-espanol.png"),
    },
    {
      title: "Sánduches El Corral",
      price: 6.25,
      distance: 1.1,
      rate: 4.4,
      pickUp: "1:00PM - 2:00PM",
      packsLeft: 4,
      logo: require("@/assets/images/packs/logo-corral.png"),
      background: require("@/assets/images/packs/background-corral.png"),
    },
    {
      title: "Crepes & Waffles",
      price: 9.75,
      distance: 2.0,
      rate: 4.9,
      pickUp: "12:00PM - 1:00PM",
      packsLeft: 6,
      logo: require("@/assets/images/packs/logo-crepes.png"),
      background: require("@/assets/images/packs/background-crepes.png"),
    },
    {
      title: "Menestras del negro",
      price: 3.75,
      distance: 1.8,
      rate: 3.9,
      pickUp: "7:00PM - 8:00PM",
      packsLeft: 2,
      logo: require("@/assets/images/packs/logo-menestras.png"),
      background: require("@/assets/images/packs/background-menestras.png"),
    },
  ];

  // useEffect(() => {
  //   const imagesToPreload: string[] = [];

  //   packs.forEach((pack) => {
  //     // Solo agregar si es un objeto con uri (imágenes remotas)
  //     if (typeof pack.background === "object" && "uri" in pack.background) {
  //       imagesToPreload.push(pack.background.uri);
  //     }
  //     if (typeof pack.logo === "object" && "uri" in pack.logo) {
  //       imagesToPreload.push(pack.logo.uri);
  //     }
  //   });

  //   // Preload solo imágenes remotas (con URI)
  //   imagesToPreload.forEach((imageUri) => {
  //     Image.prefetch(imageUri);
  //   });
  // }, [packs]);

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

  const renderItem: ListRenderItem<Pack> = useCallback(
    ({ item }) => (
      <View className="px-6 mb-4">
        <PackCard
          info={item}
        />
      </View>
    ),
    []
  );

  return (
    <>
      <FlatList
        data={packs}
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
    </>
  );
}

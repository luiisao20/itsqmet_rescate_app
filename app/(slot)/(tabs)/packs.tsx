import { FlatList, Pressable, Text, View } from "react-native";
import { PackView } from "@/infraestructure/interfaces/PackInterface";
import Carousel from "@/components/PacksCarousel";
import { IconGo } from "@/components/ui/Icons";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

const PacksTab = () => {

  const packViews: PackView[] = [
    {
      key: "today",
      subtitle: "Los paquetes de hoy",
    },
    {
      key: "missed",
      subtitle: "Paquetes ya agotados",
    },
    {
      key: "favorite",
      subtitle: "Tus paquetes favoritos",
    },
    {
      key: "popular",
      subtitle: "Los más populares",
    },
    {
      key: "nearBy",
      subtitle: "Cercanos a ti",
    },
  ];

  return (
    <View>
      <FlatList
        data={packViews}
        renderItem={({ item }) => (
          <View className="px-6 my-4">
            <View className="flex flex-row gap-4 items-center justify-between mb-4">
              <Text className="text-lg font-semibold text-wrap w-3/4">
                {item.subtitle}
              </Text>
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "/(slot)/(packs)/[id]",
                    params: { id: item.key },
                  })
                }
                className="flex flex-row items-baseline gap-2"
              >
                <Text className="text-color text-base font-semibold">
                  Entrar
                </Text>
                <IconGo size={10} color={Colors.color} />
              </Pressable>
            </View>
            <Carousel keyPack={item.key} />
          </View>
        )}
      />
    </View>
  );
};

export default PacksTab;

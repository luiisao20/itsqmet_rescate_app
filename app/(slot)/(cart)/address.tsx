import { View, Text, Pressable } from "react-native";
import { LocationSaved } from "@/infraestructure/interfaces/locartionSaved";
import { getLocations } from "@/hooks/getLocations";
import { IconMap, IconSelect } from "@/components/ui/Icons";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

const AdressScreen = () => {
  const locations: LocationSaved[] = getLocations();

  return (
    <View className="py-4 px-6">
      <Text className="text-2xl text-center text-color font-semibold mb-4">
        Ubicaciones guardadas
      </Text>
      {locations.map((item, index) => (
        <View
          key={index}
          className="bg-background my-4 flex flex-row items-center justify-between p-4 rounded-xl"
        >
          <View>
            <Text className="text-xl font-semibold text-color">
              {item.alias}
            </Text>
            <Text className="font-light">{item.address}</Text>
          </View>
          <View className="flex gap-2 justify-center">
            <Pressable
              onPress={() =>
                router.push(`/(slot)/(cart)/position/${item.alias}`)
              }
              className="active:opacity-60"
            >
              <IconMap color={Colors.color} />
            </Pressable>
            <Pressable
              onPress={() => router.replace("/(slot)/(cart)/pay")}
              className="active:opacity-60"
            >
              <IconSelect color={Colors.color} />
            </Pressable>
          </View>
        </View>
      ))}
      <Pressable
        onPress={() => router.push("/(slot)/(cart)/position/new")}
        className="bg-button p-4 rounded-xl"
      >
        <Text className="text-white font-semibold text-lg text-center">
          Añadir nueva ubicación
        </Text>
      </Pressable>
    </View>
  );
};

export default AdressScreen;

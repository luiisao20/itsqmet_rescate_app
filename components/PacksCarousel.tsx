import { Text, View, useWindowDimensions } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { Colors } from "@/constants/Colors";
import PackCard from "./PackCard";
import { useFavStore, usePacksStore } from "./store/usePacksStore";
import { PackageDB } from "@/infraestructure/database/tables";
import { ActivityIndicator } from "react-native-paper";

interface Props {
  keyPack: string;
}

const PacksCarousel = ({ keyPack }: Props) => {
  const progress = useSharedValue<number>(0);
  const ref = useRef<ICarouselInstance | null>(null);
  const width: number = useWindowDimensions().width * 0.9;

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const { fetchPacks, isLoading } = usePacksStore();
  const { favorites } = useFavStore();
  const [specPacks, setPacks] = useState<PackageDB[]>([]);

  useEffect(() => {
    if (keyPack === "favorite") {
      setPacks(favorites);
      return;
    }
    fetchPacks(keyPack, 5, "rate").then(() => {
      const updated = usePacksStore.getState().packs[keyPack];
      if (updated) {
        setPacks(updated);
      }
    });
  }, []);

  useEffect(() => {
    if (keyPack === "favorite") {
      setPacks(favorites);
      return;
    }
  }, [favorites]);

  if (isLoading) {
    return <ActivityIndicator size={30} color={Colors.color} />;
  }

  if (keyPack === "favorite" && favorites.length === 0) {
    return (
      <Text className="text-xl font-semibold text-center">
        No existen paquetes favoritos, ¡Añade uno!
      </Text>
    );
  }

  return (
    <>
      <View id="carousel-component" style={{ gap: 1 }}>
        <View>
          <Carousel
            ref={ref}
            loop
            onProgressChange={progress}
            width={width}
            height={300}
            data={specPacks}
            renderItem={({ item }) => <PackCard className="mx-2" info={item} />}
          />
        </View>
        <Pagination.Basic
          progress={progress}
          data={specPacks}
          dotStyle={{
            width: 16,
            height: 4,
            backgroundColor: Colors.button,
            borderRadius: 10,
          }}
          activeDotStyle={{
            overflow: "hidden",
            backgroundColor: Colors.icons,
          }}
          containerStyle={{
            gap: 4,
            marginBottom: 2,
          }}
          horizontal
          onPress={onPressPagination}
        />
      </View>
    </>
  );
};

export default PacksCarousel;

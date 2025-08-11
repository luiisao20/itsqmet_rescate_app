import { useRef } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

import { Colors } from "@/constants/Colors";
import { Category } from "@/core/database/interfaces/categories";
import { usePackages } from "@/presentation/packages/usePackages";
import { useFavStore } from "../presentation/packages/store/usePacksStore";
import PackCard from "./PackCard";

interface Props {
  category: Category;
}

const PacksCarousel = ({ category }: Props) => {
  const progress = useSharedValue<number>(0);
  const ref = useRef<ICarouselInstance | null>(null);
  const width: number = useWindowDimensions().width * 0.9;

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };
  const { packagesQuery } = usePackages({ idCategory: category.id });

  const { favorites } = useFavStore();

  if (packagesQuery.isLoading) {
    return <ActivityIndicator size={30} color={Colors.color} />;
  }

  if (category.title === "favorite" && favorites.length === 0) {
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
            data={packagesQuery.data!}
            renderItem={({ item }) => <PackCard className="mx-2" info={item} />}
          />
        </View>
        <Pagination.Basic
          progress={progress}
          data={packagesQuery.data!}
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

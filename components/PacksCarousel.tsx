import { View, useWindowDimensions } from "react-native";
import { useRef } from "react";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { Colors } from "@/constants/Colors";
import { Pack } from "@/infraestructure/interfaces/PackInterface";
import PackCard from "./PackCard";
import { getPacks } from "@/hooks/getPacks";

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

  const packs: Pack[] = getPacks(keyPack);

  return (
    <View id="carousel-component" style={{ gap: 1 }}>
      <View>
        <Carousel
          ref={ref}
          loop
          onProgressChange={progress}
          width={width}
          height={280}
          data={packs}
          renderItem={({ item }) => <PackCard className="mx-2" info={item} />}
        />
      </View>
      <Pagination.Basic
        progress={progress}
        data={packs}
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
  );
};

export default PacksCarousel;

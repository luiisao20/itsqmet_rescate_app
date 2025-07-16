import { Text, Pressable, PressableProps } from "react-native";
import { IconGive, IconStore } from "./ui/Icons";

interface Props extends PressableProps {
  title: String;
  icon: "store" | "gift";
}

const HomeCards = ({ title, icon, ...rest }: Props) => {
  return (
    <Pressable
      {...rest}
      className="bg-button/50 rounded-xl p-4 w-1/2 flex flex-col items-center justify-center active:bg-button"
    >
      {icon === "store" ? (
        <IconStore size={80} color="white" />
      ) : (
        icon === "gift" && <IconGive size={80} color="white" />
      )}
      <Text className="text-color text-xl text-wrap text-center mt-4">
        {title}
      </Text>
    </Pressable>
  );
};

export default HomeCards;

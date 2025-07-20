import { Text, Pressable, PressableProps } from "react-native";
import { IconGive, IconInfo, IconSecurity, IconStore } from "./ui/Icons";

interface Props extends PressableProps {
  title: String;
  icon: "store" | "gift" | "info" | 'security';
}

const HomeCards = ({ title, icon, ...rest }: Props) => {
  
  const renderIcon = () => {
    switch (icon) {
      case "store":
        return <IconStore size={80} color="white" />;
      case "gift":
        return <IconGive size={80} color="white" />;
      case "info":
        return <IconInfo size={80} color="white" />;
      case 'security':
        return <IconSecurity size={80} color="white" />
    }
  };

  return (
    <Pressable
      {...rest}
      className="bg-button/50 rounded-xl p-4 w-[150] flex flex-col items-center justify-center active:bg-button"
    >
      {renderIcon()}
      <Text className="text-color text-xl text-wrap text-center mt-4">
        {title}
      </Text>
    </Pressable>
  );
};

export default HomeCards;

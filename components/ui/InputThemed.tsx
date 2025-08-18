import { View } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";
import { Colors } from "@/constants/Colors";

interface Props extends TextInputProps {
  value?: string;

  updateText: (text: string) => void;
}

const InputThemed = ({
  label,
  autoCapitalize = "words",
  inputMode = "text",
  value,

  updateText,
  ...rest
}: Props) => {
  return (
    <View>
      <TextInput
        {...rest}
        className="bg-white w-full"
        label={label}
        autoCapitalize={autoCapitalize}
        mode="flat"
        inputMode={inputMode}
        textColor={Colors.color}
        underlineColor={Colors.color}
        activeUnderlineColor={Colors.button}
        value={value}
        onChangeText={(text) => updateText(text)}
      />
    </View>
  );
};

export default InputThemed;

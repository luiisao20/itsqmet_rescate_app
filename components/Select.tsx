import { Text, View } from "react-native";
import { useState } from "react";
import { Picker, PickerProps } from "@react-native-picker/picker";
import { Colors } from "@/constants/Colors";
import { EstablishmentType } from "@/infraestructure/interfaces/selections";
import { TextInput } from "react-native-paper";

interface Props extends PickerProps {
  elements: EstablishmentType[];
  title: string;
  type: string;

  onSelected: (item: string) => void;
  onOtherValue: (value: string) => void;
}

const Select = ({
  title,
  elements,
  type,

  onSelected,
  onOtherValue,
  ...rest
}: Props) => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [showInput, setShowInput] = useState<boolean>(false);

  return (
    <View className="my-4 bg-white rounded-xl p-2">
      <Text className="">{title}</Text>
      <Picker
        {...rest}
        selectedValue={selectedLanguage}
        onValueChange={(itemValue: string | any) => {
          if (itemValue === "1") {
            setShowInput(true);

            return;
          }
          setShowInput(false);
          setSelectedLanguage(itemValue);
          onSelected(itemValue);
        }}
        style={{
          color: Colors.color,
        }}
      >
        {elements.map((item, index) => (
          <Picker.Item label={item.label} value={item.value} key={index} />
        ))}
      </Picker>
      {showInput && (
        <TextInput
          label={type}
          className="bg-white w-full"
          autoCapitalize="words"
          textColor={Colors.color}
          underlineColor={Colors.color}
          activeUnderlineColor={Colors.button}
          inputMode="text"
          onChangeText={(text) => onOtherValue(text)}
        />
      )}
    </View>
  );
};

export default Select;

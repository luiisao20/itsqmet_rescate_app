import { FormikTouched } from "formik";
import { Text } from "react-native";

interface Props {
  name: string;
  errors: any;
  touched: FormikTouched<any>;
}

export const CustomErrorMessage = ({ name, errors, touched }: Props) => {
  const error = errors[name];
  const isTouched = touched[name];

  if (!error || !isTouched) return null;

  return <Text className="text-danger text-sm my-1 ml-2">{error}</Text>;
};

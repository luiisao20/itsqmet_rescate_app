import { Redirect } from "expo-router";
import { useAuthStore } from "@/components/store/useAuth";
import {ActivityIndicator} from "react-native-paper";

const IndexScreen = () => {
  const { user, isLoading } = useAuthStore();

  if (isLoading) return <ActivityIndicator size={60} />

  return user ? <Redirect href={'/(slot)/(tabs)'} /> : <Redirect href={"/login"} />;
  // return <Redirect href={'/admin'} />
};

export default IndexScreen;

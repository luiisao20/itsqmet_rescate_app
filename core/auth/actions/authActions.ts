import { SecureStorageAdapter } from "@/helpers/secure-storage.adapter";
import { supabase } from "@/supabase";
import { Alert } from "react-native";
import { Session, User } from "@supabase/supabase-js";

export const authLogin = async (
  email: string,
  password: string
): Promise<{ user: User; session: Session } | null> => {
  email = email.toLowerCase();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  const session: Session | null = data.session;
  const user: User | null = data.user;

  if (error || !session || !user) {
    Alert.alert("Error", error ? error.message : "Unknown error");
    return null;
  }
  return { session, user };
};

export const authCheckSession = async () => {
  const storedToken = await SecureStorageAdapter.getItem("token");

  if (!storedToken) {
    console.log("No existe token");
    return null;
  }

  const { data, error } = await supabase.auth.refreshSession({
    refresh_token: storedToken,
  });

  if (error) {
    console.log(error);
    await SecureStorageAdapter.deleteItem("token");
    return null;
  }

  const { session } = data;

  return session;
};

export const registerUser = async (
  email: string,
  password: string,
  name: string,
  lastName: string
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  const user: User | null = data.user;

  if (error || !user) {
    Alert.alert("Error", error?.message!);
    return false;
  }

  const { error: errorDatabase } = await supabase.from("customers").insert({
    email: email,
    name: name,
    last_name: lastName,
    user_id: user.id,
  });

  if (errorDatabase) {
    Alert.alert("Error", errorDatabase?.message);
    return false;
  }
  return true;
};

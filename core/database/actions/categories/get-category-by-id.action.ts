import { supabase } from "@/supabase";
import { Category } from "../../interfaces/categories";

export const getCategryById = async (idCategory: number): Promise<Category> => {
  const { data, error } = await supabase
    .from("categories")
    .select()
    .eq("id", idCategory)
    .single();

  if (error) {
    console.log(error);
    throw error;
  }

  return data;
};

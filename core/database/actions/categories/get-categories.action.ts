import {supabase} from "@/supabase"
import {Category} from "../../interfaces/categories";

export const getCategories = async ():Promise<Category[]> => {
  const {data, error} = await supabase
    .from('categories')
    .select()
  if (error) {
    console.log(error);
    throw error
  }
  return data || [];
}
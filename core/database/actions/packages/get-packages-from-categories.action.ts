import { supabase } from "@/supabase";
import { Package } from "../../interfaces/packages";

export const getPackagesFromCategories = async (
  idCategory: number,
  limit: number
): Promise<Package[]> => {
  const { data, error } = await supabase
    .rpc("get_packages_by_category", {
      category_id: idCategory,
    })
    .limit(limit);

  if (error) {
    console.log(error);
    throw error;
  }

  return data || [];
};

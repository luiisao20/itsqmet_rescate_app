import { supabase } from "@/supabase";

export const insertFavoritePackage = async (
  idCustomer: number,
  idPackage: number
) => {
  const { error } = await supabase.from("customer_has_favorites").insert({
    id_customer: idCustomer,
    id_package: idPackage,
  });

  if (error) {
    console.log(error);
    throw error;
  }
  return true;
};

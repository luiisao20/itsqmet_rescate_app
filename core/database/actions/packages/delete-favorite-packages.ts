import { supabase } from "@/supabase";

export const deleteFavoritePackage = async (
  idPackage: number,
  idCustomer: number
) => {
  const { error } = await supabase
    .from("customer_has_favorites")
    .delete()
    .match({ id_customer: idCustomer, id_package: idPackage });

  if (error) {
    console.log(error);
    throw error;
  }

  return true;
};

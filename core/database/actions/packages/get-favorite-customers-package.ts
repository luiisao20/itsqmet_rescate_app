import { supabase } from "@/supabase";
import { Package } from "../../interfaces/packages";

export const getFavoriteCustomerPackages = async (
  idCustomer: number,
  limit: number
): Promise<Package[]> => {
  const { data, error } = await supabase
    .rpc("get_favorite_packages_by_customer", {
      customer_id: idCustomer,
    })
    .limit(limit);

  if (error) {
    console.log(error);
    throw error;
  }

  return data || [];
};

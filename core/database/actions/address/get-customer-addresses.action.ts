import { supabase } from "@/supabase";
import { AddressDB } from "../../interfaces/address";

export const getCustomerAddresses = async (
  idCustomer: number
): Promise<AddressDB[]> => {
  const { data, error } = await supabase
    .from("customer_has_addresses")
    .select(
      `
      address: addresses (
        id,
        alias,
        description,
        latitude,
        longitude
      )
    `
    )
    .eq("id_customer", idCustomer);

  if (error) {
    console.log(error);
    throw error;
  }
  const addresses: AddressDB[] = data.flatMap((item) => item.address);
  return addresses;
};

export const getCustomerAddress = async (idAddress?: number) => {
  if (idAddress) {
    const { data, error } = await supabase
      .from("addresses")
      .select()
      .eq("id", idAddress)
      .single();

    if (error) {
      console.log(error);
      throw error;
    }

    const address: AddressDB = data;
    return address;
  }
  throw new Error("No existe el documento");
};

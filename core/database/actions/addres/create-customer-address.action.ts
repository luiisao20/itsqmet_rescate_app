import { supabase } from "@/supabase";
import { AddressDB } from "../../interfaces/address";

export const createUpdateAddress = (address: Partial<AddressDB>, idCustomer: number) => {
  
  console.log({address, idCustomer});
  if (address.id && address.id !== 0) {
    console.log('here');
    
    return updateAddress(address)
  }

  return createAddress(address, idCustomer)

}

const createAddress = async (
  address: Partial<AddressDB>,
  idCustomer: number
) => {
  const { alias, description, latitude, longitude } = address;

  const { data, error: errorAddress } = await supabase
    .from("addresses")
    .insert({
      alias,
      description,
      latitude,
      longitude,
    })
    .select("id")
    .single();

  if (errorAddress) {
    console.log(errorAddress);
    throw errorAddress;
  }

  const { data: dataNew, error } = await supabase
    .from("customer_has_addresses")
    .insert({
      id_customer: idCustomer,
      id_address: data.id,
    });

  if (error) {
    console.log(error);
    throw error;
  }
  return dataNew;
};

export const deleteAddress = async (idAddress: number) => {
  const { error: errorRel } = await supabase
    .from("customer_has_addresses")
    .delete()
    .eq("id_address", idAddress);

  const { error } = await supabase
    .from("addresses")
    .delete()
    .eq("id", idAddress);

  if (error || errorRel) {
    console.log(error, errorRel);
    throw error ? error : errorRel;
  }

  return true;
};

const updateAddress = async (address: Partial<AddressDB>) => {
  const { id, description, alias, latitude, longitude } = address;

  const { data, error } = await supabase
    .from('addresses')
    .update({
      description,
      alias,
      latitude,
      longitude
    })
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    console.log(error);
    throw error
  }

  return data;
};

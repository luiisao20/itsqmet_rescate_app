import { supabase } from "@/supabase";
import { Customer } from "../../interfaces/customer";

export const updateCustomer = async (customer: Partial<Customer>) => {
  const { email, cellphone, name, photo, last_name, user_id } = customer;

  const { data, error } = await supabase
    .from("customers")
    .update({ name, photo, last_name, cellphone, user_id })
    .eq("email", email)
    .select();

  if (error) throw error;

  const customerUpdated: Customer = data[0];

  return customerUpdated;
};

const createCustomer = (customer: Partial<Customer>) => {};

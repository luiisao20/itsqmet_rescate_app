import {supabase} from "@/supabase";
import {Customer} from "../../interfaces/customer";

export const getCustomer = async (email: string) => {
  const { data, error } = await supabase
    .from("customers")
    .select()
    .eq("email", email);

  if (error) {
    console.log(error);

    throw error;
  }

  const customer: Customer = data[0];
  return customer;
};

import { supabase } from "@/supabase";
import { CardDB } from "../../interfaces/card";

export const getCustomerCards = async (
  idCustomer: number
): Promise<CardDB[] | null> => {
  const { data, error } = await supabase
    .from("cards")
    .select()
    .eq("id_customer", idCustomer);

  if (error) {
    return null;
  }
  const cards: CardDB[] = data;
  return cards;
};

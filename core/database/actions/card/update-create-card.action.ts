import { supabase } from "@/supabase";
import { CardDB } from "../../interfaces/card";

export const createUpdateCard = (card: Partial<CardDB>) => {
  console.log(card.id);

  if (!card.id) {
    return createCard(card);
  }

  return updateCard(card);
};

export const deleteCard = async(idCard: number) => {
  const { error } = await supabase.from("cards").delete().eq("id", idCard);

  if (error) throw error;

  return true;
};

const createCard = async (card: Partial<CardDB>) => {
  const { type, month, year, number, idCustomer, userId } = card;

  const { data, error } = await supabase
    .from("cards")
    .insert({
      type,
      month,
      year,
      number,
      id_customer: idCustomer,
      user_id: userId,
    })
    .select();

  if (error) {
    console.log(error);
    throw new Error("Error al guardar la tarjeta");
  }
  const newCard: CardDB = data![0];

  return newCard;
};

const updateCard = async (card: Partial<CardDB>) => {
  const { type, month, year, number, idCustomer } = card;

  const { data, error } = await supabase.from("cards").insert({
    type,
    month,
    year,
    number,
    id_customer: idCustomer,
  });

  if (error) {
    console.log(error);
    throw new Error("Error al guardar la tarjeta");
  }
  const newCard: CardDB = data![0];
  return newCard;
};

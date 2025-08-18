import { supabase } from "@/supabase";
import { CardDB } from "../../interfaces/card";

export const createUpdateCard = (card: Partial<CardDB>) => {
  if (!card.id) {
    return createCard(card);
  }

  return updateCard(card);
};

export const deleteCard = async (idCard: number) => {
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
  const { type, month, year, number, id } = card;

  const { data, error } = await supabase
    .from("cards")
    .update({
      type,
      month,
      year,
      number,
    })
    .eq('id', id)
    .select();

  if (error) {
    console.log(error);

    throw new Error("update card");
  }
  const updatedCard: CardDB = data![0];
  return updatedCard;
};

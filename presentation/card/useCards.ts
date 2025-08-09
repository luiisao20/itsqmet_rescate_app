import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCustomer } from "../customer/useCustomer";
import { createUpdateCard, deleteCard } from "@/core/database/actions/card/update-create-card.action";
import { CardDB } from "@/core/database/interfaces/card";
import { getCustomerCards } from "@/core/database/actions/card/get-customer-cards";
import { Alert } from "react-native";
import { useAuthStore } from "../auth/store/useAuthStore";

export const useCards = () => {
  const { customerQuery } = useCustomer();
  const { user } = useAuthStore();
  const customer = customerQuery.data;
  const queryClient = useQueryClient();

  const cardQuery = useQuery({
    queryKey: ["cards", customer?.id],
    queryFn: () => getCustomerCards(customer?.id!),
    enabled: !!customer?.id,
    staleTime: 1000 * 60 * 60, // 1 hora
  });

  const cardMutation = useMutation({
    mutationFn: async (data: CardDB) =>
      createUpdateCard({ ...data, idCustomer: customer?.id, userId: user?.id }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cards", customer?.id],
      });
      Alert.alert("Tarjeta guardada", "La tarjeta se ha añadido correctamente");
    },

    onError: (error) => {
      console.log(error);
    },
  });

  const cardDeleteMutation = useMutation({
    mutationFn: async (cardId: number) => deleteCard(cardId), 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards", customer?.id] });
      Alert.alert(
        "Tarjeta eliminada",
        "La tarjeta se ha eliminado correctamente"
      );
    },
    onError: (error) => console.log(error),
  });

  return {
    cardQuery,
    cardMutation,
    cardDeleteMutation
  };
};

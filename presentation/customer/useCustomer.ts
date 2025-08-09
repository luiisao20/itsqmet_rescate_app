import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../auth/store/useAuthStore";
import { Customer } from "@/core/database/interfaces/customer";
import { Alert } from "react-native";
import { updateCustomer } from "@/core/database/actions/user/update-create-user";
import { getCustomer } from "@/core/database/actions/user/get-user.action";

export const useCustomer = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const customerQuery = useQuery({
    queryKey: ["customer", user?.email],
    queryFn: () => getCustomer(user?.email!),
    staleTime: 1000 * 60 * 60,
  });

  const customerMutation = useMutation({
    mutationFn: async (data: Customer) =>
      updateCustomer({ ...data, email: user?.email }),

    onSuccess: (data: Customer) => {
      queryClient.invalidateQueries({
        queryKey: ["customer", user?.email],
      });
      Alert.alert("Éxito", `Tu información a sido guardada, ${data.name}`);
    },
  });

  return { customerQuery, customerMutation };
};

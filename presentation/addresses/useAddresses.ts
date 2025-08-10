import { Alert } from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useCustomer } from "../customer/useCustomer";
import {
  getCustomerAddress,
  getCustomerAddresses,
} from "@/core/database/actions/addres/get-customer-addresses.action";
import { AddressDB } from "@/core/database/interfaces/address";
import {
  createUpdateAddress,
  deleteAddress,
} from "@/core/database/actions/addres/create-customer-address.action";

export const useAddresses = () => {
  const { customerQuery } = useCustomer();
  const customer = customerQuery.data;

  const addressesQuery = useQuery({
    queryKey: ["addresses", customer?.id],
    queryFn: () => getCustomerAddresses(customer?.id!),
    enabled: !!customer?.id,
    staleTime: 1000 * 60 * 60,
  });

  return { addressesQuery };
};

export const useAddress = (idAddress?: number) => {
  const queryClient = useQueryClient();
  const { customerQuery } = useCustomer();
  const customer = customerQuery.data;

  const addressQuery = useQuery({
    queryKey: ["address", idAddress],
    queryFn: () => getCustomerAddress(idAddress),
    enabled: !!idAddress,
    staleTime: 1000 * 60 * 60,
  });

  const addressMutation = useMutation({
    mutationFn: async (address: AddressDB) =>
      createUpdateAddress(address, customer?.id!),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["addresses", customer?.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["address", idAddress],
      });
      Alert.alert(
        "Direccion guardada",
        "La direccion ha sido guardada en la base de datos"
      );
    },

    onError: (error) => {
      console.log(error);
    },
  });

  const addressDeleteMutation = useMutation({
    mutationFn: async () => deleteAddress(idAddress!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses", customer?.id] });

      Alert.alert(
        "Dirección eliminada",
        "La dirección se ha eliminado correctamente"
      );
    },
    onError: (error) => console.log(error),
  });

  return {
    addressQuery,
    addressDeleteMutation,
    addressMutation,
  };
};

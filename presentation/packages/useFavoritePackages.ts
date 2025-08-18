import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useCustomer } from "../customer/useCustomer";
import { insertFavoritePackage } from "@/core/database/actions/packages/insert-favorite-package";
import { getFavoriteCustomerPackages } from "@/core/database/actions/packages/get-favorite-customers-package";
import { deleteFavoritePackage } from "@/core/database/actions/packages/delete-favorite-packages";
import { Package } from "@/core/database/interfaces/packages";

interface Props {
  limit?: number;
}

export const useFavoritePackage = ({ limit = 4 }: Props) => {
  const queryClient = useQueryClient();
  const { customerQuery } = useCustomer();
  const customer = customerQuery.data;

  const favoritePackagesQuery = useQuery({
    queryKey: ["favorites", customer?.id, limit],
    queryFn: () => getFavoriteCustomerPackages(customer?.id!, limit),
    enabled: !!customer?.id,
    staleTime: 1000 * 60 * 60,
  });

  const favoriteMutation = useMutation({
    mutationFn: async (packageData: Package) =>
      insertFavoritePackage(customer?.id!, packageData.id),

    onMutate: async (packageData: Package) => {
      await queryClient.cancelQueries({
        queryKey: ["favorites", customer?.id],
      });

      const previousData = queryClient.getQueriesData({
        queryKey: ["favorites", customer?.id],
      });

      queryClient.setQueriesData<Package[]>(
        { queryKey: ["favorites", customer?.id] },
        (old = []) => {
          const exists = old.some((fav) => fav.id === packageData.id);
          return exists ? old : [...old, packageData];
        }
      );
      return { previousData };
    },

    onSuccess: () => {
      console.log("exito");
    },

    onError: (err, _, context) => {
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      console.error("Error al agregar favorito:", err);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites", customer?.id, limit],
      });
    },
  });

  const deleteFavoriteMutation = useMutation({
    mutationFn: async (idPackage: number) =>
      deleteFavoritePackage(idPackage, customer?.id!),

    onMutate: async (idPackage: number) => {
      await queryClient.cancelQueries({
        queryKey: ["favorites", customer?.id],
      });

      const previousFavorites = queryClient.getQueriesData({
        queryKey: ["favorites", customer?.id],
      });

      queryClient.setQueriesData<Package[]>(
        {queryKey: ["favorites", customer?.id]},
        (old = []) => old.filter((fav) => fav.id !== idPackage)
      );

      return { previousFavorites };
    },

    onError: (err, _, context) => {
      if (context?.previousFavorites) {
        context.previousFavorites.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      console.error("Error al eliminar favorito:", err);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites", customer?.id, limit],
      });
      console.log("success");
    },
  });

  return {
    favoriteMutation,
    favoritePackagesQuery,
    deleteFavoriteMutation,
  };
};

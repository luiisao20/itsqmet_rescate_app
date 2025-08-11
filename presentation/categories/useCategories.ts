import { getCategories } from "@/core/database/actions/categories/get-categories.action";
import { getCategryById } from "@/core/database/actions/categories/get-category-by-id.action";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    staleTime: 1000 * 60 * 60,
  });

  return { categoriesQuery };
};

export const useCategory = (id: number) => {
  const categoryQuery = useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategryById(id),
    staleTime: 1000 * 60 * 60,
    enabled: !!id,
  });

  return { categoryQuery };
};

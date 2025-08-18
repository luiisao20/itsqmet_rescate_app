import { getPackageById } from "@/core/database/actions/packages/get-package-by-id.action";
import { getPackagesFromCategories } from "@/core/database/actions/packages/get-packages-from-categories.action";
import { useQuery } from "@tanstack/react-query";

interface Props {
  idCategory: number;
  limit?: number;
}

export const usePackages = ({ idCategory, limit = 4 }: Props) => {
  const packagesQuery = useQuery({
    queryKey: ["packages", idCategory, limit],
    queryFn: () => getPackagesFromCategories(idCategory, limit),
    staleTime: 1000 * 60 * 60,
    enabled: !!idCategory,
  });

  return { packagesQuery };
};

export const usePackage = (packageId: number) => {
  const packageQuery = useQuery({
    queryKey: ["package", packageId],
    queryFn: () => getPackageById(packageId),
    staleTime: 1000 * 60 * 60,
  });

  return { packageQuery };
};

import { supabase } from "@/supabase";
import { Package } from "../../interfaces/packages";

export interface PackageInfo extends Package {
  description: string | null;
  latitude: number | null;
  longitude: number | null;
}

export const getPackageById = async (idPackage: number): Promise<PackageInfo> => {
  const { data, error } = await supabase
    .rpc("get_package_info_by_id", {
      package_id: idPackage,
    })
    .single();

  if (error) {
    console.log(error);
    throw error;
  }

  return data as PackageInfo;
};

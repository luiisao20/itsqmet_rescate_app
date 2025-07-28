export interface RestaurantDB {
  id?: string;
  name: string;
  logo: string;
  background: string;
  idAddress: string;
}

export interface AddressDB {
  id?: string;
  description: string;
  latitude: number;
  longitude: number;
  alias?: string;
}

export interface CustomerDB {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface CardDB {
  id?: string;
  number: string;
  month: number;
  year: number;
  type: string;
  idCustomer?: string;
}

export interface CustomerHasAddresses {
  idAddress: string;
  idCustomer: string;
}

export interface PackageDB {
  id?: string;
  pickUp: string;
  packsLeft: number;
  distance: number;
  price: number;
  title: string;
  rate: number;
  idRestaurant: string;
  restaurant?: RestaurantDB | null;
}

export interface CustomerBuysPackages {
  idCustomer: string;
  idPackage: string;
  idRestaurant: string;
  quantity: number;
  date: string;
}

export interface CategoryDB {
  id?: string;
  key: string;
  title: string;
  subtitle: string;
}

export interface CategoryHasPackages {
  idPackage: string;
  idRestaurant: string;
  idCategory: string;
}

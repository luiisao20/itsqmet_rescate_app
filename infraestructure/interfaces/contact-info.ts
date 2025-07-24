export interface ContactCompany {
  companyName: string;
  brandName?: string;
  ruc: string;
  establishmentType: string;
  foodType: string;
  address: string;
  phone?: string;
  email?: string;
}

export interface ContactPerson {
  name: string;
  lastName: string;
  id: string;
  position: string;
  cellphone: string;
  email: string;
}
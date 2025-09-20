export interface Addresses {
  data: Address[];
  results: number;
  status: string;
}

export interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface NewAddress {
  name: string;
  details: string;
  phone: string;
  city: string;
}

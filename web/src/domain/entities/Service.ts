export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface ServiceCreate {
  name: string;
  description: string;
  price: number;
  category: string;
}

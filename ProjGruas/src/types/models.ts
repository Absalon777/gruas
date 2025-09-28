// Tipos compartidos del dominio
export type Service = {
  id: string;
  name: string;
  description: string;
  price: string;
  available: boolean;
};

export type PaymentMethod = {
  id: string;
  type: 'card' | 'cash' | 'later' | string;
  name: string;
  description: string;
};

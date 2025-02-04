export interface IBicycle {
  name: string;
  brand: string;
  model: string;
  price: number;
  image: string;
  type: 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric';
  description: string;
  quantity: number;
  inStock: boolean;
}

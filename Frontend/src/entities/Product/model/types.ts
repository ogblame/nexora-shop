export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: string;
  imageUrl?: string | null;
};

export type CreateProduct = Omit<Product, "id">;

export type UpdateProduct = Partial<Omit<Product, "id">>;

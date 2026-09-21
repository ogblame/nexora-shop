import type {
  CreateProduct,
  UpdateProduct,
} from "../../entities/Product/model/types.ts";

export const fetchProducts = async () => {
  const response = await fetch("/api/products");
  const dataProducts = await response.json();

  return dataProducts;
};

export const fetchAddProduct = async (
  newProduct: CreateProduct,
  image: File,
) => {
  const formData = new FormData();

  formData.append("name", newProduct.name);
  formData.append("description", newProduct.description);
  formData.append("price", String(newProduct.price));
  formData.append("quantity", String(newProduct.quantity));
  formData.append("image", image);

  const response = await fetch("/api/products", {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJkaW1ha3V6bWludGNldkBnbWFpbC5jb20iLCJmdWxsTmFtZSI6ItCU0LzQuNGC0YDQuNC5INCa0YPQt9GM0LzQuNC90YbQtdCyIiwiaWF0IjoxNzg3MDczMjMzLCJleHAiOjE3ODcxNTk2MzN9.tvq8GDevauXtn8p1BVaLHKgmGVbyBibRPtQoxhWMCh8`,
    },
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Не удалось создать товар");
  }

  return await response.json();
};

export const fetchUpdatedProduct = async (
  productId: number,
  updatedProduct: UpdateProduct,
) => {
  const response = await fetch(`/api/products/${productId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify(updatedProduct),
  });

  return await response.json();
};

export const fetchDeleteProduct = async (productId: number) => {
  const response = await fetch(`/api/products/${productId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });

  return await response.json();
};

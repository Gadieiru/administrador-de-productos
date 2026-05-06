export interface Product {
    id: number,
    title: string,
    price: number,
    thumbnail: string,
    category: string,
    stock: number
}

export interface Category {
  slug: string;
  name: string;
}

export interface ProductResponse {
    products: Product[];
}
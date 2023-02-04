import { client } from "./client";
import { productsQuery } from "./queries";

export type Product = {
  _id: string;
  name: string;
  price: string;
  sex: string;
  category: string;
  subCategory: string;
  filter: string;
  colour: string;
  image: { _key: string; asset: { url: string; }}[];
}

export const fetchProducts = async (gender: string): Promise<Product[] | undefined> => {
  const query = productsQuery(gender);

  try {
    const products = await client.fetch(query);
    return products;
  } catch (error) {
    console.log("Error fetching products: ", error);
  }
}

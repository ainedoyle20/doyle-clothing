import { client } from "./client";
import { productsQuery, productDetailsQuery, otherColourQuery } from "./queries";

export type Product = {
  _id: string;
  name: string;
  price: string;
  sex: string;
  category: string;
  subCategory: string;
  filter: string;
  colour: string;
  allColours: string[];
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

export const fetchProductDetails = async (id: string): Promise<Product | undefined> => {
  const query = productDetailsQuery(id);

  try {
    const details = await client.fetch(query);
    return details[0];
  } catch (error) {
    console.log("Error fetching product details: ", error);
  }
}

export const fetchOtherProductColour = async (name: string, colour: string): Promise<Product | undefined> => {
  const query = otherColourQuery(name, colour);

  try {
    const otherProducts = await client.fetch(query);
    return otherProducts[0];
  } catch (error) {
    console.log("Error fetching other product colour: ", error);
  }
}

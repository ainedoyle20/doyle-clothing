import { uuidv4 } from "@firebase/util";
import { client } from "./client";
import { productsQuery, productDetailsQuery, otherColourQuery, userProfileQuery } from "./queries";
import { TUserProfile } from "../store/userStore";

export type Product = {
  _id: string;
  name: string;
  price: string;
  sex: string;
  description: string;
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

const fetchUserProfile = async (id: string): Promise<TUserProfile | undefined> => {
  const query = userProfileQuery(id);

  try {
    const res = await client.fetch(query);
    return res[0];
  } catch (error) {
    console.log("Error fetching user profile from sanity: ", error);
  }
}

export const createOrFetchUser = async (userId: string, updateUserProfile: any): Promise<void> => {
  const doc = {
    _id: userId,
    _type: "user",
    userCart: []
  }

  try {
    const res = await client.createIfNotExists(doc);
    if (Object.keys(res).length) {
      const profile = await fetchUserProfile(res?._id);
      if (profile) {
        updateUserProfile({ _id: profile._id, userCart: profile.userCart });
      }
    }

  } catch (error) {
    console.log("Error fetching or creating user doc in sanity: ", error);
  }
}

export const removeProductFromCart = async (id: string, productKey: string, updateUserProfile:any): Promise<void> => {
  try {
    await client.patch(id).unset([`userCart[_key=="${productKey}"]`]).commit();

    await createOrFetchUser(id, updateUserProfile);
  } catch (error) {
    console.log("Error removing product from cart: ", error);
  }
}

export const addNewProductToCart = async (id: string, productId: string, productSize: string, updateUserProfile:any): Promise<void> => {
  try {
    await client.patch(id).setIfMissing({ userCart: [] }).insert("after", "userCart[-1]", [{
      _key: uuidv4(),
      _type: "document",
      cartProduct: {
        _type: "reference",
        _ref: productId
      },
      count: 1,
      size: productSize
    }]).commit();

    await createOrFetchUser(id, updateUserProfile);
  } catch (error) {
    console.log("Error removing product from cart: ", error);
  }
}
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type TStoredProduct = {
  _id: string;
  colour: string;
  name: string;
  price: string;
  image: {
    _key: string;
    asset: {
      url: string;
    };
  }[];
}

export type TCartItem = {
  _key: string;
  count: number;
  size: string;
  sortingNum: number;
  storedProduct: TStoredProduct;
}

export type TOrder = {
  _key: string;
  orderDate: string;
  sortingNum: number;
  totalCost: number;
  products: TCartItem[];
}

export type TUserProfile = {
  _id: string;
  cartItems: TCartItem[];
  orders: TOrder[];
}

interface UserState {
  userProfile: TUserProfile | null;
  updateUserProfile(arg: TUserProfile | null): void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist((set) => ({
      userProfile: null,
      updateUserProfile: (profile: TUserProfile | null) => set({ userProfile: profile })
    }),
    {
      name: "user-profile-doyle-clothing"
    })
  )
);

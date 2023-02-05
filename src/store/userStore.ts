import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { Product } from "../services/funcs";

export type TUserCart = {
  _key: string;
  cartProduct: Product;
  count: number;
  size: string;
}

export type TUserProfile = {
  _id: string;
  userCart: TUserCart[];
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

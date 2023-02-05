import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type TUserProfile = {
  _id: string;
  userCart: any[];
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

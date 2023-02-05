import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type TUserProfile = {
  _id: string;
  userId: string;
  userCart: [];
}

interface UserState {
  userProfile: TUserProfile | null;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist((set) => ({
      userProfile: null,
      updateProfile: (profile: TUserProfile | null) => set({ userProfile: profile })
    }),
    {
      name: "user-profile-doyle-clothing"
    })
  )
);

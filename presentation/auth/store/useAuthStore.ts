import { authCheckSession, authLogin, registerUser } from "@/core/auth/actions/authActions";
import { SecureStorageAdapter } from "@/helpers/secure-storage.adapter";
import { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";

export type AuthStatus = "authenticated" | "unauthenticated" | "checking";

export interface AuthState {
  user?: User;
  status: AuthStatus;
  session?: Session;

  login: (email: string, password: string) => Promise<boolean>;
  changeStatus: (session?: Session, user?: User) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: undefined,
  token: undefined,
  status: "checking",

  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);

    return get().changeStatus(resp?.session, resp?.user);
  },

  checkStatus: async () => {
    const resp = await authCheckSession();
    get().changeStatus(resp!, resp?.user);
  },

  changeStatus: async (session?: Session, user?: User) => {
    if (!session || !user) {
      set({ status: "unauthenticated", session: undefined, user: undefined });
      SecureStorageAdapter.deleteItem("token");
      return false;
    }

    set({
      status: "authenticated",
      session: session,
      user: user,
    });

    await SecureStorageAdapter.setItem("token", session.refresh_token);

    return true;
  },

  logout: async () => {
    SecureStorageAdapter.deleteItem("token");
    set({
      status: "unauthenticated",
      session: undefined,
      user: undefined,
    });
    return;
  },

  register: async(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    const resp = await registerUser(email, password, firstName, lastName);
    return resp;
  },
}));

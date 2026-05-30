import type { User } from "firebase/auth";
import type { FirestoreUser } from "@/types/user";

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface AuthContextValue {
  user: User | null;
  userProfile: FirestoreUser | null;
  loading: boolean;
  /** False when Firebase env variables are missing from .env.local */
  firebaseReady: boolean;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
}

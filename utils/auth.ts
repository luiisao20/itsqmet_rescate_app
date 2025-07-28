import { useAuthStore } from "@/components/store/useAuth";
import { auth } from "@/firebase/firebase.config";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  User,
  UserCredential,
} from "firebase/auth";

export const registerUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user: User = userCredential.user;
    console.log("User registered:", userCredential.user);
    return user;
  } catch (error) {
    throw new Error(`Registration error: ${error}`);
  }
};

const mapLoginError = (code: string): string => {
  switch (code) {
    case "auth/user-not-found":
      return "Usuario no encontrado.";
    case "auth/wrong-password":
      return "Contraseña incorrecta.";
    case "auth/invalid-email":
      return "Correo electrónico inválido.";
    default:
      return "Error al iniciar sesión.";
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: unknown) {
    if (error instanceof FirebaseError)
      throw new Error(mapLoginError(error.code));
    throw new Error("Error desconocido al iniciar sesión");
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    useAuthStore.getState().setUser(null);
    console.log("logout");
  } catch (error) {
    console.log("Error al cerrar sesion", error);
  }
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.log(error);
  }
};

export const changePassword = async (
  user: User,
  currentPassword: string,
  newPassword: string
) => {

  try {
    const credential = EmailAuthProvider.credential(user.email!, currentPassword);

    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);

  } catch (error: unknown) {
    throw new Error(`Error actualizando la contraseña ${error}`)
  }

};

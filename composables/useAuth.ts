import {
  useCookie,
  useFetch,
  useRequestHeaders,
  useRouter,
  useState,
} from "#app";
import { ISession } from "~/types/ISession";
import { IUser } from "~/types/IUser";

export const userAuthCookie = () => useCookie("auth_token");

export async function userLogout() {
  await useFetch("/api/auth/logout");
  useState("user").value = null;
  await useRouter().push("/");
}

export async function registerWithEmail(
  email: string,
  password: string,
  confirmPassword: string
) {
  console.log({ email, password, confirmPassword });

  try {
    const res = await $fetch<ISession>("/api/auth/register", {
      method: "POST",
      body: {
        email,
        password,
        confirmPassword,
      },
    });

    if (res) {
      useState("user").value = res;
      await useRouter().push("/dashboard");
    }
  } catch (e: Error) {
    console.log("error: " + e.toString());
  }
}

export async function useUser(): Promise<IUser> {
  const authCookie = userAuthCookie().value;
  const user = useState<IUser>("user");

  if (authCookie && !user.value) {
    const { data } = await useFetch("/api/auth/getByAuthToken", {
      headers: useRequestHeaders(["cookie"]),
    });

    user.value = data.value;
  }
  return user.value;
}

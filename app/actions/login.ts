"use server";

import { cookies } from "next/headers";

export async function loginAction(username: string) {
  const cookieStore = await cookies();
  cookieStore.set("accessToken", username);
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
}

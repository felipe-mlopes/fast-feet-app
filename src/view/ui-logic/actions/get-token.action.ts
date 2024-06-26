'use server'

import { getSession } from "@/models/auth/auth";

export async function getTokenAction() {
const { token } = await getSession();

  const arrayToken = token?.split(".")!;
  const tokenPayload = JSON.parse(atob(arrayToken[1]));

  return {
    token,
    tokenPayload
  }
}
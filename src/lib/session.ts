import { NEXT_AUTH_CONFIG } from "@/app/api/lib/auth";
import { getServerSession } from "next-auth";

export const getUserDetails = async () => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  return session;
};

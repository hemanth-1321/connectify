import { Hero } from "@/components/Hero";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "./api/lib/auth";

const getUserDetails = async () => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  return session;
};

export default async function Home() {
  const session = await getUserDetails();

  if (session?.user) {
    redirect("/home");
  }
  return (
    <div>
      <Hero />
    </div>
  );
}

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "../api/lib/auth";
import { Feed } from "@/components/FeedSection";
const getUserDetails = async () => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  return session;
};

export default async function () {
  const session = await getUserDetails();

  if (!session?.user) {
    redirect("/");
  }
  return (
    <div>
      <Feed />
    </div>
  );
}

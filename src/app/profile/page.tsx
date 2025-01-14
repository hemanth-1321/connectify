import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { profile } from "../actions/userProfile/route";
import { getUserDetails } from "@/lib/session";
import { redirect } from "next/navigation";
export default async function () {
  const session = await getUserDetails();
  if (!session) {
    redirect("/");
  }
  const user = await profile(session?.user.id);
  return (
    <div>
      <div className="flex justify-center items-center mt-10">
        <Avatar className="border w-32 h-32">
          <AvatarImage
            src={user.profileImg || "./avatar.png"}
            alt={user.fullname}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div>
          <span>{user.fullname}</span>
        </div>
      </div>
    </div>
  );
}

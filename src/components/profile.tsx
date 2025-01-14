import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { profile } from "@/app/actions/userProfile/route";

export const Userprofile = async (userid: number) => {
  return (
    <div>
      {" "}
      <div className="flex justify-center items-center mt-10">
        <Avatar className="border w-32 h-32">
          <AvatarImage src="./avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div>
          <span></span>
        </div>
      </div>
    </div>
  );
};

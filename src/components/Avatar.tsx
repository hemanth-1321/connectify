import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import React from "react";

export const Avatarimg = () => {
  return (
    <div>
      <Avatar className="border">
        <AvatarImage src="./avatar.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

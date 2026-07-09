import React, { useState } from "react";
import Avatar from "./Avatar";
import { HoveredLink, Menu, MenuItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";
import Button from "./Button";

function UserMenu({ user, logoutMutation }) {
  const [active, setActive] = useState(false);

  return (
    <Menu setActive={setActive} className={cn("bg-transparent p-0")}>
      <MenuItem
        setActive={setActive}
        active={active}
        item={
          <Avatar className="text-2xl cursor-pointer">
            {user?.data?.username?.charAt(0)?.toUpperCase() || "U"}
          </Avatar>
        }
      >
        <div className="flex flex-col space-y-4 text-sm">
          <Button
            onClick={() => {
              console.log("Logout clicked");
              logoutMutation.mutate();
            }}
          >
            Logout
          </Button>
          <HoveredLink href="/dashboard/settings">Profile</HoveredLink>
        </div>
      </MenuItem>
    </Menu>
  );
}

export default UserMenu;

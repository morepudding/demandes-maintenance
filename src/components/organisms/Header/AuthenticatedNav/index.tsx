"use client";

import { LogOutIcon, MoreVerticalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/molecules/DropDownMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/Avatar";
import { useSession, signOut } from "next-auth/react";

export default function AuthenticatedNav() {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-8 ml-auto cursor-pointer focus:outline-none">
        <Avatar>
          <AvatarImage src={session?.user?.image ?? ""} />
          <AvatarFallback>
            {session?.user?.name?.[0] ?? "?"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col flex-1 text-left text-sm leading-tight px-2">
          <span className="truncate font-medium text-white">
            {session?.user?.name}
          </span>
          <span className="truncate text-xs text-muted-foreground">
            {session?.user?.email}
          </span>
        </div>
        <MoreVerticalIcon className="ml-auto size-4 text-white" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        align="end"
        sideOffset={4}>
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/" })}
          className="cursor-pointer"
        >
          <LogOutIcon className="mr-2 h-4 w-4" />
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
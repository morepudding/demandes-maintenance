"use client";

import { LogOutIcon, MoreVerticalIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/molecules/DropDownMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/Avatar";
import { signOut } from "next-auth/react";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function AuthenticatedNav() {
    const { name, image, isLoading } = useCurrentUser();
    const displayName = name ?? "Prénom NOM";

    if (isLoading) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-4 sm:px-6 ml-auto cursor-pointer focus:outline-none">
                <span className="truncate text-sm font-semibold text-white">
                    {displayName}
                </span>
                <Avatar>
                    <AvatarImage src={image ?? ""} />
                    <AvatarFallback>{name?.[0] ?? "?"}</AvatarFallback>
                </Avatar>
                <MoreVerticalIcon className="ml-auto size-4 text-white" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="end"
                sideOffset={4}
            >
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

"use client";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/molecules/NavigationMenu";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import AuthenticatedNav from "./AuthenticatedNav";

export default function Header() {
    return (
        <div className="flex w-full h-15 bg-black align-middle pl-8 mb-3">
            <div className="flex grow items-center text-center font-bold text-xl text-white uppercase">
                <p>My Application</p>
            </div>

            <NavigationMenu className="flex-none">
                <NavigationMenuList>
                    <NavigationMenuItem className="px-2 ">
                        <Link href="/bdd" legacyBehavior passHref>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                            >
                                BDD Connection
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="px-2">
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                            >
                                My New Function
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <AuthenticatedNav />
        </div>
    );
}

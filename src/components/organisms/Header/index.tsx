"use client";

import AuthenticatedNav from "./AuthenticatedNav";

export default function Header() {
    return (
        <div className="flex w-full flex-col items-center bg-black px-4 py-3 sm:px-8 md:flex-row md:items-center">
            <div className="font-bold text-lg sm:text-xl text-white uppercase text-center md:absolute md:left-1/2 md:-translate-x-1/2">
                <p>Demandes de maintenance</p>
            </div>

            <div className="mt-2 mx-auto md:mx-0 md:mt-0 md:ml-auto flex items-center">
                <AuthenticatedNav />
            </div>
        </div>
    );
}

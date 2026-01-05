import Link from "next/link";
import { URL } from "url";
import { buttonVariants } from "@/components/atoms/Button";
import { Eye } from "lucide-react";

export type ButtonsActionLink = {
    label?: string;
    href?: URL | string;
    action?: () => void;
};

export default function ButtonLink({
    linkActions = [],
}: {
    linkActions: ButtonsActionLink[];
}) {
    return (
        <div>
            {linkActions.map(({ label, href }) => (
                <Link
                    className={buttonVariants({ variant: "link" })}
                    key={`buttonLink-${label}`}
                    href={href || "#"}
                >
                    <Eye /> {label}
                </Link>
            ))}
        </div>
    );
}

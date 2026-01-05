import Link from "next/link";
import { URL } from "url";
import { buttonVariants } from "@/components/atoms/Button";
import { Plus } from "lucide-react";

export type ButtonsActionLink = {
    label?: string;
    href?: URL | string;
    action?: () => void;
};

export default function ButtonWithIcon({
    linkActions = [],
}: {
    linkActions: ButtonsActionLink[];
}) {
    return (
        <div>
            {linkActions.map(({ label, href, action }) => (
                <Link
                    className={buttonVariants({ variant: "link" })}
                    key={`buttonLink-${label}`}
                    href={href || "#"}
                    onClick={action}
                >
                    <Plus />
                </Link>
            ))}
        </div>
    );
}

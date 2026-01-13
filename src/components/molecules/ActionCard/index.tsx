import React from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/core/lib/utils";

interface ActionCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    href: string;
    colorClassName?: string;
    iconClassName?: string;
}

export const ActionCard: React.FC<ActionCardProps> = ({
    title,
    description,
    icon: Icon,
    href,
    colorClassName = "text-primary",
    iconClassName = "bg-primary/10",
}) => {
    return (
        <Link
            href={href}
            className="group flex flex-col p-6 bg-white rounded-xl border border-border shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200 hover:-translate-y-1"
        >
            <div
                className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors group-hover:scale-110",
                    iconClassName,
                )}
            >
                <Icon className={cn("w-6 h-6", colorClassName)} />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
            </p>
        </Link>
    );
};

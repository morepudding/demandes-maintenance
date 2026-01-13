import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/core/lib/utils";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    description?: string;
    colorClassName?: string;
    iconClassName?: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
}

export const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    icon: Icon,
    description,
    colorClassName = "text-primary",
    iconClassName = "bg-primary/10",
    trend,
}) => {
    return (
        <div className="flex flex-col p-6 bg-white rounded-xl border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <div
                    className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        iconClassName,
                    )}
                >
                    <Icon className={cn("w-5 h-5", colorClassName)} />
                </div>
                {trend && (
                    <div
                        className={cn(
                            "text-xs font-medium px-2 py-1 rounded-full",
                            trend.isPositive
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-rose-50 text-rose-600",
                        )}
                    >
                        {trend.isPositive ? "+" : "-"}
                        {trend.value}%
                    </div>
                )}
            </div>
            <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    {title}
                </h3>
                <p className="text-3xl font-bold text-foreground">{value}</p>
                {description && (
                    <p className="text-xs text-muted-foreground mt-2">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};

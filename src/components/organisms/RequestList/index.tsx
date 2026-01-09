import { RequestCard } from "@/components/molecules/RequestCard";

export function RequestList({
    items,
}: {
    items: {
        title: string;
        creator: string;
        sites: string[];
        supplier: string;
        indicPrice: number;
        assignee?: string;
    }[];
}) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
                <RequestCard
                    key={item.title}
                    title={item.title}
                    creator={item.creator}
                    sites={item.sites}
                    supplier={item.supplier}
                    indicPrice={item.indicPrice}
                />
            ))}
        </div>
    );
}

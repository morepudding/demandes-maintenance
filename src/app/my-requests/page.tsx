import { RequestList } from "@/components/organisms/RequestList";

const data = [
    {
        title: "Card A",
        creator: "Details A",
        sites: ["Site 1", "Site 2"],
        supplier: "Supplier A",
        indicPrice: 1000,
    },
    {
        title: "Card B",
        creator: "Details B",
        sites: ["Site 3"],
        supplier: "Supplier B",
        indicPrice: 1500,
    },
];

export default function RequestListPage() {
    return (
        <main className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
                My Requests
            </h1>
            <RequestList items={data} />
        </main>
    );
}

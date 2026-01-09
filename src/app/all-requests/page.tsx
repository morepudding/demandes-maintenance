import { RequestList } from "@/components/organisms/RequestList";

const data = [
    {
        title: "Card A",
        creator: "John Doe",
        sites: ["Site 1", "Site 2"],
        supplier: "Supplier A",
        indicPrice: 1000,
        assignee: "Alice",
    },
    {
        title: "Card B",
        creator: "Jane Smith",
        sites: ["Site 3"],
        supplier: "Supplier B",
        indicPrice: 1500,
    },
    {
        title: "Card C",
        creator: "Bob Johnson",
        sites: ["Site 1"],
        supplier: "Supplier C",
        indicPrice: 2000,
        assignee: "Bob",
    },
    {
        title: "Card D",
        creator: "Alice Brown",
        sites: ["Site 2", "Site 3"],
        supplier: "Supplier A",
        indicPrice: 1200,
    },
];

export default function AllRequestsPage() {
    return (
        <main className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
                All Requests
            </h1>
            <RequestList items={data} />
        </main>
    );
}

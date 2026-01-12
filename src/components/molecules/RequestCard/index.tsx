export function RequestCard({
    title,
    creator,
    sites,
    supplier,
    indicPrice,
    assignee,
}: {
    title: string;
    creator: string;
    sites: string[];
    supplier: string;
    indicPrice: number;
    assignee?: string;
}) {
    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {title}
            </h3>

            <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
                <p className="text-sm text-gray-600">
                    <span className="font-medium">Created by:</span> {creator}
                </p>
                <p className="text-sm text-gray-600">
                    <span className="font-medium">Sites:</span>{" "}
                    {sites.join(", ")}
                </p>
            </div>

            <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
                <p className="text-sm text-gray-600">
                    <span className="font-medium">Supplier:</span> {supplier}
                </p>
                <p className="text-sm font-semibold text-blue-600">
                    Indicative Price: {indicPrice}€
                </p>
            </div>

            <p className="text-sm">
                <span className="font-medium text-gray-700">Assigned to:</span>
                <span
                    className={`ml-2 inline-block px-2 py-1 rounded-full text-xs font-medium ${assignee ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}
                >
                    {assignee || "Not assigned"}
                </span>
            </p>
        </div>
    );
}

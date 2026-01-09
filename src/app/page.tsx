import Link from "next/link";

export default function Home() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="max-w-4xl w-full">
                <div className="grid gap-6 md:grid-cols-3">
                    <Link
                        href="/my-requests"
                        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 text-center group hover:-translate-y-1"
                    >
                        <div className="text-blue-600 text-5xl mb-4">📋</div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            My Requests
                        </h2>
                        <p className="text-gray-600 text-sm">
                            View all requests you&apos;ve created
                        </p>
                    </Link>

                    <Link
                        href="/my-assignments"
                        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 text-center group hover:-translate-y-1"
                    >
                        <div className="text-green-600 text-5xl mb-4">✅</div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                            My Assignments
                        </h2>
                        <p className="text-gray-600 text-sm">
                            View requests assigned to you
                        </p>
                    </Link>

                    <Link
                        href="/all-requests"
                        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 text-center group hover:-translate-y-1"
                    >
                        <div className="text-purple-600 text-5xl mb-4">🗂️</div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                            All Requests
                        </h2>
                        <p className="text-gray-600 text-sm">
                            View all maintenance requests
                        </p>
                    </Link>
                </div>
            </div>
        </main>
    );
}

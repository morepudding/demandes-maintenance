import connectToDB from "@/core/lib/db";

export default async function testConnection() {
    let pool = await connectToDB();
    const result = await pool.request().query("SELECT 1");
    console.log(result);

    process.exit(0);
}

testConnection();

// import DynamicBreadcrumb from "@/components/organisms/DynamicBreadcrumb";
import { Toaster } from "sonner";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section>
            {children}
            <Toaster position="bottom-right" richColors />
        </section>
    );
}

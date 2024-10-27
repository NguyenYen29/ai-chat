import { MobileSidebar } from "@/components/mobile-sidebar";
import { Sidebar } from "@/components/sidebar";

type Props = {
    children: React.ReactNode;
};

export default function HomeLayout({ children }: Props) {
    return (
        <div className="h-full flex bg-neutral-800 relative overflow-hidden">
            <Sidebar />
            <div>
                <MobileSidebar />
            </div>
            <div className="flex-1 pl-14 h-full">{children}</div>
        </div>
    );
}

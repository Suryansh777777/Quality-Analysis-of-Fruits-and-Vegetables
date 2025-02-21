interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white">
            <div className="container mx-auto px-4 py-8">
                {children}
            </div>
        </div>
    );
} 
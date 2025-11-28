import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, Monitor, LogOut, Settings, Menu } from 'lucide-react';

const Layout = ({ role }: { role: 'admin' | 'operations' }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

    const handleLogout = () => {
        navigate('/');
    };

    const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => {
        const isActive = location.pathname === to;
        return (
            <Link
                to={to}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors mb-1 ${isActive
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
            >
                <Icon size={20} className={isActive ? 'text-blue-700' : 'text-gray-500'} />
                {isSidebarOpen && <span>{label}</span>}
            </Link>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? 'w-64' : 'w-20'
                    } bg-white border-r border-gray-200 fixed h-full z-20 transition-all duration-300 ease-in-out flex flex-col`}
            >
                <div className="p-4 flex items-center justify-between border-b border-gray-100 h-16">
                    <div className={`flex items-center space-x-3 ${!isSidebarOpen && 'justify-center w-full'}`}>
                        {/* Logo Placeholder - using text as fallback if image fails, but structure ready for image */}
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-700 rounded text-white font-bold text-lg">
                            A
                        </div>
                        {isSidebarOpen && <span className="text-lg font-bold text-gray-800 tracking-tight">Achariya</span>}
                    </div>
                    {isSidebarOpen && (
                        <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-gray-600">
                            <Menu size={20} />
                        </button>
                    )}
                </div>

                {!isSidebarOpen && (
                    <div className="flex justify-center p-4">
                        <button onClick={() => setIsSidebarOpen(true)} className="text-gray-400 hover:text-gray-600">
                            <Menu size={20} />
                        </button>
                    </div>
                )}

                <nav className="flex-1 p-4 overflow-y-auto">
                    <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />

                    <div className="my-4 border-t border-gray-100"></div>

                    <NavItem to="/digital-requests" icon={FileText} label="Digital Requests" />
                    <NavItem to="/admissions" icon={Users} label="Admissions Insights" />

                    {role === 'admin' && (
                        <NavItem to="/it-assets" icon={Monitor} label="IT Assets" />
                    )}

                    <div className="my-4 border-t border-gray-100"></div>

                    <NavItem to="/settings" icon={Settings} label="Settings" />
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className={`flex items-center space-x-3 px-4 py-3 w-full text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ${!isSidebarOpen && 'justify-center'}`}
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span className="font-medium">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
                {/* Topbar */}
                <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {location.pathname === '/dashboard' && 'Dashboard'}
                        {location.pathname === '/digital-requests' && 'Digital Requests'}
                        {location.pathname === '/admissions' && 'Admissions Insights'}
                        {location.pathname === '/it-assets' && 'IT Assets'}
                        {location.pathname === '/settings' && 'Settings'}
                    </h2>
                    <div className="flex items-center space-x-4">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-medium text-gray-900">
                                {role === 'admin' ? 'Administrator' : 'Operations Manager'}
                            </p>
                            <p className="text-xs text-gray-500">
                                {role === 'admin' ? 'admin@achariya.in' : 'ops@achariya.in'}
                            </p>
                        </div>
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
                            {role === 'admin' ? 'AD' : 'OP'}
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;

import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Left Sidebar */}
            <nav className="w-64 bg-white border-r border-gray-200">
                <div className="flex items-center justify-center h-16 border-b border-gray-100">
                    <Link href="/dashboard">
                        <img src="/images/logo.png" className="h-10 w-auto" />
                    </Link>
                </div>

                <div className="flex flex-col items-center px-4 py-6 space-y-4 text-center">
                    <NavLink
                        href={route('dashboard')}
                        active={route().current('dashboard')}
                        className="w-full py-3 px-4 text-lg font-bold text-gray-700 hover:bg-gray-100 transition"
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        href={route('backup.report')}
                        active={route().current('backup.report')}
                        className="w-full py-3 px-4 text-lg font-bold text-gray-700 hover:bg-gray-100 transition"
                    >
                        Agent Backup
                    </NavLink>
                    <NavLink
                        href={route('restore.report')}
                        active={route().current('restore.report')}
                        className="w-full py-3 px-4 text- font-bold text-gray-700 hover:bg-gray-100 transition"
                    >
                        Agent Restore
                    </NavLink>
                    <NavLink
                        href={route('profile.edit')}
                        active={route().current('profile.edit')}
                        className="w-full py-3 px-4 text-lg font-bold text-gray-700 hover:bg-gray-100 transition"
                    >
                        Settings
                    </NavLink>
                    <NavLink
                        href={route('profile.edit')}
                        active={route().current('profile.edit')}
                        className="w-full py-3 px-4 text-lg font-bold text-gray-700 hover:bg-gray-100 transition"
                    >
                        User Management
                    </NavLink>


                    {/* Add more links here */}
                </div>
            </nav>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Top Header with Profile Dropdown on Right */}
                <header className="bg-white shadow flex items-center justify-between px-6 h-16">
                    <div>
                        {/* You can include header content here if needed */}
                        {header}
                    </div>

                    <div className="relative">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-800 focus:outline-none">
                                    {user.name}
                                    <svg
                                        className="ml-2 h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </header>

                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Restore() {
    const [backups, setRestores] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetch('http://localhost:8000/api/admin/backup/report')
            .then(response => response.json())
            .then(data => {
                const filtered = data.data.filter(item => item.type === 'Restore');
                setRestores(filtered);
            });
    }, []);

    const handleView = (backupId) => {
        router.visit(`/backup/report/${backupId}`);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    const filteredBackups = backups.filter((backup) =>
        backup.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        backup.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
        backup.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredBackups.length / itemsPerPage);
    const paginatedBackups = filteredBackups.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Agent Restore</h2>}
        >
            <Head title="Agent Backup" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    {/* Search Bar */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search by Hostname, IP, or Username..."
                            className="w-full md:w-1/2 p-2 border border-gray-300 rounded"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="min-w-full table-auto border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border px-4 py-2">Hostname</th>
                                        <th className="border px-4 py-2">IP</th>
                                        <th className="border px-4 py-2">Username</th>
                                        <th className="border px-4 py-2">Status</th>
                                        <th className="border px-4 py-2">Backup Name</th>
                                        <th className="border px-4 py-2">Last Restore</th>
                                        <th className="border px-4 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedBackups.map((backup) => (
                                        <tr key={backup.id}>
                                            <td className="border px-4 py-2 text-center">{backup.hostname}</td>
                                            <td className="border px-4 py-2 text-center">{backup.ip}</td>
                                            <td className="border px-4 py-2 text-center">{backup.username}</td>
                                            <td className="border px-4 py-2 text-center">{backup.status}</td>
                                            <td className="border px-4 py-2 text-center">{backup.backup_name}</td>
                                            <td className="border px-4 py-2 text-center">{new Date(backup.created_at).toLocaleString()}</td>
                                            <td className="border px-4 py-2 text-center">
                                                <button
                                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                                    onClick={() => handleView(backup.id)}
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {paginatedBackups.length === 0 && (
                                        <tr>
                                            <td className="px-4 py-2 text-center" colSpan="7">
                                                No Restore data found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center mt-6 space-x-2">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                        disabled={currentPage === 1}
                                    >
                                        Previous
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <button
                                            key={i + 1}
                                            onClick={() => handlePageChange(i + 1)}
                                            className={`px-3 py-1 rounded ${
                                                currentPage === i + 1
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-200 hover:bg-gray-300'
                                            }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                        disabled={currentPage === totalPages}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

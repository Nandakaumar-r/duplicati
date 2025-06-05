import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Dashboard() {
    // State to hold API response data
    const [dashboardData, setDashboardData] = useState({
        total_backups: 0,
        total_restores: 0,
        success_rate: 0,
        failed_rate: 0,
        recent_backups: [],
        recent_restores: [],
    });

    // Fetch data from API on component mount
    useEffect(() => {
        fetch('http://localhost:8000/api/admin/dashboard-data')
            .then((res) => res.json())
            .then((json) => {
                if (json.data) {
                    setDashboardData(json.data);
                }
            })
            .catch((err) => console.error('Failed to fetch dashboard data:', err));
    }, []);

    // Prepare combined data for the table (merge recent backups and restores)
    // Add a property "status" if missing — adjust as per your backend data.
    const recentData = [
        ...dashboardData.recent_backups.map(item => ({ ...item, status: item.status || 'Success' })),
        ...dashboardData.recent_restores.map(item => ({ ...item, status: item.status || 'Success' }))
    ];

    // Chart data using dynamic values
    const barData = {
        labels: ['Backup', 'Restore'],
        datasets: [
            {
                label: 'Operations',
                data: [dashboardData.total_backups, dashboardData.total_restores],
                backgroundColor: ['#3b82f6', '#10b981'],
            },
        ],
    };

    const pieData = {
        labels: ['Backup', 'Restore'],
        datasets: [
            {
                data: [dashboardData.total_backups, dashboardData.total_restores],
                backgroundColor: ['#6366f1', '#f59e0b'],
            },
        ],
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                        <div className="bg-white p-6 rounded-2xl shadow flex flex-col items-center">
                            <h4 className="text-lg font-semibold text-gray-700 mb-2">Total Backups</h4>
                            <p className="text-3xl font-bold text-blue-600">{dashboardData.total_backups}</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow flex flex-col items-center">
                            <h4 className="text-lg font-semibold text-gray-700 mb-2">Total Restores</h4>
                            <p className="text-3xl font-bold text-green-600">{dashboardData.total_restores}</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow flex flex-col items-center">
                            <h4 className="text-lg font-semibold text-gray-700 mb-2">Success</h4>
                            <p className="text-3xl font-bold text-teal-600">{dashboardData.success_rate}</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow flex flex-col items-center">
                            <h4 className="text-lg font-semibold text-gray-700 mb-2">Failed</h4>
                            <p className="text-3xl font-bold text-red-600">{dashboardData.failed_rate}</p>
                        </div>
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow">
                            <h3 className="text-lg font-bold mb-4">Backup vs Restore Summary</h3>
                            <Bar data={barData} />
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow">
                            <h3 className="text-lg font-bold mb-4">Backup vs Restore Pie</h3>
                            <Pie data={pieData} />
                        </div>
                    </div>

                    {/* Latest Reports Table */}
                    <div className="mt-10 bg-white p-6 rounded-2xl shadow">
                        <h3 className="text-xl font-bold mb-4">Latest Reports</h3>
                        <table className="min-w-full table-auto text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left font-medium text-gray-600">ID</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-600">Hostname</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-600">IP</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-600">User</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-600">Type</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-600">Date</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-600">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {recentData.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-4 py-2">{item.id}</td>
                                        <td className="px-4 py-2">{item.hostname || '-'}</td>
                                        <td className="px-4 py-2">{item.ip || '-'}</td>
                                        <td className="px-4 py-2">{item.username || '-'}</td>
                                        <td className="px-4 py-2">{item.type}</td>
                                        <td className="px-4 py-2">{new Date(item.created_at).toLocaleString()}</td>
                                        <td className={`px-4 py-2 font-bold ${item.status === 'Success' ? 'text-green-600' : 'text-red-600'}`}>
                                            {item.status}
                                        </td>
                                    </tr>
                                ))}
                                {recentData.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="text-center py-4 text-gray-500">
                                            No records found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

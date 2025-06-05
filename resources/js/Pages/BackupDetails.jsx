import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function BackupDetails({ id }) {
    const [backup, setBackup] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/api/admin/backup/report/${id}`)
            .then(response => response.json())
            .then(data => setBackup(data.data))
            .catch(error => console.error("Failed to fetch backup data:", error));
    }, [id]);

    if (!backup) {
        return <div className="p-6 text-gray-700">Loading...</div>;
    }

    const formatBytesToGB = (bytes) => {
        if (!bytes) return "N/A";
        return (bytes / (1024 ** 3)).toFixed(2) + " GB";
    };

    const TableRow = ({ label, value }) => (
        <tr className="border-b hover:bg-gray-50">
            <th className="px-4 py-3 font-medium text-gray-600 w-1/3">{label}</th>
            <td className="px-4 py-3">{value ?? <span className="text-gray-400 italic">N/A</span>}</td>
        </tr>
    );

    const renderDisks = (disks) => (
        <table className="min-w-full text-sm border mt-2 rounded overflow-hidden">
            <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-2 text-left">Drive</th>
                    <th className="px-4 py-2 text-left">Used</th>
                    <th className="px-4 py-2 text-left">Free</th>
                </tr>
            </thead>
            <tbody>
                {disks?.map((disk, index) => (
                    <tr key={index} className="border-t">
                        <td className="px-4 py-2">{disk.Name}</td>
                        <td className="px-4 py-2">{formatBytesToGB(disk.Used)}</td>
                        <td className="px-4 py-2">{formatBytesToGB(disk.Free)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Backup Details</h2>}>
            <Head title="Backup Details" />

            <div className="py-12">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Backup Report</h3>

                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm text-left text-gray-700 border">
                                <tbody>
                                    <TableRow label="ID" value={backup.id} />
                                    <TableRow label="Hostname" value={backup.hostname} />
                                    <TableRow label="IP Address" value={backup.ip} />
                                    <TableRow label="Username" value={backup.username} />
                                    <TableRow label="Status" value={backup.status} />
                                    <TableRow label="Server Time Zone" value={backup.server_time_zone} />
                                    <TableRow label="OS Type" value={backup.os_type} />
                                    <TableRow label="OS Version" value={backup.os_version} />
                                    <TableRow label="Backup Name" value={backup.backup_name || "N/A"} />
                                    <TableRow label="Type" value={backup.type} />
                                    <TableRow label="Created At" value={new Date(backup.created_at).toLocaleString()} />
                                    <TableRow label="Updated At" value={new Date(backup.updated_at).toLocaleString()} />
                                </tbody>
                            </table>

                            {backup.system_info && (
                                <div className="mt-8 space-y-6">
                                    <h3 className="text-xl font-semibold border-b pb-1">System Info</h3>

                                    {/* CPU Info */}
                                    <div>
                                        <h4 className="text-lg font-medium text-gray-700 mb-1">CPU</h4>
                                        <table className="w-full text-sm border rounded">
                                            <tbody>
                                                <TableRow label="Name" value={backup.system_info.cpu?.Name} />
                                                <TableRow label="Device ID" value={backup.system_info.cpu?.DeviceID} />
                                                <TableRow label="Max Clock Speed" value={`${backup.system_info.cpu?.MaxClockSpeed} MHz`} />
                                                <TableRow label="Socket Designation" value={backup.system_info.cpu?.SocketDesignation} />
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* RAM Info */}
                                    <div>
                                        <h4 className="text-lg font-medium text-gray-700 mb-1">RAM</h4>
                                        <table className="w-full text-sm border rounded">
                                            <tbody>
                                                <TableRow label="Name" value={backup.system_info.ram?.Name} />
                                                <TableRow label="Model" value={backup.system_info.ram?.Model} />
                                                <TableRow label="Primary Owner" value={backup.system_info.ram?.PrimaryOwnerName} />
                                                <TableRow label="Total Memory" value={formatBytesToGB(backup.system_info.ram?.TotalPhysicalMemory)} />
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Disk Info */}
                                    <div>
                                        <h4 className="text-lg font-medium text-gray-700 mb-1">Disks</h4>
                                        {renderDisks(backup.system_info.disks)}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 text-right">
                            <button
                                onClick={() => window.history.back()}
                                className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

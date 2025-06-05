<?php

namespace App\Http\Controllers;

use App\Models\AgentBackup;
use Illuminate\Http\Request;

class AgentBackupController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string',
            'ip' => 'required|string',
            'hostname' => 'nullable|string',
            'status' => 'required|string',
            'server_time_zone' => 'nullable|string',
            'os_type' => 'nullable|string',
            'os_version' => 'nullable|string',
            'backup_name' => 'nullable|string',
            'system_info' => 'nullable', // Expect raw JSON object from client
            'type' => 'nullable|string',
        ]);

        $backupReport = new AgentBackup([
            'hostname' => $request->input('hostname'),
            'ip' => $request->input('ip'),
            'username' => $request->input('username'),
            'status' => $request->input('status'),
            'server_time_zone' => $request->input('server_time_zone'),
            'os_type' => $request->input('os_type'),
            'os_version' => $request->input('os_version'),
            'backup_name' => $request->input('backup_name'),
            'system_info' => $request->input('system_info'), // already a JSON string from BAT script
            'type' => $request->input('type'),
        ]);

        $backupReport->save();

        return response()->json(['message' => 'Backup report stored', 'data' => $backupReport], 201);
    }

    public function show()
    {
        $report = AgentBackup::all();
        return response()->json(['message' => 'Backup report Fetched Successfully', 'data' => $report], 200);
    }

    public function backupGetById($id)
    {
        $report = AgentBackup::find($id);
        return response()->json(['message' => 'Backup report Fetched Successfully', 'data' => $report], 200);
    }

    public function restore()
    {
        $report = AgentBackup::all();
        return response()->json(['message' => 'Restore Data  rFetched Successfully', 'data' => $report], 200);
    }

    public function dashboardApi()
    {
        // Fetch all backup/restore records for this ID (or use other filter if applicable)
        $records = AgentBackup::all();

        // Count total backups and restores
        $totalBackups = $records->where('type', 'Backup')->count();
        $totalRestores = $records->where('type', 'Restore')->count();
        $sucessRate = $records->where('status', 'Success')->count();
        $failedRate = $records->where('status', 'Failed')->count();

        // Get latest 5 backups and restores
        $recentBackups = AgentBackup::where('type', 'Backup')
            ->orderBy('created_at', 'desc')
            ->limit(3)
            ->get();

        $recentRestores = AgentBackup::where('type', 'Restore')
            ->orderBy('created_at', 'desc')
            ->limit(3)
            ->get();

        // Return as JSON
        return response()->json([
            'message' => 'Dashboard data fetched successfully',
            'data' => [
                'total_backups' => $totalBackups,
                'total_restores' => $totalRestores,
                'success_rate' => $sucessRate,
                'failed_rate' => $failedRate,
                'recent_backups' => $recentBackups,
                'recent_restores' => $recentRestores
            ]
        ]);
    }
}

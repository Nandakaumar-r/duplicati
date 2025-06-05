<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\AgentBackupController;


Route::middleware('auth.php')->get('/user', function (Request $request) {
    return $request->user();
});

//Admin Tickets API
Route::prefix('admin')->group(function () {
    Route::get('/backup/report', [AgentBackupController::class, 'show']);
    Route::get('/backup/report/{id}', [AgentBackupController::class, 'BackupGetById']);
    Route::get('/restore/report', [AgentBackupController::class, 'restore']);
    Route::get('/restore/report/{id}', [AgentBackupController::class, 'restoreGetById']);
    Route::get('/dashboard-data', [AgentBackupController::class, 'dashboardApi']);

});

Route::post('/backup/report', [AgentBackupController::class, 'store']);
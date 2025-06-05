<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AgentBackup extends Model
{

    use HasFactory;

    protected $fillable = [
        'hostname',
        'ip',
        'username',
        'status',
        'backup_name',
        'server_time_zone',
        'os_type',
        'os_version',
        'system_info',
        'type',
    ];

    public $timestamps = true;

    protected $casts = [
        'system_info' => 'array',
    ];
}

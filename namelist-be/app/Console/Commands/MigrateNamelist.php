<?php

namespace App\Console\Commands;

use App\Models\Eloquent\Portal;
use App\Models\Eloquent\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class MigrateNamelist extends Command
{
    protected $signature = 'app:migrate-namelist';

    protected $description = 'Migrate Namelist';

    public function handle()
    {
        $users = DB::connection('mongodb')
            ->table('User')
            ->get();

        $teams = DB::connection('mongodb')
            ->table('Team')
            ->get();

        User::withoutEvents(function () use ($users, $teams) {
            foreach ($users as $user) {
                if (empty($user->emailAddress)) {
                    Log::warning('No email address', ['user' => $user]);

                    continue;
                }
                if (User::where('email', $user->emailAddress)->exists()) {
                    Log::warning('User already exists', ['email' => $user->emailAddress]);

                    continue;
                }

                $team = $teams->firstWhere('id', $user->team_id);
                if (! $team) {
                    Log::warning('Team not found', ['id' => $user->team_id]);

                    continue;
                }

                $user = User::forceCreate([
                    'email' => $user->emailAddress,
                    'mongodb_metadata' => $user,
                    'deleted_at' => $user->deletedAt ?? null,
                    'created_at' => $user->createdAt,
                ]);

                $portal = Portal::whereRaw(
                    "jsonb_path_exists(mongodb_metadata, '\$.team_id') AND mongodb_metadata->>'team_id' = ?",
                    [$team->id]
                )->first();

                if (! $portal) {
                    $org = $user->organizations()->create([
                        'name' => 'Default organization',
                    ]);

                    $portal = Portal::forceCreate([
                        'name' => 'Default portal',
                        'organization_id' => $org->id,
                        'mongodb_metadata' => ['team_id' => $team->id],
                        'created_at' => $team->createdAt,
                        'updated_at' => $team->updatedAt,
                    ]);
                }

                $user->organizations()->attach($portal->organization);
                $user->setCurrentPortalId($portal->id);
            }
        });
    }
}

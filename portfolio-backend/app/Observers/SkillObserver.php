<?php

namespace App\Observers;

use App\Models\Skill;
use Illuminate\Support\Facades\Cache;

class SkillObserver
{
    /**
     * Handle the Skill "created" event.
     */
    public function created(Skill $skill): void
    {
        Cache::flush();
    }

    /**
     * Handle the Skill "updated" event.
     */
    public function updated(Skill $skill): void
    {
        Cache::flush();
    }

    /**
     * Handle the Skill "deleted" event.
     */
    public function deleted(Skill $skill): void
    {
        Cache::flush();
    }

    /**
     * Handle the Skill "restored" event.
     */
    public function restored(Skill $skill): void
    {
        //
    }

    /**
     * Handle the Skill "force deleted" event.
     */
    public function forceDeleted(Skill $skill): void
    {
        //
    }
}

<?php

namespace App\Observers;

use App\Models\Experience;
use Illuminate\Support\Facades\Cache;

class ExperienceObserver
{
    /**
     * Handle the Experience "created" event.
     */
    public function created(Experience $experience): void
    {
        Cache::flush();
    }

    /**
     * Handle the Experience "updated" event.
     */
    public function updated(Experience $experience): void
    {
        Cache::flush();
    }

    /**
     * Handle the Experience "deleted" event.
     */
    public function deleted(Experience $experience): void
    {
        Cache::flush();
    }

    /**
     * Handle the Experience "restored" event.
     */
    public function restored(Experience $experience): void
    {
        //
    }

    /**
     * Handle the Experience "force deleted" event.
     */
    public function forceDeleted(Experience $experience): void
    {
        //
    }
}

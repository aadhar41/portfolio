<?php

namespace App\Observers;

use App\Models\Education;
use Illuminate\Support\Facades\Cache;

class EducationObserver
{
    /**
     * Handle the Education "created" event.
     */
    public function created(Education $education): void
    {
        Cache::flush();
    }

    /**
     * Handle the Education "updated" event.
     */
    public function updated(Education $education): void
    {
        Cache::flush();
    }

    /**
     * Handle the Education "deleted" event.
     */
    public function deleted(Education $education): void
    {
        Cache::flush();
    }

    /**
     * Handle the Education "restored" event.
     */
    public function restored(Education $education): void
    {
        //
    }

    /**
     * Handle the Education "force deleted" event.
     */
    public function forceDeleted(Education $education): void
    {
        //
    }
}

<?php

namespace App\Providers;

use App\Models\Skill;
use App\Models\Experience;
use App\Models\Education;
use App\Models\Project;
use App\Models\Profile;
use App\Models\Blog;
use App\Observers\SkillObserver;
use App\Observers\ExperienceObserver;
use App\Observers\EducationObserver;
use App\Observers\ProjectObserver;
use App\Observers\ProfileObserver;
use App\Observers\BlogObserver;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schema::defaultStringLength(191);

        Skill::observe(SkillObserver::class);
        Experience::observe(ExperienceObserver::class);
        Education::observe(EducationObserver::class);
        Project::observe(ProjectObserver::class);
        Profile::observe(ProfileObserver::class);
        Blog::observe(BlogObserver::class);
    }
}

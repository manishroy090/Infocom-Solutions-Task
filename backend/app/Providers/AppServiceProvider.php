<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\FormSubmissionRepository;
use App\Repositories\TemplatesRepository;
use App\Repositories\Interfaces\TemplatesRepositoryInterface;
use App\Repositories\Interfaces\FormSubmissionRepositoryInterface;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(FormSubmissionRepositoryInterface::class, FormSubmissionRepository::class);
        $this->app->bind(TemplatesRepositoryInterface::class, TemplatesRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}

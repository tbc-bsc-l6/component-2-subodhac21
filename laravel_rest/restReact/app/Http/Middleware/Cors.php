<?php

namespace App\Http\Middleware;

use Closure;

class Cors
{
    
    // public function handle($request, Closure $next)
    // {
    //     return $next($request)
    //         ->header('Access-Control-Allow-Origin', '*')
    //         ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    //         ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    //         ->header('Access-Control-Allow-Credentials', 'true');
    // }
    public function handle($request, Closure $next)
    {
        // \Log::info('CORS middleware is being executed.');
        $response = $next($request);

        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        return $response;
    }
}

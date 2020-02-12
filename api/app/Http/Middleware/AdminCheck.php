<?php

namespace App\Http\Middleware;
use Closure;
use Auth;
class AdminCheck
{
    public function handle($request, Closure $next)
    {   
    	if (Auth::user()) {
        return $next($request);
    }
        return response(['error' => 'Unauthorized'], 401);
    }
}
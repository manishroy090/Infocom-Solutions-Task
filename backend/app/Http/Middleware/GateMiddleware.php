<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Permission;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;




class GateMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        if(auth()->check()){
           $permissions =  Permission::whereHas('roles',function($query){
                 $query->where('roles.id',auth()->user()->role_id);
           })->get();
           foreach ($permissions as $key => $permission) {
            # code...
            Gate::define($permission->title ,fn()=>true);
           } 
        }
        return $next($request);
    }
}

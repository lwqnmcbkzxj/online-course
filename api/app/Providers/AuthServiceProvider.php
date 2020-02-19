<?php

namespace App\Providers;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\GenericUser;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Boot the authentication services for the application.
     *
     * @return void
     */
    public function boot()
    {
        // Here you may define how you wish users to be authenticated for your Lumen
        // application. The callback which receives the incoming request instance
        // should return either a User instance or null. You're free to obtain
        // the User instance via an API token or any other method necessary.

        $this->app['auth']->viaRequest('api', function ($request) {
            $res = $request->header('authorization');
            //return new GenericUser(['id' => 2, 'name' => 'Taylor']);
            if (!empty($res)) { 
                try {
                $token = explode(" ", $res)[1];  
                $set = \SimpleJWT\Keys\KeySet::createFromSecret(env('APP_KEY', false));
                $jwt = \SimpleJWT\JWT::decode($token, $set, 'HS256');
            }
            catch (\Throwable $e) {
                return null;

            }
                return new GenericUser(['id' => $jwt->getClaim('id'), 'role' => $jwt->getClaim('role')]);
            }
            return null;
        });
    }
}

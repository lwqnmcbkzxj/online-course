<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Carbon\Carbon;
$current_timestamp = Carbon::now()->timestamp; 
class LoginController extends Controller
{
    public function __construct() {
      $this->middleware('auth');
  }
    public function register(Request $request) {
       $this->validate($request, [
        'login' => 'required|string',
        'email' => 'required|email',
        'password' => 'required|string'
    ]);
       $login = $request->input('login');
       $email = $request->input('email');
       $password = Hash::make($request->input('password'));
       DB::insert('INSERT INTO users (role, email, password) VALUES (0, ?, ?)', [$email, $password]);
       return ['status' => 'ok'];
      
}

   public function login(Request $request) {
     $this->validate($request, [
        'email' => 'required|email',
        'password' => 'required|string'
    ]);
     $user_info = DB::select('SELECT id, role, password from users WHERE email = ?', [$request->input('email')]);
     if (empty($user_info)) return response(['error' => 'Invalid credentials'], 403);
     if (!Hash::check($request->input('password'), $user_info[0]->password)) return response(['error' => 'Invalid credentials'], 403);
     $headers = ['alg' => 'HS256', 'typ' => 'JWT'];
     $claims = ['iss' => 'me', 'exp' => Carbon::now()->timestamp + 36000, 'role' => $user_info[0]->role, 'id' => $user_info[0]->id];
     $set = \SimpleJWT\Keys\KeySet::createFromSecret(env('APP_KEY', false));
     $jwt = new \SimpleJWT\JWT($headers, $claims);
     return ["token" => $jwt->encode($set)];
   }

   public function resetPassword(Request $request) {
      $this->validate($request, [
        'password' => 'required|string',
    ]);
      DB::update('update users set password = ? where id = ?', [Hash::make($request->input('password')), Auth::id()]);
      return ["status" => "ok"];
   }

  
}



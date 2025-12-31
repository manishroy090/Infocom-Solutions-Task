<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
    public $code;
    public $message;

    public function register(Request $request)
    {
        $validating =   Validator::make($request->all(), [
            'name' => 'required',
            'email' => "required",
            'password' => 'required|confirmed',

        ], [
            'name.required' => "Name is required",
            'email.required' => "Email is required",
            'password.required' => "Password is required"
        ]);

        if ($validating->fails()) {
            $this->message = 422;
            return response()->json([
                'validation_error' => $validating->messages()
            ], $this->message);
        }

        try {
            $this->message = 201;
            $data = [
                'name' => $validating->validate()['name'],
                'email' => $validating->validate()['email'],
                'password' => bcrypt($validating->validate()['password']),
                'role_id' => 1
            ];
            $user =  User::create($data);
            $token =  auth('api')->login($user);
            return $this->respondWithToken($token);
        } catch (\Throwable $th) {
            $this->code = 500;
            return response()->json([
                'error' => $th->getMessage()
            ], $this->code);
        }
    }
    public function login(Request $request)
    {
        $credentials = request(['email', 'password']);
        if (! $token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $this->respondWithToken($token);
    }


    public function logout()
    {
        auth('api')->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }


    public function refresh()
    {
        return $this->respondWithToken(auth('api')->refresh());
    }

    public function me()
    {
        $user = auth('api')->user()->load('role');

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role_name' => $user->role?->name,
        ]);
    }

    protected function respondWithToken($token)
    {
       return response()
        ->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ])
        ->cookie(
            'token',       
            $token,        
            60,           
            '/',           
            'localhost',   
            false,         
            true,         
            false,
            'Lax'         
        );
    }
}

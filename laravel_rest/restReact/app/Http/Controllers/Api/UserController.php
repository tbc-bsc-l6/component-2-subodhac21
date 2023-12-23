<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Tempcart;
use App\Models\Tokenall;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function authMe(Request $request){
        $tokenTable = Tokenall::where('token_id', $request->token)->first();
        
        if($tokenTable != null){
            $user = Tokenall::find($tokenTable->id)->user->toArray();
            return response([
                'id' => $user['id'],
                'fullname' => $user['fullname'],
                'email'=> $user['email'],
                'status'=>"true",
                'image'=> 'p1.jpg',
                'type'=> $user['usertype']
            ]);
        }
        else{
            return response([
                'status'=>"false"
            ]);
        }
    }
    
    public function register(Request $request){
        // return response([
        //     'response'=> $request->email
        // ]);
        $val = $request->validate([
            'fullname'=>'required',
            'email' => 'required|email',
            'password'=>'required|confirmed'
        ]);
        $data = [
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ];
        
        $emailToken = User::where('email', $request->email)->first();
        if($emailToken){
            return response([
                'message'=> 'Email already exists',
                'status' => 'failed'
            ]);
        }
        // $token = $emailToken->createToken($request->email)->plainTextToken;
        $response = User::create([
            'fullname'=>$request->fullname,
            'email'=>$request->email,
            'password'=>bcrypt($request->password),
            'image'=>'p1.jpg',
            'usertype'=>"customer"
            // 'api_token'=> $token
        ]);
        $emailToken = User::where('email', $request->email)->first();
        $token = $emailToken->createToken($request->email)->plainTextToken;
        $table = User::where('email', $request->email)->first()->toArray();
        // User::where("email", $request->email)->update(['api_token'=> $token]);
        Tokenall::create(['user_id'=> $table['id'], 'token_id'=> $token]);
        if($request->token != ""){
            Tempcart::where("cookie_string", $request->token)->update(['cookie_string'=> 0, 'user_id'=>$table['id']]);
            
        }
        
        if($response){
            return response([
                'message'=>"User created successfully",
                'fullname'=>$request->fullname,
                'email'=>$request->email,
                'image'=>'p1.jpg',
                'api_token' => $token
                // 'token'=>$token,
            ], 200);
        }
    }

    public function login(Request $request){
        $val = $request->validate([
            'email' => 'required|email|',
            'password' => 'required',
        ]);
        // $data = [
        //     "email" => $request->email,
        //     'password'=> bcrypt($request->password)
        // ];
        // if (!Auth::attempt($data)) {
        //     return response()->json([
        //         'message' => 'Invalid login details'
        //                    ], 401);
        // }
        $emailToken = User::where('email', $request->email)->where('usertype', "customer")->first();
        if($emailToken && User::where('password', bcrypt($request->password))){
            $Usertable = User::where('email', $request->email)->first();
            if($request->token != ""){
                $productIdList = $request->proid;
                foreach($productIdList as $pro){
                    Tempcart::where(['user_id'=> $Usertable->id, "product_id" => $pro])->delete();
                }
                Tempcart::where("cookie_string", $request->token)->update(['cookie_string'=> 0, 'user_id'=> $Usertable->id]);
                
            }
            
            $id = $Usertable->id;
        $token = $emailToken->createToken($request->email)->plainTextToken;
        // Tokenall::where('user_Id',$id)->(['api_token'=> $token]);
        Tokenall::create(['user_id'=>$id, 'token_id'=>$token]);
            return response([
                'id' => $id,
                'message'=> 'User Successfully login',
                'status'=> 'true',
                'api_token' => $token,
                'fullname'=>$Usertable->fullname,
                'image' => 'p1.jpg'
            ],201);
        }
        else{
            return response([
                'message'=> "Login failed",
                'status' => 'false',
            ], 200);
        }
    }
    public function loginAdmin(Request $request){
        $val = $request->validate([
            'email' => 'required|email|',
            'password' => 'required',
        ]);
        // $data = [
        //     "email" => $request->email,
        //     'password'=> bcrypt($request->password)
        // ];
        // if (!Auth::attempt($data)) {
        //     return response()->json([
        //         'message' => 'Invalid login details'
        //                    ], 401);
        // }
        $emailToken = User::where('email', $request->email)->where('usertype', "admin")->first();
        if($emailToken && User::where('password', $request->password)){
            $Usertable = User::where('email', $request->email)->first();
            $id = $Usertable->id;
        $token = $emailToken->createToken($request->email)->plainTextToken;
        // Tokenall::where('user_Id',$id)->(['api_token'=> $token]);
        Tokenall::create(['user_id'=>$id, 'token_id'=>$token]);
            return response([
                'message'=> 'User Successfully login',
                'status'=> 'true',
                'api_token' => $token,
                'fullname'=>$Usertable->fullname,
                'image' => 'p1.jpg'
            ],201);
        }
        else{
            return response([
                'message'=> "Login failed",
                'status' => 'false',
            ], 200);
        }
    }


    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

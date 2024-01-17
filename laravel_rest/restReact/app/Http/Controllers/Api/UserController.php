<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\SampleEmail;
use App\Models\Product;
use App\Models\Tempcart;
use Illuminate\Support\Facades\Hash;
use App\Models\Tokenall;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;


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
            'email' => 'required',
            'password'=>'required'
        ]);
        $data = [
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ];
        
        $emailToken = User::where('email', $request->email)->first();
        if (!str_contains($request->email, '@') || !str_contains($request->email, '.')) {
            return response([
                'message'=> 'Email should  be a valid email',
                'status' => 'failed'
            ]);
        }
        if(strlen($request->password) < 6 || !preg_match('/[0-9]/', $request->password) || !preg_match('/[a-zA-Z]/', $request->password)){
            return response([
                'message'=> 'password should be at least of length 6 and contain a digit and an alphabet',
                'status' => 'failed'
            ]);
        }
        if($emailToken){
            return response([
                'message'=> 'Email already exists',
                'status' => 'failed'
            ]);
        }
        if($request->password_confirmation != $request->password){
            return response([
                'message'=> 'Password does not match',
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
                'id'=> $emailToken->id,
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
        if($emailToken &&  Hash::check($request->password, $emailToken->password)){
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
            'email' => 'required|',
            'password' => 'required',
        ]);
      
        $emailToken = User::where('email', $request->email)->first();
        if(!isset($emailToken)){
            return response([
                'message'=> "Login failed",
                'status' => 'false',
            ], 200);
        }
        $pass = $request->password;
        if($emailToken->usertype == "superadmin"){
            $pass = $request->password=== $emailToken->password ? true: false;
        }
        else if($emailToken->usertype == "admin"){
            $pass = Hash::check($request->password, $emailToken->password);
        }
        else{
            return response([
                'message'=> "Login failed",
                'status' => 'false',
            ], 200);
        }
        

        if($emailToken && $pass){
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
                'image' => 'p1.jpg',
                'type'=> $Usertable->usertype
            ],201);
        }
        else{
            return response([
                'message'=> "Login failed",
                'status' => 'false',
            ], 200);
        }
    }

    public function get_users_admin(){
        return response([
            'users'=> User::where("usertype", 'admin')->get()->toArray()
        ]);
    }

    public function get_users_customer(Request $request){
        $perPage = $request->query('per_page', 10);

        $users = User::where("usertype", 'customer')->paginate($perPage);
        return response([
            'users'=> $users->items(),
            'pagination' => [
                'total' => $users->total(),
                'per_page' => $users->perPage(),
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'from' => $users->firstItem(),
                'to' => $users->lastItem(),
            ],
        ]);
    }

    public function get_user_admin($id){
        return response([
            'user'=> User::where("id", $id)->first()
        ]);
    }

    public function create_user_admin(Request $request){
        $fullname = $request->fullname;
        $email = $request->email;
        $usertype = $request->usertype;
        $password = bcrypt($request->password);
        $emailToken = User::where('email', $request->email)->first();
        if (!str_contains($request->email, '@') || !str_contains($request->email, '.')) {
            return response([
                'message'=> 'Email should  be a valid email',
                'status' => 'failed'
            ]);
        }
        if(strlen($request->password) < 6 || !preg_match('/[0-9]/', $request->password) || !preg_match('/[a-zA-Z]/', $request->password)){
            return response([
                'message'=> 'password should be at least of length 6 and contain a digit and an alphabet',
                'status' => 'failed'
            ]);
        }
        if($emailToken){
            return response([
                'message'=> 'Email already exists',
                'status' => 'failed'
            ]);
        }
        if($request->password_confirmation != $request->password){
            return response([
                'message'=> 'Password does not match',
                'status' => 'failed'
            ]);
        }
        $result = User::create(['fullname'=> $fullname, 'email'=> $email, 'usertype'=> $usertype, 'password'=> $password]);
        return response([
            'status'=> true,
        ]);
    }

    public function edit_user_admin(Request $request){
        $id = $request->id;
        $email = $request->email;
        $fullname = $request->fullname;
        $usertype = $request->usertype;
        $repeatEmail = User::where('id',"!=", $id)->where("email", $email)->first();
        if($repeatEmail){
            return response([
                "status"=> "failed",
                'message'=> "email exists already!!"
            ]);
        }
        else{
            User::where("id", $id)->update(['fullname'=> $fullname, 'email'=> $email, 'usertype'=>$usertype]);
            return response([
                'status'=> true,
                'message'=> "Users details successfully updated!!"
            ]);
        }
    }

    public function reset_user_admin(Request $request){
        $id = $request->id;
        $newPass = $request->newpassword;
        $oldpass = $request->oldpassword;
        
        $user = User::where("id", $id)->first();
        $ifPasswordMatch = Hash::check( $oldpass, $user->password);
        if($ifPasswordMatch){
            User::where("id", $id)->update(["password"=> bcrypt($newPass)]);
            return response([
                'status'=> true
            ]);
        }
        else{
            return response([
                'status'=> false
            ]);
        }
    }

    public function delete_user_admin(Request $request, $id){
        User::where("id", $id)->delete();
        return response([
            'status'=> true
        ]);
    }

    public function delete_user_customer(Request $request, $id){
        User::where("id", $id)->delete();
        return response([
            'status'=> true
        ]);
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

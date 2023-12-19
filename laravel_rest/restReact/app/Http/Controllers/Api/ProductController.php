<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Tempcart;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    //
    public function add_product(Request $request){
        $data = [
            'name'=>$request->pname,
            'image'=>"",
            'description'=>$request->pdesc,
            'quantity'=>$request->pquant,
            'price'=>$request->pprice,
            'category_id'=>$request->pcat,
            'discount_id'=>$request->pdiscount
        ];
        $result = $result = Product::create($data);
        if($result){
            return response([
                'status'=> true,
                'id' => $result->id
            ]);
        }
        return response([
            'status'=> false
        ]);

    }
    public function add_product_image(Request $request){
        if($request->has('image')){
            $image = $request->file('image');
            $name = time(). '.'. $image->getClientOriginalExtension();
            $image->move('images/', $name);
            $id = $request->id;
            Product::where("id",$id)->update(['image'=>$name]);
            return response([
                'status'=>true
            ]);
        }
    }
    public function get_products(){
        $arr = Product::orderBy("id", "desc")->get()->toArray();
        $result = [];
        foreach($arr as $key => $ar){
            $result[$key] = $ar;
            $all_pro = Product::find($ar['id'])->get_category->toArray();
            $result[$key]['cat_name'] = $all_pro['name'];
        }
        return response(['arr'=> $result]);
    }
    public function get_single_product(Request $request){
        $id = $request->id;
        $arr = Product::find($id)->toArray();
        return response(['product'=>$arr]);
    }
    public function update_product(Request $request){
       
        $data = [
            'name'=>$request->input("pname"),
            'description'=>$request->pdesc,
            'quantity'=>$request->pquant,
            'price'=>$request->pprice,
            'category_id'=>$request->pcat,
            'discount_id'=>$request->pdiscount
        ];
        // return response(['result' => $data]);
        $id = $request->pid;
        $result = Product::where("id", $id)->update($data);
        if($request->pimage != ""){
            $image = $request->file('pimage');
            $name = time(). '.'. $image->getClientOriginalExtension();
            $image->move('images/', $name);
            Product::where("id",$id)->update(['image'=>$name]);
            return response([
                'status'=>true
            ]);
        }

        return response([
            'status'=>true
        ]);
       
    }
    public function delete_product(Request $request){
        $result = Product::where("id", $request->id)->delete();
        return $result ? response([
            'status'=>true
        ]) : response([
            'status' =>false
        ]);
    }

    public function add_product_to_cart_named(Request $request){
        $pro_id = $request->pro_id;
        $quantity = $request->quantity;
        $customer_id = $request->cust_id;
        if(count(Tempcart::where(['product_id'=> $pro_id, 'user_id'=> $customer_id])->get()->toArray())>0){
            Tempcart::where(['product_id'=> $pro_id, 'user_id' => $customer_id])->update(['quantity'=> $quantity]);
            return response(['status'=> true, 'userid'=> $customer_id]);
        }
        else{
            Tempcart::create(['product_id'=> $pro_id, 'user_id'=> $customer_id, 'quantity'=> $quantity, 'cookie_string'=> "0"]);
            return response(['status'=>true, 'userid'=> $customer_id]);
        }
    }
    public function add_product_to_cart_nameless(Request $request){
        $pro_id = $request->pro_id;
        $quantity = $request->quantity;
        $cookie_token = $request->token;
        if(count(Tempcart::where(['product_id'=> $pro_id, 'cookie_string' => $cookie_token])->get()->toArray())>0){
            Tempcart::where(['product_id'=> $pro_id, 'cookie_string' => $cookie_token])->update(['quantity'=> $quantity]);
            return response(['status'=> true, 'token'=> $cookie_token]);
        }
        else{
            $token = Str::random(40); 
            $hashedToken = hash('sha1', $token);
            Tempcart::create(['product_id'=> $pro_id, 'user_id'=> '0', 'quantity'=> $quantity, 'cookie_string'=> $hashedToken]);
            return response(['status'=>true, 'token'=> $hashedToken]);
        }
    }
}

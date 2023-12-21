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
        $add = $request->add;
        if(count(Tempcart::where(['product_id'=> $pro_id, 'user_id'=> $customer_id])->get()->toArray())>0){
            if($add != "one"){
                Tempcart::where(['product_id'=> $pro_id, 'user_id' => $customer_id])->update(['quantity'=> $quantity]);     
                $result = Product::where(['id', $pro_id])->get()->toArray();
                $cart_pro = Tempcart::where(['product_id'=> $pro_id, 'user_id' => $customer_id])->get()->toArray();
                $category = Product::where('id', $pro_id)->get()[0]->get_category->get();
                return response(['repeat'=> false, 'status'=> true, 'userid'=> $customer_id, 'result'=> $result, 'cart_pr'=> $cart_pro, 'category'=> $category]);
            }
            else{
                return response(['repeat'=> true, 'status'=> true, 'userid'=> $customer_id, 'result'=> $result, 'cart_pr'=> $cart_pro, 'category'=> $category]);
            }
           
        }
        else if(count(Tempcart::where(['user_id'=> $customer_id])->get()->toArray())>0){
            Tempcart::create(['product_id'=>$pro_id, 'user_id'=>$customer_id, 'quantity'=>$quantity]);
            $result = Product::where(['id', $pro_id])->get()->toArray();
            $cart_pro = Tempcart::where(['product_id'=> $pro_id, 'user_id' => $customer_id, 'quantity'=> $quantity])->get()->toArray();
            $category = Product::where('id', $pro_id)->get()[0]->get_category->get();

            return response(['repeat'=> false, 'status'=>true, 'userid'=> $customer_id ,'result'=>$result, 'cart_pr'=> $cart_pro, 'category'=> $category]);
        }
        else{
            Tempcart::create(['product_id'=> $pro_id, 'user_id'=> $customer_id, 'quantity'=> $quantity, 'cookie_string'=> "0"]);
            $result = Product::where(['id', $pro_id])->get()->toArray();
            $cart_pro = Tempcart::where(['product_id'=> $pro_id, 'user_id' => $customer_id, 'quantity'=> $quantity, 'cookie_string'=>'0'])->get()->toArray();
            $category = Product::where('id', $pro_id)->get()[0]->get_category->get();

            return response(['repeat'=> false,'status'=>true, 'userid'=> $customer_id, 'result'=> $result, 'cart_pr'=> $cart_pro, 'category'=> $category]);
        }
    }
    public function add_product_to_cart_nameless(Request $request){
        $pro_id = $request->pro_id;
        $quantity = $request->quantity;
        $cookie_token = $request->token;
        $add = $request->add;

        if(count(Tempcart::where(['product_id'=> $pro_id, 'cookie_string' => $cookie_token])->get()->toArray())>0){
            if($add != "one"){
                Tempcart::where(['product_id'=> $pro_id, 'cookie_string' => $cookie_token])->update(['quantity'=> $quantity]);
                $result = Product::where('id', $pro_id)->get()->toArray();
                $cart_pro = Tempcart::where(['product_id'=> $pro_id, 'cookie_string'=> $cookie_token])->get()->toArray();
                $category = Product::where('id', $pro_id)->get()[0]->get_category->get();
                return response(['repeat'=> false, 'status'=> true, 'token'=> $cookie_token ,'result'=>$result , 'cart_pr'=> $cart_pro, 'category'=> $category]);
            }
            else{
                return response(['repeat'=> true, 'status'=> true, 'token'=> $cookie_token]);
            }
        }
        else if(count(Tempcart::where(['cookie_string'=> $cookie_token])->get()->toArray())>0){
            Tempcart::create(['product_id'=>$pro_id, 'user_id'=>'0', 'quantity'=>$quantity, 'cookie_string'=>$cookie_token]);
            $result = Product::where('id', $pro_id)->get()->toArray();
            $cart_pro = Tempcart::where(['product_id'=> $pro_id, 'cookie_string'=> $cookie_token, 'user_id'=> '0', 'quantity'=> $quantity])->get()->toArray();
            $category = Product::where('id', $pro_id)->get()[0]->get_category->get();

            return response(['repeat'=> false, 'status'=>true, 'token'=> $cookie_token ,'result'=>$result , 'cart_pr'=> $cart_pro, 'category'=> $category]);
        }
        else{
            $token = Str::random(40); 
            $hashedToken = hash('sha1', $token);
            Tempcart::create(['product_id'=> $pro_id, 'user_id'=> '0', 'quantity'=> $quantity, 'cookie_string'=> $hashedToken]);
            $result = Product::where('id', $pro_id)->get()->toArray();
            $cart_pro = Tempcart::where(['product_id'=> $pro_id, 'cookie_string'=> $hashedToken, 'user_id'=> '0', 'quantity'=> $quantity])->get()->toArray();
            $category = Product::where('id', $pro_id)->get()[0]->get_category->get();

            return response(['repeat'=> false, 'status'=>true, 'token'=> $hashedToken, 'result'=> $result , 'cart_pr'=> $cart_pro, 'category'=> $category]);
        }
    }

    public function products_num_cart_by_id(Request $request){
        $id = $request->id;
        $products = count(Tempcart::where('user_id', $id)->get());
        return response(['num'=> $products]);
    }

    public function products_num_cart_by_token(Request $request){
        $token = $request->token;
        $products = count(Tempcart::where('cookie_string', $token)->get());
        return response(['num'=> $products]);
    }

    public function products_from_cart_by_id(Request $request){
        $id = $request->id;
        $products = Tempcart::where('user_id', $id)->get();
        $cart_pr = $products->toArray();
        $pro = array();
        $category = array();
        foreach($products as $key => $product){
            $pro[$key] = $product->cartProducts->toArray();
            $category[$key] = $product->cartProducts->get_category->toArray();
        }
        
        return response(['product'=> $pro, 'cart_pr'=> $cart_pr, 'category'=> $category]);
    }

    public function products_from_cart_by_token(Request $request){
        $token = $request->token;
        $products = Tempcart::where('cookie_string', $token)->get();
        $pro = array();
        $cart_pr = $products->toArray();
        $category = array();
        foreach($products as $key => $product){
            $pro[$key] = $product->cartProducts->toArray();
            $category[$key] = $product->cartProducts->get_category->toArray();;
        }
        
        return response(['product'=> $pro, 'cart_pr'=> $cart_pr , 'category'=> $category]);
    }
    public function delete_cart_pro_byuser(Request $request, $id){
        $result = Tempcart::where('id', $id)->delete();
        return response(['status'=> $result]);
    }
    public function delete_products_from_token(Request $request, $id){
        $result = Tempcart::where('id', $id)->delete();
        return response(['status'=> $result]);
    }
}

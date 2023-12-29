<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Orderitem;
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
        $token = $request->token;
        $loginid = $request->loginid;
        if($token != "" && $this->findIfFoundInCartFromToken($token, $id)){
            $product = Tempcart::where(['cookie_string'=> $token, 'product_id'=> $id])->get();
            $pro = $product[0]->cartProducts->toArray();
            $category = $product[0]->cartProducts->get_category->toArray();
            return response(['product'=>$pro, 'cart_pr'=> $product[0], 'category'=> $category, 'result'=> 'token']);

        }
        else if($loginid != "" && $this->findIfFoundInCartFromId($loginid, $id)){
            $product = Tempcart::where(['user_id'=> $loginid, 'product_id'=> $id])->get();
            $pro = $product[0]->cartProducts->toArray();
            $category = $product[0]->cartProducts->get_category->toArray();
            return response(['product'=>$pro, 'cart_pr'=> $product[0], 'category'=> $category, 'result'=> 'user_id']);

        }
        else{
            $arr = Product::find($id)->toArray();
            $category = Product::find($id)->get_category->toArray();
            return response(['product'=>$arr, 'category'=> $category, 'result'=> 'none']);
        }
    }
    public function findIfFoundInCartFromToken($cart_token, $id){
        $ifPresent = Tempcart::where(['cookie_string'=> $cart_token, 'product_id'=> $id])->get();
        if(count($ifPresent)>0){
            return true;
        }
        else{
            return false;
        }
    }
    public function findIfFoundInCartFromId($user_id, $id){
        $ifPresent = Tempcart::where(['user_id'=> $user_id, 'product_id'=> $id])->get();
        if(count($ifPresent)>0){
            return true;
        }
        else{
            return false;
        }
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
                $result = Product::where(['id'=> $pro_id])->get()->toArray();
                $cart_pro = Tempcart::where(['product_id'=> $pro_id, 'user_id' => $customer_id])->get()->toArray();
                $category = Product::where('id', $pro_id)->get()[0]->get_category->get();
                return response(['repeat'=> false, 'status'=> true, 'userid'=> $customer_id, 'result'=> $result, 'cart_pr'=> $cart_pro, 'category'=> $category]);
            }
            else{
                return response(['repeat'=> true, 'status'=> true, 'userid'=> $customer_id]);
            }
           
        }
        else if(count(Tempcart::where(['user_id'=> $customer_id])->get()->toArray())>0){
            Tempcart::create(['product_id'=>$pro_id, 'user_id'=>$customer_id, 'quantity'=>$quantity, 'cookie_string'=> '0']);
            $result = Product::where(['id'=> $pro_id])->get()->toArray();
            $cart_pro = Tempcart::where(['product_id'=> $pro_id, 'user_id' => $customer_id, 'quantity'=> $quantity])->get()->toArray();
            $category = Product::where('id', $pro_id)->get()[0]->get_category->get();

            return response(['repeat'=> false, 'status'=>true, 'userid'=> $customer_id ,'result'=>$result, 'cart_pr'=> $cart_pro, 'category'=> $category]);
        }
        else{
            Tempcart::create(['product_id'=> $pro_id, 'user_id'=> $customer_id, 'quantity'=> $quantity, 'cookie_string'=> "0"]);
            $result = Product::where(['id'=> $pro_id])->get()->toArray();
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

    public function update_tempcart_by_id(Request $request){
        $id = $request->id;
        $quant = $request->quant;
        $result = Tempcart::where("id", $id)->update(['quantity'=> $quant]);
        return response([
            'status' => true,
        ]);        
    }

    public function add_products_to_order(Request $request){
        $address = $request->address;
        $date = $request->date;
        $login = $request->login;
        $remaks = $request->remarks;
        $cartItems = Tempcart::where('user_id', $login)->get()->toArray();
        $token = Str::random(5); 
        // $hashedToken = hash('sha1', $token);
        $insertedRow = Order::create(['user_id'=>$login, 'address'=> $address, 'delivery_date'=> $date, 'status'=> 'new', 'remarks'=> $remaks, 'order_no'=> $token]);
        foreach($cartItems as $item){
            Orderitem::create(['product_id'=> $item['product_id'], 'order_id'=> $insertedRow->id, 'quantity'=> $item['quantity']]);
        }
        Tempcart::where("user_id", $login)->delete();
        return response([
            'status'=> true,
            'order_id'=> $insertedRow->id
        ]);
    }

    public function get_filter_products(Request $request){
        $catid = $request->catid;
        $price = $request->price;
        $discount = $request->discount;
        $date = $request->date;

        $query = Product::query();

        if ($price) {
            foreach($price as $p){
                if($p[0] != "0" && $p[1] != "0")
                    $query->orwhereBetween('price', [$p[0], $p[1]]);
            }
        }
        if ($discount) {
            foreach($discount as $d){
                if($d[0] != "0" && $d[1] != "0")
                    $query->orwhereBetween('discount_id', [$d[0], $d[1]]);
            }
        }
        if ($date) {
            foreach($date as $d){
                $date = date("Y-m-d");  
                $first_date = strtotime($date);
                $second_date = strtotime("-$d[0] day", $first_date);
                if(isset($d[0]))
                    $query->orwhereBetween('created_at', [date("Y-m-d", $second_date), $date]);
            }
        }

        if (isset($catid)) {
            $query->where('category_id', $catid);
        }

        // Get the filtered results
        $results = $query->get();
        return json_encode([
            'result' => $results
        ]);
    }

}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;

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
            'name'=>$request->pname,
            'description'=>$request->pdesc,
            'quantity'=>$request->pquant,
            'price'=>$request->pprice,
            'category_id'=>$request->pcat,
            'discount_id'=>$request->pdiscount
        ];
        $id = $request->pid;
        $result = Product::where("id", $id)->update($data);
        return $result ? response([
            'status'=>true
        ]) : response([
            'status' =>false
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
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Orderitem;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    //
    public function get_orders_by_id(Request $request, $id){
        // $id = $request->id;
        $data = Order::where('id', $id)->get();
        $itemsData = Orderitem::where('order_id', $id)->get();
        $items = array();
        $cat = array();
        foreach($itemsData as $key=> $item){
            $pid = $item['product_id'];
            $items[$key] = Product::where("id", $pid)->first();
            $cat[$key] = Product::where("id", $pid)->first()->get_category->name;
        }
        return response([
            'status'=> true,
            'orders'=> $data,
            'items'=> $items,
            'order_item'=>$itemsData,
            'cat' => $cat
        ]);

    }
}

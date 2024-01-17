<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Orderitem;
use App\Models\Payment;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    //
    public function get_orders_by_id(Request $request, $id){
        // $id = $request->id;
        $data = Order::where(['id'=> $id])->where("status", "!=", "Paid")->get();
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

    public function get_total_orders($id){
        $data = Order::where(['user_id'=> $id])->where("status", "!=", "Paid")->get();

       
        return response([
            // 'ordersitem'=> $orderitems,
            'orders'=> $data,
        ]);
    }

    public function get_orders_all_admin(){
        $ordersChild = Orderitem::all();
        $orders = array();
        foreach($ordersChild as $key => $order){
            $orderid = $order->order_id;
            $product_id = $order->product_id;
            $orders[$key]['products'] = Product::where("id", $product_id)->first();
            $orders[$key]['order_Main'] = Order::where("id", $orderid)->first();
            // $orderitems[$key]['product'] = Product::where("id", $order->getChildOrder->product_id);
        }
        return response([
            // 'ordersitem'=> $orderitems,
            'orders'=> $orders,
            'orderItem'=> $ordersChild
        ]);
    }

    function change_order_status(Request $request){
        $id = $request->id;
        $value = $request->value;
        Order::where("id", $id)->update(['status'=> $value]);
    }

    function do_payment(Request $request){
        $id = $request->id;
        $price = $request->price;
        Payment::create(['order_id'=> $id, 'totalpaid'=> $price]);
        Order::where("id", $id)->update(['status'=> "Paid"]);
    }
}

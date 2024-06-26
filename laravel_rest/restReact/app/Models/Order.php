<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $table = "orders";
    protected $fillable = [
        'user_id', 'address', 'order_no', 'delivery_date', 'status', 'remarks'
    ];

    protected function getChildOrder(){
        return $this->hasMany("App\Models\Orderitem", "id", "order_id");
    }
}

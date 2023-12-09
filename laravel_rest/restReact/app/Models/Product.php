<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = "products";
    protected $fillable = [
        'name', 'image', 'description', 'quantity', 'price', 'category_id', 'discount_id'
    ];
    protected function get_category(){
        return $this->belongsTo("App\Models\Category", "category_id", 'id');
    }
}

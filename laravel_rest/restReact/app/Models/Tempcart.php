<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tempcart extends Model
{
    use HasFactory;
    protected $table = 'tempcart';
    protected $fillable = [
        'user_id', 'cookie_string', 'quantity', 'product_id'
    ];
}

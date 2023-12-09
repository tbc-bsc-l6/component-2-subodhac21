<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tokenall extends Model
{
    use HasFactory;
    protected $table = "tokenall";
    protected $fillable = [
        'user_id','token_id'
    ];
    public function user(){
        return $this->belongsTo('App\Models\User');
    }
}

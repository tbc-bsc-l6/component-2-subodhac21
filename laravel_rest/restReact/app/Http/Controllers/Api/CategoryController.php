<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    //
    public function get_categories(Request $request){
        $allcat = Category::all();
        return response([
            'allcat'=> $allcat
        ]);
    }
    public function add_category(Request $request){
        $alldata = [
            'name'=> $request->name,
            'description' => $request->description
        ];
        $id = Category::create($alldata);
        if($id){
            return response([
                'status' => 'true'
            ]);
        }
        else{
            return response([
                'status' => 'false'
            ]);
        }
    }
}

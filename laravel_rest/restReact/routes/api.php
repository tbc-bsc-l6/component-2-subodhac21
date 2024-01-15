<?php

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\MailController;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post("/register", [UserController::class, 'register']);

Route::post("/login", [UserController::class, 'login']);
Route::post("/loginAdmin", [UserController::class, 'loginAdmin']);


Route::post("/authme", [UserController::class, 'authMe']);


Route::group(['middleware' => 'superadminonly'], function () {

    Route::get("/get_users_admin", [UserController::class, 'get_users_admin']);

    Route::get("/get_user_admin/{id}", [UserController::class, 'get_user_admin']);


    Route::post("/create_user_admin", [UserController::class, 'create_user_admin']);

    Route::put("/edit_user_admin", [UserController::class, 'edit_user_admin']);

    Route::put("/reset_user_admin", [UserController::class, 'reset_user_admin']);

    Route::delete("/delete_user_admin/{id}", [UserController::class, 'delete_user_admin']);

    Route::get("/get_users_customer", [UserController::class, 'get_users_customer']);

    Route::delete("/delete_user_customer/{id}", [UserController::class, 'delete_user_admin']);

});



//products routes

Route::group(['middleware' => 'checkToken'], function () {
    Route::post("/add_product", [ProductController::class, "add_product"]);
});
Route::post("/add_product_image", [ProductController::class, "add_product_image"]);

Route::post("update_product", [ProductController::class, "update_product"]);

Route::delete("/delete_product/{id}", [ProductController::class, "delete_product"]);


Route::get("/get_products", [ProductController::class, "get_products"]);
Route::post("/get_single_product", [ProductController::class, "get_single_product"]);

Route::post("/add_product_to_cart_named", [ProductController::class, "add_product_to_cart_named"]);
Route::post("/add_product_to_cart_nameless", [ProductController::class, "add_product_to_cart_nameless"]);
Route::post("/products_from_cart_by_id", [ProductController::class, "products_from_cart_by_id"]);
Route::post("/products_from_cart_by_token", [ProductController::class, "products_from_cart_by_token"]);

Route::post("/products_num_cart_by_id", [ProductController::class, "products_num_cart_by_id"]);
Route::post("/products_num_cart_by_token", [ProductController::class, "products_num_cart_by_token"]);

Route::delete("/delete_cart_pro_byuser/{id}", [ProductController::class, "delete_cart_pro_byuser"]);
Route::delete("/delete_products_from_token/{id}", [ProductController::class, "delete_products_from_token"]);


Route::put("/update_tempcart_by_id", [ProductController::class, "update_tempcart_by_id"]);

Route::post("/add_products_to_order", [ProductController::class, "add_products_to_order"]);

Route::post("/get_filter_products", [ProductController::class, "get_filter_products"]);

Route::post("/get_searched_product", [ProductController::class, "get_searched_product"]);


//get categories

Route::get("/get_categories", [CategoryController::class, 'get_categories']);
Route::post("/add_category", [CategoryController::class, 'add_category']);

// Route::post("/register", [UserController::class, 'register']);

//user Routes


//order routes

Route::get("/get_orders_by_id/{id}", [OrderController::class, "get_orders_by_id"]);

Route::get("/get_total_orders/{id}", [OrderController::class, "get_total_orders"]);

Route::get("/get_orders_all_admin", [OrderController::class, "get_orders_all_admin"]);

Route::put("/change_order_status", [OrderController::class, "change_order_status"]);

Route::post("/do_payment", [OrderController::class, "do_payment"]);



//mail controller



Route::post("/contactMe", [MailController::class, "contactMe"]);

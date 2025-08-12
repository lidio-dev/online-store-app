<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderDetailController;

Route::apiResources([
    'categories' => CategoryController::class,
    'customers'  => CustomerController::class,
    'employees'  => EmployeeController::class,
    'products'   => ProductController::class,
]);

Route::apiResource('order-details', OrderDetailController::class);
Route::apiResource('orders', OrderController::class);
Route::post('/orders-with-details', [OrderController::class, 'storeWithDetails']);
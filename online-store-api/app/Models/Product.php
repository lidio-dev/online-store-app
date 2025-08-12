<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model {
    protected $primaryKey = 'product_id';
    protected $fillable = ['name', 'price', 'stock', 'category_id'];

    public function category() {
        return $this->belongsTo(Category::class, 'category_id', 'category_id');
    }

    public function orderDetails() {
        return $this->hasMany(OrderDetail::class, 'product_id', 'product_id');
    }
}
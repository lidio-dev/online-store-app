<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model {
    protected $primaryKey = 'order_id';
    protected $fillable = ['order_date', 'customer_id', 'employee_id'];

    public function customer() {
        return $this->belongsTo(Customer::class, 'customer_id', 'customer_id');
    }

    public function employee() {
        return $this->belongsTo(Employee::class, 'employee_id', 'employee_id');
    }

    public function orderDetails() {
        return $this->hasMany(OrderDetail::class, 'order_id', 'order_id');
    }
}
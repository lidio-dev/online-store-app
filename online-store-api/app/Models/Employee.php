<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model {
    protected $primaryKey = 'employee_id';
    protected $fillable = ['name', 'email', 'position'];

    public function orders() {
        return $this->hasMany(Order::class, 'employee_id', 'employee_id');
    }
}
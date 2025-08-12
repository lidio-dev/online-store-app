<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Customer::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|unique:customers,email',
            'phone'   => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255'
        ]);

        $customer = Customer::create($validated);

        return response()->json($customer, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $customer = Customer::find($id);

        if (!$customer) {
            return response()->json(['message' => 'Cliente no encontrado'], 404);
        }

        return response()->json($customer, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $customer = Customer::find($id);

        if (!$customer) {
            return response()->json(['message' => 'Cliente no encontrado'], 404);
        }

        $validated = $request->validate([
            'name'    => 'sometimes|required|string|max:255',
            'email'   => 'sometimes|required|email|unique:customers,email,' . $id . ',customer_id',
            'phone'   => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255'
        ]);

        $customer->update($validated);

        return response()->json($customer, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $customer = Customer::find($id);

        if (!$customer) {
            return response()->json(['message' => 'Cliente no encontrado'], 404);
        }

        $customer->delete();

        return response()->json(['message' => 'Cliente eliminado correctamente'], 200);
    }
}

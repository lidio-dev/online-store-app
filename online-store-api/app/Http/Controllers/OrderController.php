<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use App\Models\OrderDetail;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Incluye relaciones con cliente y empleado
        return response()->json(
            Order::with(['customer', 'employee'])->get(),
            200
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeWithDetails(Request $request)
    {
        $validated = $request->validate([
            'order_date'  => 'required|date',
            'customer_id' => 'required|exists:customers,customer_id',
            'employee_id' => 'required|exists:employees,employee_id',
            'details'     => 'required|array|min:1',
            'details.*.product_id' => 'required|exists:products,product_id',
            'details.*.quantity'   => 'required|integer|min:1',
        ]);

        $order = Order::create([
            'order_date'  => $validated['order_date'],
            'customer_id' => $validated['customer_id'],
            'employee_id' => $validated['employee_id'],
        ]);

        foreach ($validated['details'] as $detail) {
            $product = Product::find($detail['product_id']);

            if ($detail['quantity'] > $product->stock) {
                return response()->json([
                    'message' => "Stock insuficiente para el producto {$product->name}"
                ], 400);
            }

            // Descontar stock
            $product->stock -= $detail['quantity'];
            $product->save();

            $order->orderDetails()->create([
                'product_id' => $detail['product_id'],
                'quantity'   => $detail['quantity'],
                'unit_price' => $product->price,
            ]);
        }

        // Cargar relaciones y calcular total
        $order->load(['customer', 'employee', 'orderDetails.product']);
        $total = $order->orderDetails->sum(function($detail) {
            return $detail->quantity * $detail->unit_price;
        });

        // Adjuntar el total al objeto que se envía
        $order->total = $total;

        return response()->json($order, 201);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'order_date'  => 'required|date',
            'customer_id' => 'required|exists:customers,customer_id',
            'employee_id' => 'required|exists:employees,employee_id',
        ]);

        $order = Order::create($validated);

        // Cargar relaciones opcionalmente
        $order->load(['customer', 'employee']);

        return response()->json($order, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = Order::with(['customer', 'employee'])->find($id);

        if (!$order) {
            return response()->json(['message' => 'Orden no encontrada'], 404);
        }

        return response()->json($order, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Orden no encontrada'], 404);
        }

        $validated = $request->validate([
            'order_date'  => 'sometimes|required|date',
            'customer_id' => 'sometimes|required|exists:customers,customer_id',
            'employee_id' => 'sometimes|required|exists:employees,employee_id'
        ]);

        $order->update($validated);

        return response()->json($order, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Orden no encontrada'], 404);
        }

        $order->delete();

        return response()->json(['message' => 'Orden eliminada correctamente'], 200);
    }
}

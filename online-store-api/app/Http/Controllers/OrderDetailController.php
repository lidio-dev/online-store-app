<?php

namespace App\Http\Controllers;

use App\Models\OrderDetail;
use Illuminate\Http\Request;

class OrderDetailController extends Controller
{
    /**
     * Mostrar todos los detalles de orden.
     */
    public function index()
    {
        // Incluimos las relaciones para mostrar info de order y product
        $details = OrderDetail::with(['order', 'product'])->get();
        return response()->json($details, 200);
    }

    /**
     * Crear un nuevo detalle de orden.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'order_id'   => 'required|exists:orders,order_id',
            'product_id' => 'required|exists:products,product_id',
            'quantity'   => 'required|integer|min:1',
            'unit_price' => 'required|numeric|min:0'
        ]);

        $detail = OrderDetail::create($validated);

        return response()->json($detail, 201);
    }

    /**
     * Mostrar un detalle específico.
     */
    public function show(string $id)
    {
        $detail = OrderDetail::with(['order', 'product'])->find($id);

        if (!$detail) {
            return response()->json(['message' => 'Detalle de orden no encontrado'], 404);
        }

        return response()->json($detail, 200);
    }

    /**
     * Actualizar un detalle de orden.
     */
    public function update(Request $request, string $id)
    {
        $detail = OrderDetail::find($id);

        if (!$detail) {
            return response()->json(['message' => 'Detalle de orden no encontrado'], 404);
        }

        $validated = $request->validate([
            'order_id'   => 'sometimes|required|exists:orders,order_id',
            'product_id' => 'sometimes|required|exists:products,product_id',
            'quantity'   => 'sometimes|required|integer|min:1',
            'unit_price' => 'sometimes|required|numeric|min:0'
        ]);

        $detail->update($validated);

        return response()->json($detail, 200);
    }

    /**
     * Eliminar un detalle de orden.
     */
    public function destroy(string $id)
    {
        $detail = OrderDetail::find($id);

        if (!$detail) {
            return response()->json(['message' => 'Detalle de orden no encontrado'], 404);
        }

        $detail->delete();

        return response()->json(['message' => 'Detalle de orden eliminado correctamente'], 200);
    }
}

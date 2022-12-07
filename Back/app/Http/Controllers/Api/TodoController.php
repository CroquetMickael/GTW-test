<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $todos = Todo::all();

        return response()->json([
            'todos' => $todos
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $todo = Todo::create($request->all());
        Log::info("A user have create a todo item titled: {$todo->title}");

        return response()->json([
            "message" => "Todo created successfully!",
            'todo'=>$todo
        ], 200);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Todo $todo)
    {
        $todo = Todo::update($request->all());

        Log::log("INFO", "A user have updated a todo item titled: {$todo->title}");

        return response()->json([
            "message"=> "Todo updated successfully",
            'todo'=>$todo
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();

        Log::log("INFO", "A user have deleted a todo item titled: {$todo->title}");

        return response()->json([
            'message'=> 'Todo deleted sucessfully!'
        ], 200);
    }
}

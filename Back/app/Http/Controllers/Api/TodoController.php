<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class TodoController extends Controller
{


    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $todos = $user->todos;
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
        $userId = Auth::id();
        $todo = Todo::create([
            "title"=>$request->title,
            "description"=>$request->description,
            "user_id"=>$userId
        ]);
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
     * @param  \App\Models\Todo  $idTodo
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $idTodo)
    {
        $todos = $request
            ->user()
            ->todos;

        $todo = $todos->where('id', $idTodo)->first();


        if($todo){
            $todo->update($request->all());

            Log::log("INFO", "A user have updated a todo item titled: {$todo->title}");

            return response()->json([
                "message"=> "Todo updated successfully",
                'todo'=>$todo
            ], 200);
        }

        return response()->json([
            "message"=> "It's not your todo item",
        ], 401);

    }

    /**
     * Remove the specified resource from storage.
     *
      * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Todo  $idTodo
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Request $request, int $idTodo)
    {
        $todos = $request
        ->user()
        ->todos;

    $todo = $todos->where('id', $idTodo)->first();

    if($todo){
        $todo->delete();

        Log::log("INFO", "A user have deleted a todo item titled: {$todo->title}");

        return response()->json([
            'message'=> 'Todo deleted sucessfully!'
        ], 200);
    }
    return response()->json([
        "message"=> "It's not your todo item",
    ], 401);
    }
}

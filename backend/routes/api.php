<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RecordController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/users/create', [UserController::class,'create'])->name("users.create");
Route::post('/users/login', [UserController::class,'login'])->name("users.login");
Route::post('/users/getUsersInMyCompany', [UserController::class,'getUsersInMyCompany'])->name("users.getUsersInMyCompany");
Route::post('/users/addUser', [UserController::class,'addUser'])->name("users.addUser");
Route::post('/users/deleteUser', [UserController::class,'deleteUser'])->name("users.deleteUser");

Route::post('/records/getUserRecords', [RecordController::class,'getUserRecords'])->name("records.getUserRecords");
Route::post('/records/getUserLastRecord', [RecordController::class,'getUserLastRecord'])->name("records.getUserLastRecord");
Route::post('/records/enter', [RecordController::class,'enter'])->name("records.enter");
Route::post('/records/exit', [RecordController::class,'exit'])->name("records.exit");




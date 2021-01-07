<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Cookie;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
/**
 * login the user to the system
 *
 * @param String   email
 * @param String   password
 * 
 * @return clientId,token if the credentials are valid
 */ 

 /**
  * @param Integer clientId
  * @param String token
  * @return true if the token is valid for the user
  */
    public static function isTokenValid(Request $request){
        $user = User::whereId($request->get("clientId"))->first();

        if($user->token == $request->get("token")){
            return true;
        }
        return false;
    }

    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            $message = "פרטים לא תקינים";
            return ApiController::errorResponse($message);
        }

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user(); 
            $token = Str::random(64);
            $user->token = $token;
            $user->save();

            $minutes = 60*24*365;
            Cookie::make('token', $token, $minutes);
            Cookie::make('clientId', $user->id, $minutes);

            $isCompanyOwner = false;
            if($user->owners_of_company == 1){
                $isCompanyOwner = true;
            }

            $data = ['token'=>$token,'clientId'=>$user->id,'name'=>$user->name,'isCompanyOwner'=>$isCompanyOwner,'companyName'=>$user->company_name];
            return ApiController::successResponse($data);
        }

        $message = "קרתה תקלה";
        return ApiController::errorResponse($message);


    }

    public function create(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|unique:users|email',
        ]);

        if ($validator->fails()) {
            $message = "אימייל לא תקין";
            return ApiController::errorResponse($message);
        }


        $isSuccess = User::create([
        'owners_of_company' => $request->get('userType'),
        'name'      => $request->get('name'),
        'email'     => $request->get('email'),
        'password'  => bcrypt($request->get('password')),
        'token' => '',
        'company_name' => $request->get("companyName")
        ]);


        if($isSuccess){
            return ApiController::successResponse($isSuccess);
        }else{
            $message = "תקלה בבסיס הנתונים";
        }

        return ApiController::errorResponse($message);

    }

    public function addUser(Request $request){
        $validator = Validator::make($request->all(), [
            'clientId' => 'required|numeric',
            'token' => 'required',
        ]);

        if ($validator->fails()) {
            $message = "פרטים לא תקינים";
            return ApiController::errorResponse($message);
        }

        $isUserTokenValid = UserController::isTokenValid($request);

        if(!$isUserTokenValid){
            $message = "טוקן לא מתאים למשתמש";
            return ApiController::errorResponse($message);
        }

        $validator = Validator::make($request->all(), [
            'email' => 'required|unique:users|email',
        ]);

        if ($validator->fails()) {
            $message = "אימייל לא תקין";
            return ApiController::errorResponse($message);
        }

        $isSuccess = User::create([
        'owners_of_company' => 0,
        'name'      => $request->get('name'),
        'email'     => $request->get('email'),
        'password'  => bcrypt($request->get('password')),
        'token' => '',
        'company_name' => "",
        'belongs_to_company' => $request->get("clientId")
        ]);


        if($isSuccess){
            $user = User::where("email",$request->get("email"))->first();
            return ApiController::successResponse($user);
        }else{
            $message = "תקלה בבסיס הנתונים";
        }

        return ApiController::errorResponse($message);

    }

    public function deleteUser(Request $request){
        $validator = Validator::make($request->all(), [
            'clientId' => 'required|numeric',
            'token' => 'required',
        ]);

        if ($validator->fails()) {
            $message = "פרטים לא תקינים";
            return ApiController::errorResponse($message);
        }

        $isUserTokenValid = UserController::isTokenValid($request);

        if(!$isUserTokenValid){
            $message = "טוקן לא מתאים למשתמש";
            return ApiController::errorResponse($message);
        }

        $user = User::whereId($request->get("userId"))->first();
        if($user->belogs_to_company != $clientId){
            $message = "המשתמש לא שייך לחברה זו";
            return ApiController::errorResponse($message);
        }

        $user->isDeleted = 1;
        $isSuccess = $user->save();

        if($isSuccess){
            return ApiController::successResponse($user);
        }else{
            $message = "תקלה בבסיס הנתונים";
        }

        return ApiController::errorResponse($message);
    }

    
    /**
     * get users in my company
     */
    public function getUsersInMyCompany(Request $request){
        $validator = Validator::make($request->all(), [
            'clientId' => 'required|numeric',
            'token' => 'required',
        ]);

        if ($validator->fails()) {
            $message = "פרטים לא תקינים";
            return ApiController::errorResponse($message);
        }

        $isUserTokenValid = UserController::isTokenValid($request);

        if(!$isUserTokenValid){
            $message = "טוקן לא מתאים למשתמש";
            return ApiController::errorResponse($message);
        }

        $users = User::where("belongs_to_company",$request->get("clientId"))
        ->where("is_deleted",0)->get();

    
        if($users){
            return ApiController::successResponse($users);
        }else{
            $message = "תקלה בבסיס הנתונים";
        }

        return ApiController::errorResponse($message);
    }
    
}

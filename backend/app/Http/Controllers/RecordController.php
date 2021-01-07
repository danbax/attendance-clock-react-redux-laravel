<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Record;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Cookie;
use App\Http\Controllers\Controller;
use Carbon\Carbon;

class RecordController extends Controller
{
    /**
     * get records for user
     */
    public function getUserRecords(Request $request){
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

        if($request->get("clientId")!=$request->get("userId")){
            $user = User::find($request->get("userId"))->first();
            if($user->belongs_to_company != $request->get("clientId")){
                $message = "אין לך הרשאות לצפות ברשומות אלו";
                return ApiController::errorResponse($message);
            }
        }
        

        $records = Record::select('start','end')->where("user_id",$request->get("clientId"))->orderByRaw('id desc')->get();
        $recordsWithDuration = [];
        foreach($records as $key=>$record){
            $start = Carbon::parse($record->start);
            $end = Carbon::parse($record->end);
            $diff = $start->diff($end)->format('%H:%I');;

            $record->duration = $diff;
            if($record->end == null){
                $record->duration = "";
            }
            $recordsWithDuration[] = $record;
        }

        return ApiController::successResponse($recordsWithDuration);

    }

    
    /**
     * get last record for user
     */
    public function getUserLastRecord(Request $request){
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
        

        $records = Record::where("user_id",$request->get("clientId"))->latest("id")->first();
        return ApiController::successResponse($records);
    }

    
    /**
     * get records for user
     */
    public function enter(Request $request){
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

        $isSuccess = Record::create([
            'user_id'      => $request->get('clientId'),
            'start'     => date('Y-m-d H:i:s'),
            'end'  => null,
            'comments'  => "",
            ]);
    
    
            if($isSuccess){
                return ApiController::successResponse($isSuccess);
            }else{
                $message = "תקלה בבסיס הנתונים";
            }
    
            return ApiController::errorResponse($message);
    }

    
    /**
     * get records for user
     */
    public function exit(Request $request){
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

        $record = Record::where("user_id",$request->get("clientId"))->latest("id")->first();
    
        if($record->end == null){
            $record->end = date('Y-m-d H:i:s');
        }
        $isSuccess = $record->save();
    
        if($isSuccess){
            return ApiController::successResponse($record);
        }else{
            $message = "תקלה בבסיס הנתונים";
        }

        return ApiController::errorResponse($message);
    }

    
}

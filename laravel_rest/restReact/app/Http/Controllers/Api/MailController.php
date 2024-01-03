<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Mail\SampleEmail;
use Mail;

class MailController extends Controller
{
    //
    public function contactMe(Request $request){
        $mailData = [
            'name'=> $request->name,
            'email'=> $request->email,
            'message'=> $request->message
        ];
        Mail::to($request->email)->send(new SampleEmail($mailData));
        return response([
            'status'=> 'successfull',
        ]);
    }
}

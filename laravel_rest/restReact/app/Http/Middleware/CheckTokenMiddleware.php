<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Tokenall;


class CheckTokenMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->hasHeader('Authorization')) {
            $token = $request->header('Authorization');

            // Validate the token (customize this part based on your token validation logic)
            if ($this->isValidToken($token)) {
                return $next($request);
            }
        }

        // If the token is missing or invalid, return a response indicating unauthorized access
        return response()->json(['error' => 'Unauthorized'], 401);
    }
    private function isValidToken($token)
    {
        $result = TokenAll::where("token_id", $token)->first();
        if($result){
            return true;
        }
        // Customize this part based on your token validation logic
        // Example: Check if the token is valid using your authentication logic
        return false;
    }
}

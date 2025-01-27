<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Eloquent\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    public function getAppleRedirect()
    {
        return Socialite::driver('sign-in-with-apple')
            ->redirect();
    }

    public function getGoogleRedirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function googleMobileSignin(Request $request)
    {
        $token = $request->input('access_token');
        $oauthUser = Socialite::driver('google')->userFromToken($token);

        $this->processUser($oauthUser, 'google_id');

        return response()->noContent(200);
    }

    public function getGoogleCallback()
    {
        $oauthUser = Socialite::driver('google')->user();

        $this->processUser($oauthUser, 'google_id');

        return redirect(env('FE_BASE_PATH'));
    }

    public function getAppleCallback()
    {
        $oauthUser = Socialite::driver('sign-in-with-apple')->user();

        $this->processUser($oauthUser, 'apple_id');

        return redirect(env('FE_BASE_PATH'));
    }

    private function processUser($oauthUser, $idField)
    {
        $user = User::where('email', $oauthUser->email)->first();

        if (! $oauthUser) {
            $user = User::forceCreate([
                'first_name' => $oauthUser->name,
                'email' => $oauthUser->email,
                $idField => $oauthUser->id,
            ]);
        } else {
            $user->{$idField} = $oauthUser->id;
            $user->save();
        }

        Auth::login($user);
    }
}

<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    public function getGoogleRedirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function getGoogleCallback()
    {
        $googleUser = Socialite::driver('google')->user();
        $user = User::where('email', $googleUser->email)->first();

        // if the user was already created first without useing
        // google sign in don't allow them to login with google sign in
        // they will need to use thir initial login method (ie. user/password)
        // In the future we can direct the user to a page to confirm their password
        // and link the accounts
        if ($user && $user->google_id != $googleUser->id) {
            return redirect(env('FE_BASE_PATH').'/login?loginError=GoogleSignInAccountExists');
        }

        if (! $user) {
            $user = User::unguarded(function () use ($googleUser) {
                return User::create([
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
                    'google_id' => $googleUser->id,
                ]);
            });
        }

        Auth::login($user);

        return redirect(env('FE_BASE_PATH'));
    }
}

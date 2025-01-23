<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Eloquent\User;
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
        // if ($user && $user->google_id != $googleUser->id) {
        //     return redirect(env('FE_BASE_PATH').'/login?loginError=GoogleSignInAccountExists');
        // }

        // UPDATE: Allowing users to link accounts during migration period (2025-01-23)

        if (! $user) {
            $user = User::unguarded(function () use ($googleUser) {
                return User::create([
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
                    'google_id' => $googleUser->id,
                ]);
            });
        } else {
            $user->google_id = $googleUser->id;
            $user->save();
        }

        Auth::login($user);

        return redirect(env('FE_BASE_PATH'));
    }

    public function getAppleRedirect()
    {
        return Socialite::driver('sign-in-with-apple')
            ->redirect();
    }

    public function getAppleCallback()
    {
        $appleUser = Socialite::driver('sign-in-with-apple')->user();

        dd($appleUser);
        $user = User::where('email', $appleUser->email)->first();

        // if the user was already created first without useing
        // google sign in don't allow them to login with google sign in
        // they will need to use thir initial login method (ie. user/password)
        // In the future we can direct the user to a page to confirm their password
        // and link the accounts
        // if ($user && $user->google_id != $googleUser->id) {
        //     return redirect(env('FE_BASE_PATH').'/login?loginError=GoogleSignInAccountExists');
        // }

        // UPDATE: Allowing users to link accounts during migration period (2025-01-23)

        if (! $user) {
            $user = User::forceCreate([
                'name' => $appleUser->name,
                'email' => $appleUser->email,
                'apple_id' => $appleUser->id,
            ]);
        } else {
            $user->apple_id = $appleUser->id;
            $user->save();
        }

        Auth::login($user);

        return redirect(env('FE_BASE_PATH'));
    }
}

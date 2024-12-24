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
        $user = User::where('google_id', $googleUser->id)
            ->where('email', $googleUser->email)
            ->first();

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

<?php

namespace App\Http\Controllers;

class AppUserController extends Controller
{
    public function show($distinctId)
    {
        return authPortal()->fetchAppUser($distinctId);
    }
}

<?php

use Illuminate\Support\Facades\Auth;

function authPortal(): ?App\Models\Eloquent\Portal
{
    return Auth::guard('portal')->user();
}

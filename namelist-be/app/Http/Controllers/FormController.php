<?php

namespace App\Http\Controllers;

use App\Models\Eloquent\Portal;

class FormController extends Controller
{
    public function index(Portal $portal)
    {
        $forms = $portal->forms;

        return $forms;
    }
}

<?php

namespace App\Http\Controllers\Objects;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contacts\ContactRequest;
use App\Models\Objects\Contact;
use App\Models\Portal;

class ContactsController extends Controller
{
    public function index(Portal $portal)
    {
        return $portal->contacts()->paginate();
    }

    public function store(Portal $portal, ContactRequest $request)
    {
        $object = $portal->contacts()->create();
    }

    public function show(Portal $portal, Contact $contact)
    {
        return $contact;
    }

    public function destroy(Portal $portal, Contact $contact)
    {
        $contact->delete();
    }

    public function restore(Portal $portal, Contact $contact)
    {
        $contact->restore();
    }
}

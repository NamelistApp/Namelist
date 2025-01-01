<?php

namespace App\Http\Controllers\Objects;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contacts\ContactRequest;
use App\Models\Enum\ObjectTypeId;
use App\Models\Objects\Contact;
use App\Models\Portal;
use App\Models\PropertyDefinition;
use Illuminate\Support\Facades\DB;

class ContactsController extends Controller
{
    public function index(Portal $portal)
    {
        return $portal->contacts()->with('properties')->paginate();
    }

    public function store(Portal $portal, ContactRequest $request)
    {
        $propertyKeys = collect($request->validated())
            ->filter(function ($value, $key) {
                return $value !== null;
            })
            ->keys()
            ->toArray();

        return DB::transaction(function () use ($portal, $propertyKeys, $request) {
            $contact = $portal->contacts()->create();
            $propertiesToSet = PropertyDefinition::for(ObjectTypeId::Contact, $propertyKeys)->get();

            foreach ($propertiesToSet as $property) {
                $contact->properties()->forceCreate([
                    'property_definition_id' => $property->id,
                    'name' => $property->name,
                    'value' => $request->validated($property->name),
                ]);
            }

            return $contact;
        });
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

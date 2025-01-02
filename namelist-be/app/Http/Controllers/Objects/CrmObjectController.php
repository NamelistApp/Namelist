<?php

namespace App\Http\Controllers\Objects;

use App\Http\Controllers\Controller;
use App\Http\Requests\Crm\CrmObjectRequest;
use App\Models\CrmObject;
use App\Models\ObjectType;
use App\Models\Portal;
use App\Models\PropertyDefinition;
use Illuminate\Support\Facades\DB;

class CrmObjectController extends Controller
{
    public function index(Portal $portal, ObjectType $objectType)
    {
        return $portal
            ->crmObjects()
            ->where('object_type_id', $objectType->id)
            ->with('properties')
            ->paginate();
    }

    public function store(Portal $portal, ObjectType $objectType, CrmObjectRequest $request)
    {
        // @davidmoreen get all property keys from request that are not null
        $propertyKeys = collect($request->validated())
            ->reject(fn ($value) => $value === null)
            ->keys()
            ->toArray();

        return DB::transaction(function () use ($portal, $objectType, $propertyKeys, $request) {
            $crmObject = $portal->crmObjects()->create();
            $propertiesToSet = PropertyDefinition::for($objectType, $propertyKeys)->get();

            foreach ($propertiesToSet as $property) {
                $crmObject->properties()->forceCreate([
                    'property_definition_id' => $property->id,
                    'name' => $property->name,
                    'value' => $request->validated($property->name),
                ]);
            }

            return $crmObject;
        });
    }

    public function show(Portal $portal, CrmObject $crmObject)
    {
        return $crmObject;
    }

    public function destroy(Portal $portal, CrmObject $crmObject)
    {
        $crmObject->delete();
    }

    public function restore(Portal $portal, CrmObject $crmObject)
    {
        $crmObject->restore();
    }
}

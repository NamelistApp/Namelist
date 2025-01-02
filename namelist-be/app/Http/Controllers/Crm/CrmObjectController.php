<?php

namespace App\Http\Controllers\Crm;

use App\Http\Controllers\Controller;
use App\Http\Requests\Crm\CrmObjectCreateRequest;
use App\Models\CrmObject;
use App\Models\ObjectType;
use App\Models\Portal;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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

    public function store(Portal $portal, ObjectType $objectType, CrmObjectCreateRequest $request)
    {
        return DB::transaction(function () use ($portal, $objectType, $request) {
            $crmObject = $portal->crmObjects()->forceCreate([
                'object_type_id' => $objectType->id,
            ]);
            $properties = $objectType->propertyDefinitions;

            foreach ($properties as $property) {
                $propertySetValue = $request->validated('properties.'.$property->name);
                Log::debug('propertySetValue', [$property->name => $propertySetValue]);

                // if the propertySetValue is null we can skip b/c if passed validation it is not a required property
                if ($propertySetValue) {
                    $crmObject->properties()->forceCreate([
                        'property_definition_id' => $property->id,
                        'portal_id' => $portal->id,
                        'object_type_id' => $objectType->id,
                        'name' => $property->name,
                        'value' => $propertySetValue,
                    ]);
                }
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

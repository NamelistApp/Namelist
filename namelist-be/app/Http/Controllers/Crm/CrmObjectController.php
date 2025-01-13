<?php

namespace App\Http\Controllers\Crm;

use App\Http\Controllers\Controller;
use App\Http\Requests\Crm\CrmObjectCreateRequest;
use App\Models\Eloquent\CrmObject;
use App\Models\Eloquent\CrmObjectType;
use App\Models\Eloquent\Portal;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CrmObjectController extends Controller
{
    public function index(Portal $portal, CrmObjectType $objectType)
    {
        return $portal
            ->crmObjects()
            ->where('crm_object_type_id', $objectType->id)
            ->paginate();
    }

    public function store(Portal $portal, CrmObjectType $objectType, CrmObjectCreateRequest $request)
    {
        return DB::transaction(function () use ($portal, $objectType, $request) {
            $crmObject = $portal->crmObjects()->forceCreate([
                'crm_object_type_id' => $objectType->id,
            ]);
            $properties = $objectType->propertyDefinitions;

            foreach ($properties as $property) {
                $propertySetValue = $request->validated('properties.'.$property->key);
                Log::debug('propertySetValue', [$property->key => $propertySetValue]);

                // if the propertySetValue is null we can skip b/c if passed validation it is not a required property
                if ($propertySetValue) {
                    $crmObject->properties()->forceCreate([
                        'crm_property_definition_id' => $property->id,
                        'portal_id' => $portal->id,
                        'crm_object_type_id' => $objectType->id,
                        'name' => $property->name,
                        'key' => $property->key,
                        'value' => $propertySetValue,
                    ]);
                }
            }

            return $crmObject;
        });
    }

    public function show(Portal $portal, CrmObjectType $objectType, CrmObject $crmObject)
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

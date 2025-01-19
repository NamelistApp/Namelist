<?php

namespace App\Actions\Crm;

use App\Http\Requests\Crm\CrmObjectCreateRequest;
use App\Models\Eloquent\CrmObject;
use App\Models\Eloquent\CrmObjectType;
use App\Models\Eloquent\Portal;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CrmObjectAction
{
    public static function create(Portal $portal, CrmObjectType $objectType, CrmObjectCreateRequest $request): CrmObject
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
}

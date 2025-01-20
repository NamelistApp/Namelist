<?php

namespace App\Actions\Crm;

use App\Models\Eloquent\CrmObject;
use App\Models\Eloquent\CrmObjectType;
use App\Models\Eloquent\Portal;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CrmObjectAction
{
    public static function create(Portal $portal, CrmObjectType $objectType, array $properties): CrmObject
    {
        return DB::transaction(function () use ($portal, $objectType, $properties) {
            $crmObject = $portal->crmObjects()->forceCreate([
                'crm_object_type_id' => $objectType->id,
            ]);
            $propertyDefinitions = $objectType->propertyDefinitions;

            foreach ($propertyDefinitions as $property) {
                $propertySetValue = data_get($properties, 'properties.'.$property->key);
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

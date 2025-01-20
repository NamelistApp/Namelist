<?php

namespace App\Actions\Crm;

use App\Models\Eloquent\CrmObject;
use App\Models\Eloquent\CrmObjectType;
use App\Models\Eloquent\Portal;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CrmObjectAction
{
    public static function create(Portal $portal, CrmObjectType $objectType, array $requestProperties): CrmObject
    {
        return DB::transaction(function () use ($portal, $objectType, $requestProperties) {
            $propertyDefinitions = $objectType->propertyDefinitions;
            $properties = [];

            foreach ($propertyDefinitions as $property) {
                $propertySetValue = data_get($requestProperties, 'properties.'.$property->key);
                Log::debug('propertySetValue', [$property->key => $propertySetValue]);

                // if the propertySetValue is null we can skip b/c if passed validation it is not a required property
                if ($propertySetValue) {
                    $properties[$property->key] = $propertySetValue;
                }
            }

            $crmObject = $portal->crmObjects()->forceCreate([
                'crm_object_type_id' => $objectType->id,
                'properties' => $properties,
            ]);

            return $crmObject;
        });
    }
}

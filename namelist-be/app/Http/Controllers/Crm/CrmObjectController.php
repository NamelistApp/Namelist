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
            $properties = $objectType->propertyDefinitions;
            $objectProperties = $properties->mapWithKeys(function ($property) use ($request) {
                $propertySetValue = $request->validated('properties.'.$property->name);
                Log::debug('propertySetValue', [$property->name => $propertySetValue]);

                return $propertySetValue ? [$property->name => $propertySetValue] : [];
            })->toArray();

            return $portal->crmObjects()->forceCreate([
                'crm_object_type_id' => $objectType->id,
                'properties' => $objectProperties,
            ]);
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

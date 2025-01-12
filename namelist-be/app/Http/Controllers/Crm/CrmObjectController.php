<?php

namespace App\Http\Controllers\Crm;

use App\Http\Controllers\Controller;
use App\Http\Requests\Crm\CrmObjectCreateRequest;
use App\Models\CrmObject;
use App\Models\CustomFieldEntry;
use App\Models\ObjectType;
use App\Models\Team;
use Illuminate\Support\Facades\Log;

class CrmObjectController extends Controller
{
    public function index(Team $team, ObjectType $objectType)
    {
        return $team
            ->crmObjects()
            ->where('object_type_id', $objectType->id)
            ->paginate();
    }

    public function store(Team $team, ObjectType $objectType, CrmObjectCreateRequest $request)
    {
        $crmObject = $team->crmObjects()->forceCreate([
            'objectType' => $objectType->id,
        ]);
        $properties = $objectType->customFields;

        foreach ($properties as $property) {
            $propertySetValue = $request->validated('properties.'.$property->name);
            Log::debug('propertySetValue', [$property->name => $propertySetValue]);

            // if the propertySetValue is null we can skip b/c if passed validation it is not a required property
            if ($propertySetValue) {
                $crmObject->properties()->attach(new CustomFieldEntry([
                    'property_definition_id' => $property->id,
                    'team_id' => $team->id,
                    'object_type_id' => $objectType->id,
                    'name' => $property->name,
                    'value' => $propertySetValue,
                ]));
            }
        }

        return $crmObject;
    }

    public function show(Team $team, ObjectType $objectType, CrmObject $crmObject)
    {
        return $crmObject;
    }

    public function destroy(Team $team, CrmObject $crmObject)
    {
        $crmObject->delete();
    }

    public function restore(Team $team, CrmObject $crmObject)
    {
        $crmObject->restore();
    }
}

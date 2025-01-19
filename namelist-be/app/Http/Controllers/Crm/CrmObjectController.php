<?php

namespace App\Http\Controllers\Crm;

use App\Actions\Crm\CrmObjectAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Crm\CrmObjectCreateRequest;
use App\Models\Eloquent\CrmObject;
use App\Models\Eloquent\CrmObjectType;
use App\Models\Eloquent\Portal;

class CrmObjectController extends Controller
{
    public function index(Portal $portal, CrmObjectType $objectType)
    {
        return $portal
            ->crmObjects()
            ->where('crm_object_type_id', $objectType->id)
            ->orderBy('created_at', 'desc')
            ->paginate();
    }

    public function store(Portal $portal, CrmObjectType $objectType, CrmObjectCreateRequest $request)
    {
        return CrmObjectAction::create($portal, $objectType, $request);
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

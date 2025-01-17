<?php

namespace App\Http\Controllers;

use App\Http\Requests\FormStatsRequest;
use App\Models\Eloquent\Event;
use App\Models\Eloquent\Objects\Form;
use App\Models\Eloquent\Portal;
use Carbon\Carbon;

class FormController extends Controller
{
    public function index(Portal $portal)
    {
        return $portal->forms()->paginate();
    }

    public function show(Portal $portal, Form $form)
    {
        return $form;
    }

    public function stats(Portal $portal, Form $form, FormStatsRequest $request)
    {
        $startDate = (new Carbon($request->validated('startDate')))->startOfDay();
        $endDate = (new Carbon($request->validated('endDate')))->endOfDay();

        $viewCount = Event::where('name', '$form_viewed')
            ->whereRaw("properties->>'\$form_id' = ?", [$form->id])
            ->whereBetween('timestamp', [$startDate, $endDate])
            ->count();
        $submissionCount = Event::where('name', '$form_submitted')
            ->whereRaw("properties->>'\$form_id' = ?", [$form->id])
            ->whereBetween('timestamp', [$startDate, $endDate])
            ->count();
        $chart = Event::selectRaw("
                TO_CHAR(timestamp, 'Mon DD') as date,
                COUNT(CASE WHEN name = '\$form_viewed' THEN 1 END) AS \"Views\",
                COUNT(CASE WHEN name = '\$form_submitted' THEN 1 END) AS \"Submissions\",
                COALESCE(
                    (COUNT(CASE WHEN name = '\$form_submitted' THEN 1 END)::float / NULLIF(COUNT(CASE WHEN name = '\$form_viewed' THEN 1 END), 0)) * 100,
                    0
                )::integer AS \"Conversion Rate\"
            ")
            ->whereBetween('timestamp', [$startDate, $endDate])
            ->groupByRaw('date')
            ->get();

        return [
            'start_date' => $startDate,
            'end_date' => $endDate,
            'view_count' => $viewCount,
            'submission_count' => $submissionCount,
            'chart' => $chart,
        ];
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\FormStatsRequest;
use App\Models\Eloquent\Event;
use App\Models\Eloquent\Objects\Form;
use App\Models\Eloquent\Portal;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

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
        Log::debug('request', $request->all());
        $startDate = (new Carbon($request->validated('startDate')));
        $endDate = (new Carbon($request->validated('endDate')));
        Log::debug('after carbon', [$startDate, $endDate]);

        $eventQuery = Event::whereRaw("properties->>'\$form_id' = ?", [$form->id])
            ->whereBetween('timestamp', [$startDate, $endDate]);

        $counts = $eventQuery->selectRaw('
                COUNT(CASE WHEN name = ? THEN 1 END) AS views,
                COUNT(CASE WHEN name = ? THEN 1 END) AS submissions',
            ['$form_viewed', '$form_submitted']
        )->first();
        $conversionRate = $counts->views > 0
            ? round(($counts->submissions / $counts->views) * 100)
            : 0;
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
            'start_date' => $startDate->format('Y-m-d'),
            'end_date' => $endDate->format('Y-m-d'),
            'view_count' => $counts->views,
            'submission_count' => $counts->submissions,
            'conversion_rate' => $conversionRate,
            'chart' => $chart,
        ];
    }
}

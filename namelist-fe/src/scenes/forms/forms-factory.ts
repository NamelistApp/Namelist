import dayjs from 'dayjs'
import { FormStats, FormStatsResponse } from "./data/form-models"

export class FormFactory {
    static makeFormStats(previousStats: FormStatsResponse, currentStats: FormStatsResponse): FormStats {
        const diffDays = dayjs(currentStats.start_date).diff(dayjs(previousStats.start_date), 'day')
        return {
            start_date: currentStats.start_date,
            end_date: currentStats.end_date,
            submission_count: currentStats.submission_count,
            view_count: currentStats.view_count,
            prev_submission_count: previousStats.submission_count,
            prev_view_count: previousStats.view_count,
            prev_conversion_rate: previousStats.conversion_rate,
            submissions_count_delta: Math.round(currentStats.submission_count > 0 ? ((currentStats.submission_count - previousStats.submission_count) / currentStats.submission_count) * 100 : 0),
            view_count_delta: Math.round(currentStats.view_count > 0 ? ((currentStats.view_count - previousStats.view_count) / currentStats.view_count) * 100 : 0),
            conversion_rate: currentStats.conversion_rate,
            conversion_rate_delta: Math.round(currentStats.conversion_rate > 0 ? ((currentStats.conversion_rate - previousStats.conversion_rate) / currentStats.conversion_rate) * 100 : 0),
            timespan: `${diffDays} day${diffDays > 1 ? 's' : ''}`,
            chart: currentStats.chart,
        }
    }
}
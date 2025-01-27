import dayjs from 'dayjs'

export type DateRange = [Date, Date]

export function humanFriendlyDiff(from: dayjs.Dayjs | string | Date, to: dayjs.Dayjs | string | Date): string {
    const diff = dayjs(to).diff(dayjs(from), 'seconds')
    return humanFriendlyDuration(diff)
}

export function humanFriendlyDuration(
    d: string | number | null | undefined,
    {
        maxUnits,
        secondsPrecision,
        secondsFixed,
    }: { maxUnits?: number; secondsPrecision?: number; secondsFixed?: number } = {}
): string {
    // Convert `d` (seconds) to a human-readable duration string.
    // Example: `1d 10hrs 9mins 8s`
    if (d === '' || d === null || d === undefined || maxUnits === 0) {
        return ''
    }
    d = Number(d)
    if (d < 0) {
        return `-${humanFriendlyDuration(-d)}`
    }
    if (d === 0) {
        return `0s`
    }
    if (d < 1) {
        return `${Math.round(d * 1000)}ms`
    }
    if (d < 60) {
        if (secondsPrecision != null) {
            return `${parseFloat(d.toPrecision(secondsPrecision))}s` // round to s.f. then throw away trailing zeroes
        }
        return `${parseFloat(d.toFixed(secondsFixed ?? 0))}s` // round to fixed point then throw away trailing zeroes
    }

    const days = Math.floor(d / 86400)
    const h = Math.floor((d % 86400) / 3600)
    const m = Math.floor((d % 3600) / 60)
    const s = Math.round((d % 3600) % 60)

    const dayDisplay = days > 0 ? days + 'd' : ''
    const hDisplay = h > 0 ? h + 'h' : ''
    const mDisplay = m > 0 ? m + 'm' : ''
    const sDisplay = s > 0 ? s + 's' : hDisplay || mDisplay ? '' : '0s'

    let units: string[] = []
    if (days > 0) {
        units = [dayDisplay, hDisplay].filter(Boolean)
    } else {
        units = [hDisplay, mDisplay, sDisplay].filter(Boolean)
    }
    return units.slice(0, maxUnits ?? undefined).join(' ')
}

export function humanFriendlyDate(
    date: dayjs.Dayjs | Date | string | null | undefined,
    formatDate = 'MMMM DD, YYYY'
): string {
    return humanFriendlyDetailedTime(date, formatDate, '')
}

export function humanFriendlyDetailedTime(
    date: dayjs.Dayjs | Date | string | null | undefined,
    formatDate = 'MMMM DD, YYYY',
    formatTime = 'h:mm:ss A'
): string {
    if (!date) {
        return 'Never'
    }
    const parsedDate = dayjs(date)
    const today = dayjs().startOf('day')
    const yesterday = today.clone().subtract(1, 'days').startOf('day')
    if (parsedDate.isSame(dayjs(), 'm')) {
        return 'Just now'
    }
    let formatString: string
    if (parsedDate.isSame(today, 'd')) {
        formatString = `[Today] ${formatTime}`
    } else if (parsedDate.isSame(yesterday, 'd')) {
        formatString = `[Yesterday] ${formatTime}`
    } else {
        formatString = `${formatDate} ${formatTime}`
    }
    return parsedDate.format(formatString)
}

export function valueOrEmpty(value: any | null | undefined, defaultValue = '—'): string {
    if (value === null || value === undefined) {
        return defaultValue
    }
    return value
}
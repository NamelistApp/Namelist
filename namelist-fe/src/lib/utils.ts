import dayjs from 'dayjs'

export type DateRange = [Date, Date]

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
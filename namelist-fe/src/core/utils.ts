// https://stackoverflow.com/questions/25421233/javascript-removing-undefined-fields-from-an-object
export function objectClean<T extends Record<string | number | symbol, unknown>>(obj: T): T {
    const response = { ...obj }
    Object.keys(response).forEach((key) => {
        if (response[key] === undefined) {
            delete response[key]
        }
    })
    return response
}

export function filterRecord<T>(record: Record<string, T>, keys: string[]): Record<string, T> {
    return Object.fromEntries(
        Object.entries(record).filter(([key]) => keys.includes(key))
    );
}
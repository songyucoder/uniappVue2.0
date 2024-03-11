export const searchParams = (params) => {
    if (typeof params === 'undefined') {
        params = {}
    }

    const search = {}
    for (const key of Object.keys(params)) {
        if (key === 'pageIndex' || key === 'pageSize') {
            search[key] = params[key]
            continue
        }
        const value = params[key]
        const valueType = typeof value
        if (valueType === 'undefined' || (valueType === 'string' && value.length === 0)) {
            continue
        }
        search[key] = params[key]
    }

    return search
}

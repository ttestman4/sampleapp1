export function isUndefined(value: any) { return typeof value === 'undefined'; }

export function isDefined(value: any) { return typeof value !== 'undefined'; }

export function isObject(value: any) {
    // http://jsperf.com/isobject4
    return value !== null && typeof value === 'object';
}

export function isString(value: any) { return typeof value === 'string'; }

export function isNumber(value: any) { return typeof value === 'number'; }

export function isDate(value: any) {
    return Object.toString.call(value) === '[object Date]';
}

export function isArray(arr: any) {
    return Array.isArray(arr) || arr instanceof Array;
}

export function isError(value: any) {
    const tag = Object.toString.call(value);
    switch (tag) {
        case '[object Error]': return true;
        case '[object Exception]': return true;
        case '[object DOMException]': return true;
        default: return value instanceof Error;
    }
}

export function isFunction(value: any) { return typeof value === 'function'; }

export function isRegExp(value: any) {
    return Object.toString.call(value) === '[object RegExp]';
}

export function isWindow(obj: any) {
    return obj && obj.window === obj;
}

export function isFile(obj: any) {
    return Object.toString.call(obj) === '[object File]';
}

export function isFormData(obj: any) {
    return Object.toString.call(obj) === '[object FormData]';
}

export function isBlob(obj: any) {
    return Object.toString.call(obj) === '[object Blob]';
}

export function isBoolean(value: any) {
    return typeof value === 'boolean';
}

import TypeChecker from './TypeChecker';
export const parseQuery = queryString => {
    const query = {};
    if (!queryString) return query;
    const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split('=');
        if (query[decodeURIComponent(pair[0])]) {
            if (Array.isArray(query[decodeURIComponent(pair[0])])) {
                query[decodeURIComponent(pair[0])].push(decodeURIComponent(pair[1] || ''))
            } else {
                query[decodeURIComponent(pair[0])] = [query[decodeURIComponent(pair[0])], decodeURIComponent(pair[1] || '')];
            }
        } else {
            query[decodeURIComponent(pair[0])] = (decodeURIComponent(pair[1])) ? decodeURIComponent(pair[1]) : decodeURIComponent(pair[1] || '');
        }
    }
    return query
};
export const combineQuery = (queries, n) => {
    if (typeof queries === 'string') {
        return queries;
    } else {
        let query = '?';
        for (let key in queries) {
            if (key) {
                if (Array.isArray(queries[key])) {
                    queries[key].forEach(val => {
                        query += `${key}=${val}&`
                    })
                } else {
                    if(!TypeChecker.isUndefined(queries[key]) && !TypeChecker.isNull(queries[key]) && !TypeChecker.isEmptyString(queries[key])) {
                        query += `${key}=${queries[key]}&`
                    }
                }
            }
        }
        return query.slice(0, -1);
    }
};
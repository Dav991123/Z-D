import React, { useState, useEffect , useCallback } from 'react';
import { parseQuery, combineQuery } from '../core/queryHelper';

const useQuery = () => {
    let data = {

    }
    if(!window.location.search) {
        data = {
            page: '1',
            size: '5'
        };

    }else {
        data = {
            ...parseQuery(window.location.search)
        }
    }

    const [queryState, setQueryState] = useState(data);
    useEffect(() => {
        if(window.location.search){
            setQueryState(({...parseQuery(window.location.search)}))
        }
    }, [window.location.search]);
    const obj = {
        query: combineQuery(queryState),
        queryObject: queryState,
        setQueryState
    };
    return obj
};
export default useQuery;
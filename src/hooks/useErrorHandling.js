import { useState, useEffect } from 'react';

export default (axios) => {
    const [error, setError] = useState(null);

    const reqInt = axios.interceptors.request.use(req => {
        setError(null);
        return req;
    });

    const resInt = axios.interceptors.response.use(res => res, err => {
        setError(err)
    });

    useEffect(() => {
        return () => {
            axios.interceptors.request.eject(reqInt);
            axios.interceptors.request.eject(resInt);
        }
    })

    const errConfirmHandler = () => {
        setError(null);
    }

    return [error, errConfirmHandler];
}
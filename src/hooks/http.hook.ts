import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const request = useCallback(async (url: string, method = 'GET', body = null, headers={'Content-type': 'Application/json'} ) => {
        setLoading(true);

        try {
            const response = await fetch(url, {method, body, headers});

            if(!response.ok) {
                throw new Error(`Couldn't fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            setLoading(false);
            
            return data;
        } catch(err) {
            setLoading(false);
            setError(true);
            throw (err);
        }
    }, []);

    const clearError = () => {
        setError(false);
    }

    return {loading, error, request, clearError}
}



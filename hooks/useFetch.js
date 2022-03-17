import { useState, useEffect } from 'react'

function useFetch (url) {
    const [response, setResponse] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const fetchUrl = async () => {
            const result = await fetch(url)
            setResponse(result)
            setLoading(false)
        }

        if (url) {
            fetchUrl()
                .then(() => console.log('useFetch done !'))
                .catch((e) => console.log('useFetch - ERROR ', e))
        }
    }, [url])

    return [response, loading]
}

export { useFetch }

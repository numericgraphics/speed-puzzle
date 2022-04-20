import { useEffect, useState } from 'react'

function useDb (newScore) {
    const [scored, setScored] = useState({ value: undefined, content: undefined })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const addScoreToDB = async (score) => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ score })
            }
            const response = await fetch('/api/score', requestOptions)

            if (response.status === 200) {
                setScored({ value: true, content: {} })
            } else {
                setScored({ value: false, content: {} })
            }
            setLoading(false)
        }
        if (newScore) {
            addScoreToDB(newScore)
                .then(() => console.log('useDb done !'))
                .catch((e) => console.log('useDb - ERROR ', e))
        }
    }, [newScore])

    return [loading, scored]
}

export { useDb }

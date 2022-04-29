import { useEffect, useState } from 'react'

function useCheckUserScore (newScore) {
    const [scored, setScored] = useState({ value: undefined, content: undefined })

    useEffect(() => {
        const compareScoreInDB = async (score) => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ score })
            }
            const response = await fetch('/api/checkUserScore', requestOptions)

            if (response.status === 200) {
                setScored({ value: true, content: {} })
            } else {
                setScored({ value: false, content: {} })
            }
        }
        if (newScore) {
            compareScoreInDB(newScore)
                .then(() => console.log('useCheckUserScore done !'))
                .catch((e) => console.log('useCheckUserScore - ERROR ', e))
        }
    }, [newScore])

    return [scored]
}

export { useCheckUserScore }

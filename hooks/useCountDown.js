import { useState, useRef, useEffect } from 'react'

function useCountDown (duration) {
    const intervalId = useRef()
    const [progress, setProgress] = useState(0)
    const [timeLeft, setTimeLeft] = useState(duration)

    useEffect(() => {
        return () => killCountDown()
    }, [])

    function starCountDown () {
        let count = duration
        intervalId.current = setInterval(() => {
            setTimeLeft(Math.round(count--))
            setProgress(prevProgress => prevProgress + 100 / duration)
        }, 1000)
    }

    function killCountDown () {
        setProgress(0)
        setTimeLeft(duration)
        clearInterval(intervalId.current)
    }

    return [progress, timeLeft, starCountDown, killCountDown]
}

export { useCountDown }

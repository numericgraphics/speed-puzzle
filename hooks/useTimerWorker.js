import { useState, useRef } from 'react'
import { COUNTER_MESSAGES } from '../utils'

function useTimerWorker () {
    const workerRef = useRef()
    const [timerValue, setTimerValue] = useState(0)

    const updateTimerWorker = () => {
        if (typeof (Worker) !== 'undefined') {
            setTimerValue(0)
            workerRef.current = new Worker(new URL('../workers/worker.js', import.meta.url))
            workerRef.current.onmessage = (event) => {
                if (event.data.event === COUNTER_MESSAGES.END) {
                    setTimerValue(event.data.timerValue)
                    workerRef.current.terminate()
                }
            }
        } else {
            console.log('TIMER WORKER ISSUE - browser doesnt support')
        }
    }

    const postTimerMessages = (event) => {
        workerRef.current.postMessage({ event })
    }

    return [postTimerMessages, updateTimerWorker, timerValue]
}

export { useTimerWorker }

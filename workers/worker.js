// This is a module worker, so we can use imports (in the browser too!)
import { Timer, COUNTER_MESSAGES } from '../utils'

// console.log('----- Worker init')

let timer

addEventListener('message', (event) => {
    if (timer === undefined) {
        timer = new Timer()
    }
    // console.log('Worker data received', event.data)
    switch (event.data.event) {
    case COUNTER_MESSAGES.START:
        timer.startTimer()
        break
    case COUNTER_MESSAGES.END:
        postMessage({ event: COUNTER_MESSAGES.END, timerValue: timer.endTimer() })
        timer = null
    }
})

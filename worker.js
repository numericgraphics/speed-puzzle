// This is a module worker, so we can use imports (in the browser too!)
import {Timer} from './utils/timer'
import {COUNTER_MESSAGES} from "./utils/constants"

console.log('----- Worker init')

let timer

addEventListener('message', (event) => {
    if (timer === undefined) {
        timer = new Timer()
    }
    console.log('Worker data received', event.data)
    switch (event.data.event) {
        case COUNTER_MESSAGES.START:
            timer.startTimer()
            break
        case COUNTER_MESSAGES.END:
            const timerValue = timer.endTimer()
            postMessage({ event: COUNTER_MESSAGES.END, timerValue })
            timer = null

    }
})

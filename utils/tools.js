export const millisecondToMinutes = (millis) => {
    const minutes = Math.floor(millis / 60000)
    const seconds = ((millis % 60000) / 1000).toFixed(1)
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}

export const millisecondToSecond = (millis) => {
    return ((millis % 60000) / 1000).toFixed(1)
}

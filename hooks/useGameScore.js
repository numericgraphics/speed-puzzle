import { useState } from 'react'

function useGameScore () {
    const [score, setScore] = useState([])

    const addScore = (newScore) => {
        setScore([
            ...score,
            newScore
        ])
    }

    const lastScore = () => {
        return score[score.length - 1]
    }

    const resetScore = () => {
        setScore([])
    }

    return [score, addScore, lastScore, resetScore]
}

export { useGameScore }

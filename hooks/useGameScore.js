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

    return [score, addScore, lastScore]
}

export { useGameScore }

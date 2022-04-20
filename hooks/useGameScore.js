import { useState } from 'react'
import { GAME_CONFIG } from '../config'
import { millisecondToSecond } from '../utils'

function useGameScore () {
    const [scores, setScores] = useState([])

    const addScore = (newScore) => {
        const { moves, complexity, timerValue } = newScore
        const movesCalculation = complexity / moves
        newScore.computedScore = timerValue > 30000 ? 0 : Math.abs(GAME_CONFIG.GLOBAL_SCORE_BASE - (millisecondToSecond(timerValue) / movesCalculation))
        setScores([
            ...scores,
            newScore
        ])
    }

    const lastScore = () => {
        return scores[scores.length - 1]
    }

    const resetScore = () => {
        setScores([])
    }

    const getGlobalScore = () => {
        return scores.map(item => item.computedScore).reduce((prev, next) => prev + next)
    }

    return [addScore, lastScore, resetScore, getGlobalScore]
}

export { useGameScore }

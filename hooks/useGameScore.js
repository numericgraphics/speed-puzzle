import { useState } from 'react'
import { GAME_CONFIG } from '../config'
import { millisecondToSecond } from '../utils'

function useGameScore () {
    const [score, setScore] = useState([])

    const addScore = (newScore) => {
        const { moves, complexity, timerValue } = newScore
        const movesCalculation = complexity / moves
        newScore.computedScore = timerValue > 30000 ? 0 : GAME_CONFIG.QUESTION_DURATION - (millisecondToSecond(timerValue) / movesCalculation)
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

    const getGlobalScore = () => {
        console.log('getGlobalScore', score)
        return score.map(item => item.computedScore).reduce((prev, next) => prev + next)
    }

    return [score, addScore, lastScore, resetScore, getGlobalScore]
}

export { useGameScore }

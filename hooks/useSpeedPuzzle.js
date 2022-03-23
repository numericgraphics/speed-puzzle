import { useContext } from 'react'

import { PuzzleContext } from '../providers'

export const useSpeedPuzzle = () => {
    return useContext(PuzzleContext)
}

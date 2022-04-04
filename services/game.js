class GameInstance {
    constructor () {
        console.log('Game constructor')
        this.game = []
    }

    addScore (value) {
        this.game = [...this.game, value]
    }

    getScores () {
        return this.game
    }
}

export const Game = new GameInstance()

class UserInstance {
    constructor () {
        console.log('User constructor')
        this.gameResult = []
    }

    addResult (value) {
        this.gameResult = [...this.gameResult, value]
    }

    getGameResult () {
        return this.gameResult
    }
}

export const User = new UserInstance()

const ENDPOINT = process.env.NODE_ENV === 'development' ? 'http://192.168.1.11:5000' : 'https://rinaldo-test-server-1.herokuapp.com'

export const API = {
    async makeRequest (path, options = {}) {
        console.log('API - makeRequest path', `${ENDPOINT}${path}`)
        console.log('API - makeRequest options', options)
        return await fetch(`${ENDPOINT}${path}`, options)
    },

    makePostRequest (path, postData) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: postData
        }
        return this.makeRequest(path, requestOptions)
    },

    makeGetRequest (path) {
        const requestOptions = {
            method: 'GET'
        }
        return this.makeRequest(path, requestOptions)
    }
}

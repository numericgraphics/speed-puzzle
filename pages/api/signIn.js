const URL = 'http://localhost:4001/adduser'

export default async function handler (req, res) {
    try {
        const { username, score, email, password } = await req.body
        const response = await fetch(URL, {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, score, email, password })
        })

        if (response.status === 200) {
            const content = await response.json()
            console.log('adduser API - response', content)
            res.status(response.status).json(content)
        } else {
            res.status(response.status).send()
        }
    } catch (error) {
        console.log('adduser API - error catch', error)
        res.status(400).send(error.message)
    }
}

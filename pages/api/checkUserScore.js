
export default async function handler (req, res) {
    try {
        const { score } = await req.body
        console.log('Score API - process.env.NODE_ENV', score)

        const url = 'http://localhost:4001/score'

        const response = await fetch(url, {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ score: score })
        })
        res.status(response.status).send()
    } catch (error) {
        console.log('Score API - error catch')
        res.status(400).send(error.message)
    }
}


export default async function handler (req, res) {
    try {
        const { score } = await req.body
        console.log('Score API - process.env.NODE_ENV', score)
        // res.status(200).json({ name: 'John Doe' })

        const url = 'http://localhost:4001/score'

        const response = await fetch(url, {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ score: score })
        })

        if (response.status !== 200) {
            const content = await response.json()
            res.status(303).send(JSON.stringify(content))
        } else {
            res.status(200).send()
        }
    } catch (error) {
        console.log('Score API - error catch')
        res.status(400).send(error.message)
    }
}

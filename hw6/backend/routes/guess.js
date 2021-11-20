import express from 'express'

let number = 0

const router = express.Router()
router.post('/start', (_, res) => {
    number = Math.floor(Math.random() * 100)
    // console.log(number);
    res.json({ msg: 'The game has started.' })
})
router.get('/guess', (req, res) => {
    const guessed = Number(req.query["number"])
    // console.log(guessed);
    if (!guessed || guessed < 1 || guessed > 100) {
        res.status(200).send({ msg: 'Not a legal number.' })
    }
    else if (guessed >= 1 && guessed < number){
        res.status(200).send({ msg: 'Bigger' })
    }
    else if (guessed <= 100 && guessed > number){
        res.status(200).send({ msg: 'Smaller' })
    }
    else{
        res.status(200).send({ msg: 'Equal' })
    }
})
router.post('/restart', (_, res) => {
    number = Math.floor(Math.random() * 100)
    res.json({ msg: 'A new game has started.' })
})

export default router
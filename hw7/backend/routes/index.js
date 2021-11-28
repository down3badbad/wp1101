import express from 'express';  
import ScoreCard from '../models/ScoreCard';

const router = express.Router()
router.post(
  '/api/create-card', async (req, res) => {
      const name = req.query.name;
      const subject = req.query.subject;
      const score = req.query.score;
      console.log(name, subject, score);

      const filter = {name: name, subject: subject};
      const is_exist = await ScoreCard.find(filter);

      if (is_exist.length === 0) {
        const newUser = new ScoreCard({ "name":name, "subject":subject, "score":score });
        newUser.save((error) => {
          if (error) {
            res.status(500).send({message: [error]})
          }
          else {
            console.log("new user added");
          }
        });
        res.status(200).send({
          message: [`Adding (${name}, ${subject}, ${score})`],
          card: `(${name}, ${subject}, ${score})`
        })
      }

      else {
        const update = {"score": score};
        ScoreCard.findOneAndUpdate(filter, update);
        res.status(200).send({
          message: [`Updating (${name}, ${subject}, ${score})`],
          card: `(${name}, ${subject}, ${score})`
        });
      }
  }
)

router.get(
  '/api/query-cards', async (req, res) => {
    const query_type = req.query.query_type;
    const query_string = req.query.query_string;

    let exist = null;
    if (query_type === "name") {
        exist = await ScoreCard.find({name: query_string});
    }
    else if (query_type === "subject") {
        exist = await ScoreCard.find({subject: query_string});
    }

    if (exist.length === 0) {
      res.status(200).send({messages: [`${query_type} (${query_string}) not found!`]})
    }
    else {
      let msg = [];
      for (let i = 0; i < exist.length; i++) {
        msg.push(`(${exist[i].name}, ${exist[i].subject}, ${exist[i].score})`)
      }
      res.status(200).send({messages: msg})
    }
  }
)

router.delete(
  '/api/clear-db', (_, res) => {
    ScoreCard.deleteMany({}, () => {
      res.status(200).send({message: "Database cleared"})
    });
  }
)

export default router;
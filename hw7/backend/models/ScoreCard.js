import mongoose from 'mongoose'
 
const Schema = mongoose.Schema;
const ScoreCardSchema = new Schema({
  "name": {type: String},   
  "subject": {type: String},
  "score": {type: String}
});
const ScoreCard = mongoose.model('ScoreCard', ScoreCardSchema);

export default ScoreCard;

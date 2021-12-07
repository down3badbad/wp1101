import express from 'express'
import Post from '../models/post'
import moment from 'moment'

const router = express.Router()

// TODO 2-(1): create the 1st API (/api/allPosts)
router.get(
    '/api/allPosts', async (req,res) => {
        const article = await Post.find().sort({ timestamp: -1 })
        if(article.length !== 0){
            res.status(200).send({"message":"success", "data": [article]})
            // console.log(article)
        }
        else{
            res.status(403).send({"message":"error", "data": null})
        }
    }
)

// TODO 3-(1): create the 2nd API (/api/postDetail)
router.get(
    '/api/postDetail', async (req,res) => {
        const postId = req.query.postId;
        const filter = {postId: postId};
        const detail = await Post.find(filter);
        // console.log(postId)
        // console.log(detail)
        if(detail.length !== 0){
            res.status(200).send({"message":"success", "data": detail[0]})
        }
        else{
            res.status(403).send({"message":"error", "data": null})
        }
    }
)
// TODO 4-(1): create the 3rd API (/api/newPost)
router.post(
    '/api/newPost', async (req,res) => {
        const postId = req.query.postId;
        const title = req.query.title;
        const content = req.query.content;
        const timestamp = req.query.timestamp;

        const newArticle = new Post({ "postId":postId, "title":title, "content":content, "timestamp":timestamp });
        newArticle.save((error) => {
            if (error) {
            res.status(403).send({"message":"error", "data":null})
            }
            else {
                res.status(200).send({
                    "message":"success"
                })
            }
        });
    }
)


// TODO 5-(1): create the 4th API (/api/post)
router.delete(
    '/api/post', async (req, res) => {
      const postId = req.query.postId;
      const filter = {postId: postId};
      Post.deleteOne(filter, (error) => {
        if (error) res.status(403).send({"message":"error", "data":null})
        else res.status(200).send({"message": "success"})
      });
    }
)

export default router
const express = require("express");
const Post = require("../schemas/post"); // 라는 스키마 참조

const router = express.Router(); // 익스프레스 라우터를 router로 쓰겠다 


router.post('/postTest', (req, res) => {
    const date = new Date()
    const time = date.toLocaleString()
    const { name_give, pw_give, title_give, intext_give } = req.body
    Post.create({
        name: name_give,
        pw: pw_give,
        title: title_give,
        intext: intext_give,
        postTime: time
    })
    res.send({ result: "success" })

})

router.get('/postTest', async (req, res) => {
    const posts = await Post.find().sort('-postTime')
    res.send(posts)
})

router.get('/postTest/:_id', async (req, res) => {
    const { _id } = req.params
    posts = await Post.findOne({ _id: _id })
    res.json({ posts: posts })
})
// params는 api통신할때 썼던 api/postTest/ <<<<235236347347>>>>
// query는 쿼리스트링, postTest?_id=1362347348

router.post('/postTest/:_id', async (req, res) => {
    const { pwPrompt } = req.body
})

router.delete('/postTest/:_id', async (req, res) => {
    const { _id } = req.params
    posts = await Post.findOne({ _id: _id })
    console.log(posts['pw'])
    const { pwPrompt } = req.body
    if (posts['pw'] === pwPrompt) {
        await Post.deleteOne({ _id: req.params._id })
        res.send({ result: "success" })
    } else (
        res.send({ result: "fail" })
    )
})


router.patch('/postTest/:_id', async (req, res) => {
    const { _id } = req.params
    const { name_give, pw_give, title_give, intext_give } = req.body
    await Post.updateOne({ _id }, { $set: { name: name_give, title: title_give, intext: intext_give } });
    res.send({ result: "success" })
})




module.exports = router;
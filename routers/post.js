const express = require("express");
const Post = require("../schemas/post"); // 라는 스키마 참조

const router = express.Router(); // 익스프레스 라우터를 router로 쓰겠다 

router.get("/getajax", async (req, res, next) => {
    res.send(req.body)
});

router.post('/postTest', (req, res, next) => {
    const date = new Date()
    const time = date.getTime()
    const { name_give, pw_give, title_give, intext_give } = req.body
    Post.create({
        name: name_give,
        pw: pw_give,
        title: title_give,
        intext: intext_give,
        postTime: time
    })
})

router.get('/postTest', async (req, res) => {
    const posts = await Post.find().sort('-postTime')
    res.send(posts)
})

router.get("/postTest/:PostTestId")

module.exports = router;
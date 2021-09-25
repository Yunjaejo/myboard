const express = require("express");
const Post = require("../schemas/Post"); // Goods라는 스키마 참조

const router = express.Router(); // 익스프레스 라우터를 router로 쓰겠다 

router.get("/getajax", async (req, res, next) => {
    res.send(req.body)
});

router.post('/postTest', (req, res, next) => {
    const { name_give, pw_give, title_give, intext_give } = req.body
    Post.create({
        name: name_give,
        pw: pw_give,
        title: title_give,
        intext: intext_give
    })


})

module.exports = router;
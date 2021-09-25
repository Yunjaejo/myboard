const express = require("express");
const Post = require("../schemas/Post"); // Goods라는 스키마 참조

const router = express.Router(); // 익스프레스 라우터를 router로 쓰겠다 

router.get("/getajax", async (req, res, next) => {
    res.send(req.body)
});

router.post('/postTest', (req, res, next) => {
    console.log(req.body)

})

module.exports = router;
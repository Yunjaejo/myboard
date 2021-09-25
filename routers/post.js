const express = require("express");
const Post = require("../schemas/Post"); // Goods라는 스키마 참조

const router = express.Router(); // 익스프레스 라우터를 router로 쓰겠다 

router.get("/post", async (req, res, next) => {
    try {
        const { category } = req.query;
        const goods = await Goods.find({ category }).sort("-goodsId");
        res.json({ goods: goods });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get("/goods/:goodsId", async (req, res) => {
    const { goodsId } = req.params;
    goods = await Goods.findOne({ goodsId: goodsId });
    res.json({ detail: goods });
});

module.exports = router;
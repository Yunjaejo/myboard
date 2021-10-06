const express = require('express');
const Comment = require('../schemas/comment');
const authMiddleware = require('../middlewares/auth-middleware');
const router = express.Router(); // 익스프레스 라우터를 router로 쓰겠다

// 댓글 등록
router.post('/postComment/:_id', authMiddleware, (req, res) => {
    const { _id } = req.params;
    const date = new Date();
    const time = date.toLocaleString();
    const { comment_give } = req.body;
    Comment.create({
      userId: res.locals.user,
      comment: comment_give,
      postTime: time,
      upperPost: _id,
    });
    res.send({ result: 'success' });
  });
  
  // 댓글 불러오기
  router.get('/getComment/:_id', async (req, res) => {
    const { _id } = req.params;
    const comments = await Comment.find({ upperPost: _id }).sort('-postTime');
    res.send(comments);
  });
  
  // 댓글 삭제
  router.delete('/delComment/:id', authMiddleware, async (req, res) => {
    const { _id } = req.params;
    const userId = res.locals.user;
    const { value } = req.body;
    const comment = await Comment.findOne({ _id: value });
    if (userId === comment.userId) {
      await Comment.deleteOne({ _id: value });
      res.send({ result: 'success' });
    } else {
      res.status(400).send({});
    }
  });
  
  // 댓글 수정시 인풋창 값
  router.post('/editComment/:_id', authMiddleware, async (req, res) => {
    const { _id } = req.params;
    const { value } = req.body;
    const userId = res.locals.user;
  
    const comment = await Comment.findOne({ _id: value });
    if (userId === comment.userId) {
      res.send(comment.comment);
    } else {
      res.status(400).send({});
    }
  });
  
  // 댓글 수정본 저장
  router.patch('/editSubmit/:_id', authMiddleware, async (req, res) => {
    const { value, editComment_give } = req.body;
    await Comment.updateOne(
      { _id: value },
      { $set: { comment: editComment_give } }
    );
    res.send({ result: 'success' });
  });

module.exports = router;
const express = require('express');
const Post = require('../schemas/post'); // 라는 스키마 참조
const Comment = require('../schemas/comment');
const router = express.Router(); // 익스프레스 라우터를 router로 쓰겠다

// 게시글 작성
router.post('/postTest', (req, res) => {
  const date = new Date();
  const time = date.toLocaleString();
  const { name_give, pw_give, title_give, intext_give } = req.body;
  Post.create({
    name: name_give,
    pw: pw_give,
    title: title_give,
    intext: intext_give,
    postTime: time,
  });
  res.send({ result: 'success' });
});

// 목록 불러오기
router.get('/postTest', async (req, res) => {
  const posts = await Post.find().sort('-postTime');
  res.send(posts);
});

// 상세페이지 불러오기
router.get('/postTest/:_id', async (req, res) => {
  const { _id } = req.params;
  posts = await Post.findOne({ _id: _id });
  res.json({ posts: posts });
});

// 수정, 삭제 시 비밀번호 입력받기
router.post('/postTest/:_id', async (req, res) => {
  const { pwPrompt } = req.body;
});

// 게시글 삭제
router.delete('/postTest/:_id', async (req, res) => {
  const { _id } = req.params;
  posts = await Post.findOne({ _id: _id });
  const { pwPrompt } = req.body;
  if (posts['pw'] === pwPrompt) {
    await Post.deleteOne({ _id: req.params._id });
    await Comment.deleteMany({ upperPost: _id });
    res.send({ result: 'success' });
  } else res.send({ result: 'fail' });
});

// 게시글 수정
router.patch('/postTest/:_id', async (req, res) => {
  const { _id } = req.params;
  const { name_give, pw_give, title_give, intext_give } = req.body;
  await Post.updateOne(
    { _id },
    { $set: { name: name_give, title: title_give, intext: intext_give } }
  );
  res.send({ result: 'success' });
});

module.exports = router;

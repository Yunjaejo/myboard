const express = require('express');
const Post = require('../schemas/post'); // 라는 스키마 참조
const Comment = require('../schemas/comment');
const User = require('../schemas/user');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/auth-middleware');
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
// params는 api통신할때 썼던 api/postTest/ <<<<235236347347>>>>
// query는 쿼리스트링, postTest?_id=1362347348

// 수정, 삭제 시 비밀번호 입력받기
router.post('/postTest/:_id', async (req, res) => {
  const { pwPrompt } = req.body;
});

// 게시글 삭제
router.delete('/postTest/:_id', async (req, res) => {
  const { _id } = req.params;
  posts = await Post.findOne({ _id: _id });
  // comments = await Comment.find({ upperPost: _id });
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

// 회원가입
router.post('/signUp', async (req, res) => {
  const { id_give, pw_give } = req.body;
  const existId = await User.findOne({ userId: id_give });

  if (existId) {
    res.status(400).send({});
    return false;
  } else {
    await User.create({
      userId: id_give,
      pw: pw_give,
    });
    res.send({ result: 'success' });
  }
});

// 로그인
router.post('/login', async (req, res) => {
  const { id_give, pw_give } = req.body;
  const users = await User.findOne({ userId: id_give });
  if (users) {
    if (users.pw === pw_give) {
      const token = jwt.sign({ userId: users.userId }, 'yj-secret-key');
      res.cookie('user', token);
      res.json({ token });
    } else {
      res.status(400).send({});
    }
  } else {
    res.status(400).send({});
  }
});

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
router.delete('/delComment/:_id', authMiddleware, async (req, res) => {
  const { _id } = req.params;
  comments = await Comment.findOne({ _id: _id });
  console.log(comments);
  console.log(res.locals.user);
});

module.exports = router;

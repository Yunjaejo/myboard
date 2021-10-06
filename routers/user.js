const express = require('express');
const User = require('../schemas/user');
const jwt = require('jsonwebtoken');
const router = express.Router(); // 익스프레스 라우터를 router로 쓰겠다
const uf = require('./userFunction.js');

// 회원가입
router.post('/signUp', async (req, res) => {
  const { id_give, pw_give, pw2_give } = req.body;
  const existId = await User.findOne({ userId: id_give });

  if (existId) {
    res.status(400).send({});
  } else if (!uf.idCheck(id_give)) {
    res.status(401).send({});
  } else if (!uf.pwConfirm(pw_give, pw2_give)) {
    res.status(401).send({});
  } else if (!uf.pwLenCheck(pw_give)) {
    res.status(401).send({});
  } else if (!uf.pw_idCheck(id_give, pw_give)) {
    res.status(401).send({});
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

module.exports = router;

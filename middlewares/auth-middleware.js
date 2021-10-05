const jwt = require('jsonwebtoken');
const User = require('../schemas/user');

module.exports = async (req, res, next) => {
  const token = req.cookies.user;
  console.log('미들웨어 사용함');
  try {
    if (token) {
      const decoded = jwt.verify(token, 'yj-secret-key');
      const user = await User.findOne({ userId: decoded.userId }).exec();
      res.locals.user = user.userId;
      console.log('로컬 유저는?', res.locals.user);
    } else {
      res.locals.user = undefined;
      console.log('로컬 유저는?', res.locals.user);
    }
  } catch (err) {
    res.status(400).send({ errorMessage: '로그인이 필요합니다' });
    return;
  }
  next();
};

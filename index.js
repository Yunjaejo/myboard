const express = require('express'); // 익스프레스 참조
const cookieParser = require('cookie-parser');
const app = express(); // 익스프레스 쓸때는 app이라고 명시
app.use(cookieParser()); // 쿠키값을 꺼낼 수 있음
const port = 3000;
const morgan = require('morgan');
const authMiddleware = require('./middlewares/auth-middleware');

app.use(morgan('dev')); // 요청과 주소, 에러 기록

const connect = require('./schemas'); // schemas 폴더 참조
connect(); // 모델이랑 연결하기

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // POST로 메소드 받을 때 req.body로 사용가능하게 함

const postRouter = require('./routers/post');
const userRouter = require('./routers/user');
const commRouter = require('./routers/comm');
app.use('/post', [postRouter]); // postRouter를 api 하위부분에서 쓰겠다 !
app.use('/user', [userRouter]);
app.use('/comm', [commRouter]);

app.set('views', __dirname + '/views'); // views의 경로는 /views
app.set('view engine', 'ejs'); // 뷰 엔진으로 ejs 사용

app.get('/write', (req, res) => {
  res.render('write');
});

app.get('/', authMiddleware, (req, res) => {
  res.render('list');
});

app.get('/signUp', (req, res) => {
  res.render('signUp');
});

app.get('/edit', (req, res) => {
  res.render('edit');
});

app.get('/postTest', authMiddleware, (req, res) => {
  res.render('detail');
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});

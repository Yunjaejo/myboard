const express = require('express') // 익스프레스 참조
const app = express() // 익스프레스 쓸때는 app이라고 명시
const port = 3000

const connect = require("./schemas"); // schemas 폴더 참조
connect(); // 모델이랑 연결하기

app.use(express.urlencoded({ extended: false }))
app.use(express.json()) // POST로 메소드 받을 때 req.body로 사용가능하게 함

app.set('views', __dirname + '/views'); // views의 경로는 /views
app.set('view engine', 'ejs'); // 뷰 엔진으로 ejs 사용

app.get('/write', (req, res) => {
    res.render('write')
})

app.get('/list', (req, res) => {
    res.render('list')
})

app.get('/edit', (req, res) => {
    res.render('edit')
})

app.get('/detail', (req, res) => {
    res.render('detail')
})




app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})
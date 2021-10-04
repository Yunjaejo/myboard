const mongoose = require('mongoose')

const { Schema } = mongoose
const postSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  pw: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  intext: {
    type: String,
    required: true,
  },
  postTime: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Post', postSchema) // 이 스키마를 모델링해서 내보내겠다 !

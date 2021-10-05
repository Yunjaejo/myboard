const mongoose = require('mongoose');

const { Schema } = mongoose;
const commentSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  postTime: {
    type: String,
    required: true,
  },
  upperPost: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Comment', commentSchema); // 이 스키마를 모델링해서 내보내겠다 !

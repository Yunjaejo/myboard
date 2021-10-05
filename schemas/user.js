const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  pw: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema); // 이 스키마를 모델링해서 내보내겠다 !

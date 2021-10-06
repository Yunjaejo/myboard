const {
  idCheck,
  pwConfirm,
  pwLenCheck,
  pw_idCheck,
} = require('./userFunction.js');

test('입력한 아이디는 영어대소문자,숫자만으로 3글자 이상 사용가능하다.(특수문자 및 한글 사용불가능)', () => {
  expect(idCheck('123')).toEqual(true);
  expect(idCheck('Ao1')).toEqual(true);
  expect(idCheck('12')).toEqual(false);
  expect(idCheck('Ao1@#$')).toEqual(false);
  expect(idCheck('조윤재')).toEqual(false);
  expect(idCheck('좋은 개발자가 되기 위하여')).toEqual(false);
});

test('pw1 과 pw2 는 동일한 값이다', () => {
  expect(pwConfirm('Ao@1', 'Ao@1')).toEqual(true);
  expect(pwConfirm('Aoli141', 'Ao1i414')).toEqual(false);
  expect(pwConfirm('12345678', 'myPassword')).toEqual(false);
});

test('비밀번호는 4글자 이상이다.', () => {
  expect(pwLenCheck('12345')).toEqual(true);
  expect(pwLenCheck('')).toEqual(false);
  expect(pwLenCheck('1')).toEqual(false);
  expect(pwLenCheck('12')).toEqual(false);
  expect(pwLenCheck('123')).toEqual(false);
});

test('비밀번호가 아이디에 포함되지 않는다.', () => {
  expect(pw_idCheck('Ao1', '1515123')).toEqual(true);
  expect(pw_idCheck('yunjaejo12', 'jyj12')).toEqual(true);
  expect(pw_idCheck('yunjaejo12', 'yunjae')).toEqual(false);
  expect(pw_idCheck('12345678', '1234')).toEqual(false);
  expect(pw_idCheck('1212123', '1212')).toEqual(false);
});

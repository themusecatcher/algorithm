/*
  比较两个字符串的大小
  两个字符串都是用 - 连接的数字，比如 1-2-33-41-5
  比较方式是从左到右，依次比较每个数字的大小，遇到相等的数字继续往后比较，
  遇到不同的数字直接得到比较结果

  s1 > s2 return 1
  s1 < s2 return -1
  s1 === s2 return 0
*/
function compare(s1, s2) {
  const iter1 = walk(s1)
  const iter2 = walk(s2)
  while(1) {
    const { done: d1, value: v1 } = iter1.next()
    const { done: d2, value: v2 } = iter2.next()
    if (d1 && d2) {
      return 0
    }
    if (d1) {
      return -1
    }
    if (d2) {
      return 1
    }
    if (v1 < v2) {
      return -1
    }
    if (v1 > v2) {
      return 1
    }
  }
}
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator
function* walk(str) {
  let s = ''
  for (const char of str) {
    if (char === '-') {
      yield Number(s)
      s = ''
    } else {
      s += char
    }
  }
  if (s) {
    yield Number(s)
  }
}
const s1 = '1-2-333-41-5'
const s2 = '1-2-221-33-41'
const iter = walk(s1)
console.log(iter.next()) // { value: 1, done: false }
console.log(iter.next()) // { value: 2, done: false }
console.log(iter.next()) // { value: 33, done: false }
console.log(iter.next()) // { value: 41, done: false }
console.log(iter.next()) // { value: 5, done: false }
console.log(iter.next()) // { value: undefined, done: true }

console.log(compare(s1, s2))

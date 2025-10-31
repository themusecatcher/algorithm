/*
  JS 数组元素匹配性能比较
  在长度为 100万 的数组种匹配指定元素性能比较：
  indexOf  1.174ms     No.2
  includes  0.899ms     No.1
*/
const arr = []
for (let i = 0; i < 5000000; i++) {
  arr[i] = i
}
console.log('arr:', arr)
console.time('indexOf')
console.log('indexOf:', arr.indexOf(4000000))
console.timeEnd('indexOf') // 1.174ms
console.time('includes')
console.log('includes:', arr.includes(4000000))
console.timeEnd('includes') // 0.899ms

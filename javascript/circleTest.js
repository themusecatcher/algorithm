/*
  执行1百万个1相加的操作
  五种循环执行效率比较：
  for...  3.572ms     No.3
  for...in  64.663ms     No.6 遍历对象的可枚举属性（包括原型链）（需检查原型链，所以速度较慢）
  for...of  26.686ms     No.5 遍历可迭代对象的元素（数组、字符串、Map、Set 等实现了 Symbol.iterator 的对象）不遍历原型链，所以速度更快相比 for...in
  forEach  7.331ms     No.4
  while  2.767ms     No.2
  do...while  2.453ms     No.1
*/
const arr = new Array(1000000).fill(1)
// console.log('arr:', arr)
const len = arr.length
console.log('len:', len)
var sum
console.time('for')
sum = 0
for (let i = 0; i < len; i++) {
  sum+=arr[i]
}
console.log('sum:', sum)
console.timeEnd('for') // 1.8ms
console.time('for in')
sum = 0
for (let n in arr) {
  sum+=arr[n]
}
console.log('sum:', sum)
console.timeEnd('for in') // 9ms
console.time('for of')
sum = 0
for (let n of arr) {
  sum+=n
}
console.log('sum:', sum)
console.timeEnd('for of') // 4ms
console.time('forEach')
sum = 0
arr.forEach(n => {
  sum+=n
})
console.log('sum:', sum)
console.timeEnd('forEach') // 1.6ms
console.time('while')
sum = 0
let k = 0
while (k < len) {
  sum+=arr[k]
  k++
}
console.log('sum:', sum)
console.timeEnd('while') // 1.4ms
console.time('do...while')
sum = 0
let x = 0
do {
  sum+=arr[x]
  x++
} while (x < len)
console.log('sum:', sum)
console.timeEnd('do...while') // 1.4ms

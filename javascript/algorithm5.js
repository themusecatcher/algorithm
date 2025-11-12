// var a,b
// (function() {
//   console.log(a) // undefined
//   console.log(b) // undefined
//   var a = (b = 3)
//   console.log(a) // 3
//   console.log(b) // 3
// })()
// console.log(a) // undefined
// console.log(b) // 3

// const arr = [1,4,2,4, 3,4,5]
// console.log([...new Set(arr)].sort((a, b) => a - b))

const promise = new Promise((resolve, reject) => {
  console.log('a') // 同步执行
  // 缺少 resolve() 或 reject() 调用！
  // Promise 永远停留在 pending 状态！
})
promise.then(() => { // then 回调永远不会执行
  console.log('b')
})
console.log('c') // 同步执行
/**
 * a
 * c
 */

const F = function() {} // 函数类型
Object.prototype.a = () => {
  console.log('a')
}
Function.prototype.b = () => {
  console.log('b')
}
const f = new F() // 对象类型
// f 的原型链：f → F.prototype → Object.prototype → null
f.a() // a
// f.b() // f.b is not a function
// F 的原型链：F -> Function.prototype -> Object.prototype -> null
F.a() // a
F.b() // b
console.log(typeof F) // function
console.log(typeof f) // object

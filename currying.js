function getLink (a, b) {
  return a + b
}
// 通用柯里化工具函数
function currying (fn, ...args) {
  return function (...rest) {
    // 拼接参数
    const allArgs = args.concat(rest) // 或 allArgs = [...args, ...rest]
    // 参数个数大于等于 fn.length 时，参数收集完毕，执行函数
    if (allArgs.length >= fn.length) { // fn.length：fn ，接收的形参个数
      return fn.apply(this, allArgs)
    }
    return currying(fn, ...allArgs)
  }
}
const curryingLink = currying(getLink)
console.log(curryingLink) // [Function (anonymous)] function {...}
console.log(curryingLink('a', 'b')) // ab
console.log(curryingLink('a')) // [Function (anonymous)] function {...}
console.log(curryingLink('a')('b')) // ab

const sum = (a, b, c, d) => a + b + c + d

console.log(currying(sum)(1)(2)(3)(4)) // 10
console.log(currying(sum, 1)(2, 3)(4)) // 10
console.log(currying(sum, 1, 2)(3)(4)) // 10
console.log(currying(sum, 1, 2)(3, 4)) // 10

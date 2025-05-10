function getName (a, b) {
  return this.name + a + b
}
// Function.prototype.myBind = function (context) {
//   const fn = this
//   // 将 arguments 对象转为数组
//   // for (const arg of arguments) {
//   //   console.log('arg', arg)
//   // }
//   let args = [...arguments] // arguments：对应于传递给函数的参数的类数组对象
//   args = args.slice(1) // 截取除第一个参数 context 外的其余参数
//   return function () {
//     return fn.apply(context, args) // apply 第二个参数接收一个参数数组
//   }
// }
/*
  args 两种获取方式：
  1. 直接在函数形参中使用 剩余参数语法（...args）进行收集
  2. 使用 arguments 对象，并通过 Array.prototype.slice 方法截取除去第一个参数外的其余参数
*/
Function.prototype.myBind = function (context, ...args) {
  const fn = this
  // let args = [...arguments] // arguments：对应于传递给函数的参数的类数组对象
  // args = args.slice(1) // 截取除第一个参数 context 外的其余参数
  return function () {
    return fn.call(context, ...args)
  }
}
var player = {
  name: 'curry'
}
var myBindName = getName.myBind(player, '&', '30') // 将第一个参数 player 作为函数的 this 上下文，其余参数作为函数的入参
console.log(myBindName) // f () {...}
console.log('myBindName:', myBindName()) // curry&30

var bindName = getName.bind(player, '&', '30')
console.log('bindName:', bindName()) // curry&30
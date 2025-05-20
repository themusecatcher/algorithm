// 让下面的代码成立
Object.prototype[Symbol.iterator] = function () {
  return Object.values(this)[Symbol.iterator]()
}
var [a, b] = {
  a: 3,
  b: 4
}
// 需要将对象转换为可迭代对象，才能使解构成立
console.log(a, b)

/*
  当右边是一个可迭代对象时，该解构即可成立
  满足可迭代协议的对象即为可迭代对象
  可迭代对象必须实现 [Symbol.iterator]() 方法，即对象（或者它原型链上的某个对象）
  必须有一个键为 [Symbol.iterator] 的属性，可通过常量 Symbol.iterator 访问该属性
  该迭代器可以被 for...of 循环使用
*/

const arr = [3, 4, 5]
console.log(typeof arr[Symbol.iterator] === 'function')
const iter = arr[Symbol.iterator]()
console.log(iter.next()) // iter.next().value
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
/*
  { value: 3, done: false }
  { value: 4, done: false }
  { value: 5, done: false }
  { value: undefined, done: true }
*/

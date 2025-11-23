/**
 * Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。
 * 这些方法与 proxy handler 的方法相同。
 * Reflect 不是一个函数对象，因此它是不可构造的。
 * 
 * 用于调用对象的基本操作方法（内部方法）
 */
const obj1 = {}

obj1.a = 1 // (间接)在内部会调用内部方法 [[SET]]
Reflect.set(obj1, 'a', 2) // (直接)调用内部方法 [[SET]]
obj1.a // [[GET]]

console.log(obj1) // { a: 2 }


const obj2 = {
  a: 1,
  b: 2,
  get c () { // 语法糖写法，相当于 Object.defineProperty(obj2, 'c', 
    return this.a + this.b
  }
}
console.log(obj2.c) // 3 间接调用内部方法 [[GET]]
// 7 (直接)调用内部方法 [[GET]]  get(target, propertyKey, receiver) receiver(可选)：用于指定调用时的 this 指向
Reflect.get(obj2, 'c', { a: 3, b: 4 })

const proxy1 = new Proxy(obj2, {
  get (target, property) {
    console.log('get1', property)
    return target[property]
  },
  set (target, property, value) {
    console.log('set1', property, value)
    return target[property] = value
  }
})

console.log(proxy1.a)
// get1 a
// 1
console.log(proxy1.c)
// 因为此时 this 指向 obj，而不是 proxy1，因此没有触发 get1 a、get1 b
// get1 c
// 3

const proxy2 = new Proxy(obj2, {
  get (target, property, receiver) { // receiver 主要用于指定 this 指向
    console.log('get2', property)
    return Reflect.get(target, property, receiver) // 或者 Reflect.get(target, property, proxy2)
  },
  set (target, property, value, receiver) {
    console.log('set2', property, value)
    return Reflect.set(target, property, value, receiver)
  }
})

console.log(proxy2.a)
// get2 a
// 1
console.log(proxy2.c)
// get2 c
// get2 a
// get2 b
// 3
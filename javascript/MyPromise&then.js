// 手写 Promise

// 定义三种状态常量
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  /*
    定义状态和结果两个私有属性:
    1.使用 # 语法（ES2022+ 官方私有字段）：在类中通过 # 前缀声明属性，该属性仅在类的内部可访问
    2.Symbol 作为属性键：用 Symbol 作为属性名，外部无法直接获取 Symbol 引用。
  */
  #state = PENDING // 状态
  #result = undefined // 结果
  #thenables = [] // 存储 then 方法回调的队列
  constructor(executor) {
    // resolve 和 reject 主要功能即为改变状态，设置结果
    const resolve = (value) => { // 解决时调用
      this.#changeState(FULFILLED, value)
    }
    const reject = (reason) => { // 拒绝时调用
      this.#changeState(REJECTED, reason)
    }
    try { // 只能捕获同步错误，无法捕获异步错误，如 setTimeout 里的错误
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  // 改变状态和设置结果的私有方法
  #changeState(state, result) {
    if (this.#state !== PENDING) return
    this.#state = state
    this.#result = result
    this.#run()
  }

  // 处理 then 回调的私有方法
  #handleCallback(callback, resolve, reject) {
    if (typeof callback !== 'function') { // 状态穿透，即 then 方法返回的 Promise 状态与当前 Promise 状态保持一致
      // then 回调是微任务，需要放到微任务队列中执行
      queueMicrotask(() => { // 参考：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/queueMicrotask
        const settled = this.#state === FULFILLED ? resolve : reject
        settled(this.#result)
      })
      return
    }
    queueMicrotask(() => {
      try {
        const result = callback(this.#result)
        // 如果返回值是一个 Promise，则等待它完成后再 resolve
        if (result instanceof MyPromise) {
          result.then(resolve, reject)
        } else {
          resolve(result)
        }
      } catch (err) {
        reject(err)
      }
    })
  }
  /*
    执行队列的私有方法，两个执行时机：
    1.Promise 状态改变时
    2.then 方法被调用时
  */
  #run() {
    if (this.#state === PENDING) return
    // 取出队列中的回调函数，依次执行(先进先出原则)
    while (this.#thenables.length) {
      const { onFulfilled, onRejected, resolve, reject } = this.#thenables.shift()
      try {
        if (this.#state === FULFILLED) { // 执行 onFulfilled 回调函数
          this.#handleCallback(onFulfilled, resolve, reject)
        } else { // 执行 onRejected 回调函数
          this.#handleCallback(onRejected, resolve, reject)
        }
      } catch (err) {
        reject(err)
      }
    }
  }
  /*
    onFulfilled 可选：一个在此 Promise 对象被兑现时异步执行的函数。它的返回值将成为 then() 返回的 Promise 对象的兑现值。
    onRejected 可选：一个在此 Promise 对象被拒绝时异步执行的函数。它的返回值将成为 catch() 返回的 Promise 对象的兑现值。
  */
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      // 将四个回调函数放入队列，以便立即或将来处理
      this.#thenables.push({
        onFulfilled,
        onRejected,
        resolve,
        reject
      })
      // 启动队列处理
      this.#run()
    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  finally(onFinally) {
    this.then(
      (value) => {
        MyPromise.resolve(onFinally()).then(() => value)
      },
      (reason) => {
        MyPromise.resolve(onFinally()).then(() => { throw reason })
      }
    )
  }
}

const p1 = new Promise((resolve, reject) => {
  resolve(1)
  reject(2)
})
console.log('p1', p1)
// const p2 = new Promise(() => { throw 123 })
// console.log('p2', p2)
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('setTimeout') // 无法捕获
  }, 0)
})
console.log('p3', p3)
const myP1 = new MyPromise((resolve, reject) => {
  resolve(1)
  reject(2)
})
console.log('myP1', myP1)
myP1.then(
  (res) => {
    console.log('res', res) // 1
    return res + 1
  },
  (err) => {
    console.log('err', err) // 1
  }
).then((res) => {
  console.log('res', res) // 2
  // throw 'error'
  return res + 1
}).then((res) => {
  console.log('res', res) // 3
}).catch((err) => {
  console.log('err', err)
}).finally(() => {
  console.log('finally')
})
const myP2 = new MyPromise(() => { throw 123 })
console.log('myP2', myP2)
const myP3 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('setTimeout') // 无法捕获
  }, 0)
})
console.log('myP3', myP3)

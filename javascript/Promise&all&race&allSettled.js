/*
  then 方法：（返回值是 promise，如果没有返回值则相当于返回 undefined）
  then 方法接收两个函数作为参数：
  ①第一个参数是 Promise 执行成功时的回调
  ②第二个参数是 Promise 执行失败时的回调，两个函数只会有一个被调用。
    • 如果执行了 resolve 函数，则会回调 promise 对象的 .then 函数
    • 如果执行了 reject 函数，且 then 函数没有传入第二个参数，则会回调 promise 对象的 .catch 函数
    • 如果 then 函数传入了第二个参数（即 reject 时的回调），则 promise 对象的 .catch 函数将无法捕获 reject
  catch 方法的返回值也是 promise
  无论 promise 状态是 fulfilled 还是 rejected 都会执行一次 finally 方法

  resolve 和 reject 方法执行完成后都只会改变 promise 的状态，不会终止函数执行，
  但不会再影响 promise 的状态，因为 promise 状态一旦改变，就不会再变。
  如果想阻止后续代码的执行，可以使用 return
*/
function request (url) {
  return new Promise((resolve, reject) => {
    if (url === 'https') {
      resolve('https')
    } else {
      reject('reject not https')
    }
  })
}
// resolve
request('https').then(res => {
  console.log('https-res:', res) // 捕获 resolve
}).catch(err => {
  console.log('https-err:', err)
}).finally(() => {
  console.log('finally')
})
// reject 方式一
request('http').then(res => {
  console.log('http1-res:', res)
}, err => { console.log('http1-err1', err) } // 捕获 reject
).catch(err => {
  console.log('http1-err2:', err) // 不执行
})
// reject 方式二
request('http').then(res => {
  console.log('http2-res:', res)
}).catch(err => { // then 函数没有传入第二个参数时，捕获 reject
  console.log('http2-err:', err)
})

// async & await
function onPromise () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true)
    }, 1500)
  })
}
async function onCheck () {
  console.log('await:', await onPromise())
}
onCheck() // await: true

/*
  Promise.all 方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
  p 的状态由 p1、p2、p3 决定，存在以下两种情况:
  1.只有 p1、p2、p3 的状态都变成 fulfilled，p 的状态才会变成 fulfilled，此时 p1、p2、p3 的返回值组成一个数组，传递给 p 的回调函数。
  2.只要 p1、p2、p3 之中有一个被 rejected，p 的状态就变成 rejected，此时第一个被 reject 的实例的返回值，会传递给 p 的回调函数。
*/
const promise1 = Promise.resolve(3) // 等价于 new Promise((resolve, reject) => resolve(3))
const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('333')
  }, 3000, 'foo')
})
const promise3 = 42
const promise4 = Promise.reject(new Error('fail'))
Promise.resolve(promise4).then(res => {
  console.log('rej-res:', res)
}).catch(err => {
  console.log('rej-err:', err) // 捕获
})
const pAll1 = Promise.all([]).then(res => {
  console.log('all-res:', res)
}).catch(err => {
  console.log('all-err:', err) // 有 reject 就输出第一个 reject 的结果 Error: fail
})

// 手写实现 Promise.all() 函数
const PromiseAll = function (promises) {
  return new Promise((resolve, reject) => {
    // 判断是否具有 iterator 接口: typeof promises[Symbol.iterator] === 'function'
    if (typeof promises[Symbol.iterator] !== 'function') {
      reject(`TypeError: ${promises} is not iterable`)
    }
    const promisesArr = Array.from(promises)
    const results = new Array(promisesArr.length)
    if (promises.length === 0) {
      resolve(results)
    }
    let completedCount = 0
    promisesArr.forEach((promise, index) => {
      Promise.resolve(promise).then(res => {
        results[index] = res // 按顺序保存结果
        completedCount++
        if (completedCount === promises.length) {
          resolve(results)
        }
      }).catch(err => {
        reject(err) // 捕获第一个 reject 的结果
      })
    })
  })
}
const p1 = Promise.resolve(3) // 等价于 new Promise((resolve, reject) => resolve(3))
const p2 = true
const p3 = 'hello'
// const p4 = Promise.reject('rej')
const pAll2 = PromiseAll([]).then(res => {
  console.log('pAll-res:', res) // [3, true, 'hello']
}).catch(err => {
  console.log('pAll-err:', err) // 有 reject 就输出第一个 reject 的结果 Error: fail
})

/*
  Promise.race 方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。
  只要 p1、p2、p3 之中有一个实例率先改变状态，p 的状态就跟着改变。
  那个率先改变的 Promise 实例的返回值，就传递给 p 的返回值。
  输出第一个获取到的结果，无论是 resolve 还是 reject
*/
const pRace1 = Promise.race([promise1, promise2, promise3]).then(res => {
  console.log('race-res:', res)
}).catch(err => {
  console.log('race-err:', err)
})

// 手写实现 Promise.race() 函数
const PromiseRace = function (promises) {
  return new Promise((resolve, reject) => {
    // 判断是否具有 iterator 接口：return typeof promises[Symbol.iterator] === 'function'
    if (typeof promises[Symbol.iterator] !== 'function') {
      reject(`TypeError: ${promises} is not iterable`)
    }
    if (promises.length === 0) {
      return
    }
    // 遍历每个 Promise，主 Promise 状态由第一个完成的决定
    for (const promise of promises) {
      Promise.resolve(promise).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
      // 或者直接 Promise.resolve(promise).then(resolve, reject)
    }
  })
}
const p5 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3)
  }, 300)
})
const p6 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(5)
  }, 500)
})
const p7 = 'hello'
const pRace2 = PromiseRace([promise1, promise2, promise3]).then(res => {
  console.log('pRace-res:', res)
}).catch(err => {
  console.log('pRace-err:', err)
})
const pRace3 = PromiseRace([]).then(res => {
  console.log('pRace-res:', res)
}).catch(err => {
  console.log('pRace-err:', err)
})

/*
  ES11 新增语法 Promise.allSettled()，无论状态是 fulfilled 或 rejected 都会把参数返回
    Promise.allSettled() 静态方法将一个 Promise 可迭代对象作为输入，并返回一个单独的 Promise。
    当所有输入的 Promise 都已确定时（包括传入空的可迭代对象时），返回的 Promise 将被兑现，
    并带有描述每个 Promise 结果的对象数组。
*/
// const pro1 = request('http')
// const pro2 = request('https')
// const pro3 = request('hello')
// Promise.allSettled([pro1, pro2, pro3]).then(res => {
//   console.log('allSettled-res:', res)
//   // allSettled-res: [
//   //   { status: 'rejected', reason: 'reject not https' },
//   //   { status: 'fulfilled', value: 'https' },
//   //   { status: 'rejected', reason: 'reject not https' }
//   // ]
// })
const pro1 = Promise.resolve(3)
const pro2 = new Promise((resolve, reject) =>
  setTimeout(reject, 100, 'foo')
)
const pro3 = Promise.reject(new Error('bar'))
const promises = [pro1, pro2, pro3]
Promise.allSettled(promises).then((results) => {
  console.log('results:', results)
  results.forEach((result) => console.log(result.status))
})
// Expected output:
/*
  { status: 'fulfilled', value: 3 },
    { status: 'rejected', reason: 'foo' },
    {
      status: 'rejected',
      reason: Error: bar
        ...
    }
  }
*/
// 'fulfilled'
// 'rejected'
// 'rejected'
const promiseAllSettled = function (promises) {
  return new Promise((resolve, reject) => {
    // 判断是否具有 iterator 接口：return typeof promises[Symbol.iterator] === 'function'
    if (typeof promises[Symbol.iterator] !== 'function') {
      reject(`TypeError: ${promises} is not iterable`)
    }
    const promisesArr = Array.from(promises)
    const results = new Array(promisesArr.length)
    if (promisesArr.length === 0) {
      resolve(results)
    }
    let completedCount = 0
    promisesArr.forEach((promise, index) => {
      Promise.resolve(promise).then(
        (res) => {
          results[index] = { status: 'fulfilled', value: res }
        },
        (reason) => {
          results[index] = { status: 'rejected', reason }
        }
      ).finally(() => {
        completedCount++
        if (completedCount === promisesArr.length) {
          resolve(results)
        }
      })
    })
  })
}
promiseAllSettled(promises).then((results) => {
  console.log('results:', results)
  results.forEach((result) => console.log(result.status))
})

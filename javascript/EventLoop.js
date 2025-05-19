console.log('global') // 1

setTimeout(function () { // 2000ms 后宏任务
  console.log('timeout1')
  new Promise(function (resolve) {
    console.log('timeout1_promise')
    resolve()
  }).then(function () {
    console.log('timeout1_then')
  })
}, 2000) // 一次性执行完该宏任务内的同步任务，微任务等

for (var i = 1; i <= 5; i++) { // 执行完同步任务，即跳出循环时 i = 6
  setTimeout(function () {
    console.log(i) // 6
  }, i * 1000) // 1000ms 2000ms 3000ms 4000ms 5000ms 后的宏任务
  console.log(i) // 同步任务 2，输入 1 2 3 4 5
}

new Promise(function (resolve) {
  console.log('promise1') // 3
  resolve()
 }).then(function () {
  console.log('then1') // v1
})
setTimeout(function () { // 1000ms 后的宏任务
  console.log('timeout2')
  new Promise(function (resolve) {
    console.log('timeout2_promise')
    resolve()
  }).then(function () {
    console.log('timeout2_then')
  })
}, 1000)

new Promise(function (resolve) {
  console.log('promise2') // 4
  resolve()
}).then(function () {
  console.log('then2') // v2
})

/*
  global
  1
  2
  3
  4
  5
  promise1
  promise2
  then1
  then2
  6
  timeout2
  timeout2_promise
  timeout2_then
  timeout1
  timeout1_promise
  timeout1_then
  6
  6
  6
  6
*/

console.log('1') // 1
async function foo () {
  // await 后的表达式会被转换为一个 Promise（如果不是 Promise，会调用 Promise.resolve() 包装）。
  await bar()
  // 该 Promise 被解决（resolved）后，后续代码会被包装成一个 微任务（Microtask），放入微任务队列。
  console.log('3') // v1
}
foo()
function bar () {
  console.log('5') // 2
}
async function too () {
  try {
    await Promise.reject('6')
  } catch (err) {
    console.log(err) // v2
  }
}
too()
// 所有 then() 回调都会直接执行，看参数类型决定是加入微任务队列还是立即执行
// then() 方法的返回值始终是 promise，当返回普通数值 1 时，等价于 return Promise.resolve(1)；如果没有返回值，则相当于返回 return Promise.resolve(undefined)
Promise.resolve('4').then(res => {
  console.log(res) // v3
}).then(() => { // 回调函数微任务，进入微任务对列，等待执行
  console.log('9') // v4
}).then(
  console.log('2') // 3 立即执行，非回调函数
)
requestAnimationFrame(() =>{
  console.log('7')
  Promise.resolve().then(() => {
    console.log('8')
  })
})
console.log('10') // 4
// 1 5 2 10 3 6 4 9 7 8

/*
  `then()` 方法的返回值始终是一个 **新的 Promise**，其状态和值由回调函数的执行结果决定。以下是具体规则和示例：

---

### **`then()` 方法的返回值规则**
1. **回调返回普通值（非 Promise）**  
   返回值会被隐式包装为 `Promise.resolve(值)`。
   ```javascript
   Promise.resolve()
     .then(() => 1) // 等价于 return Promise.resolve(1)
     .then(res => console.log(res)); // 输出 1
   ```

2. **回调没有返回值（或返回 `undefined`）**  
   相当于返回 `Promise.resolve(undefined)`。
   ```javascript
   Promise.resolve()
     .then(() => {}) // 等价于 return Promise.resolve(undefined)
     .then(res => console.log(res)); // 输出 undefined
   ```

3. **回调返回一个 Promise**  
   新 Promise 的状态和值会 **跟随** 这个返回的 Promise。
   ```javascript
   Promise.resolve()
     .then(() => Promise.reject("error")) // 返回一个 rejected Promise
     .catch(err => console.log(err)); // 捕获错误，输出 "error"
   ```

4. **回调抛出错误**  
   新 Promise 会变为 `rejected` 状态，错误会被捕获。
   ```javascript
   Promise.resolve()
     .then(() => { throw new Error("error") }) // 抛出错误
     .catch(err => console.log(err.message)); // 输出 "error"
   ```

---

### **示例分析**
#### 示例 1：普通值
```javascript
Promise.resolve()
  .then(() => 1)          // 返回 Promise.resolve(1)
  .then(res => res + 2)   // 返回 Promise.resolve(3)
  .then(res => console.log(res)); // 输出 3
```
- 每次 `then()` 都会返回一个新的 Promise，链式调用依次处理。

#### 示例 2：无返回值
```javascript
Promise.resolve()
  .then(() => {})         // 返回 Promise.resolve(undefined)
  .then(res => { 
    console.log(res);     // 输出 undefined
    return "done";
  })
  .then(res => console.log(res)); // 输出 "done"
```

#### 示例 3：返回 Promise
```javascript
Promise.resolve()
  .then(() => {
    return new Promise(resolve => setTimeout(() => resolve(100), 1000);
  })
  .then(res => console.log(res)); // 1秒后输出 100
```
- 新 Promise 会等待内部 Promise 解决后再继续链式调用。

#### 示例 4：错误处理
```javascript
Promise.resolve()
  .then(() => { throw "error" })  // 抛出错误，返回 rejected Promise
  .then(() => console.log("这里不会执行"))
  .catch(err => console.log(err)); // 输出 "error"
```

---

### **关键总结**
| 回调行为                | `then()` 返回的 Promise 状态 | 值传递逻辑                          |
|-------------------------|------------------------------|-------------------------------------|
| 返回普通值（如 `1`）     | `fulfilled`                  | `Promise.resolve(1)`               |
| 无返回值（默认 `undefined`） | `fulfilled`           | `Promise.resolve(undefined)`       |
| 返回一个 Promise         | 跟随该 Promise 的状态         | 由内部 Promise 决定                 |
| 抛出错误                | `rejected`                   | `Promise.reject(错误)`              |

---

### **常见误区**
1. **链式调用的独立性**  
   每次调用 `then()` 都会生成一个新的 Promise，与之前的 Promise 无关：
   ```javascript
   const p1 = Promise.resolve(1);
   const p2 = p1.then(res => res + 1); // p2 是一个新 Promise
   console.log(p1 === p2); // false
   ```

2. **同步代码的陷阱**  
   `then()` 中的回调是异步执行的，即使 Promise 已经是解决状态：
   ```javascript
   console.log("start");
   Promise.resolve().then(() => console.log("then"));
   console.log("end");
   // 输出顺序：start → end → then
   ```

3. **穿透（Value Forwarding）**  
   如果 `then()` 中未提供回调，值会直接传递到下一层：
   ```javascript
   Promise.resolve(1)
     .then() // 无回调，值穿透
     .then(res => console.log(res)); // 输出 1
   ```

---

### **结论**

- **`then()` 的返回值始终是 Promise**。
- 如果回调返回普通值（如 `1`），等价于 `return Promise.resolve(1)`。
- 如果回调无返回值（或返回 `undefined`），等价于 `return Promise.resolve(undefined)`。
- ES6 的 Promise 规范正是如此设计的，确保链式调用的连贯性和异步逻辑的一致性。
*/
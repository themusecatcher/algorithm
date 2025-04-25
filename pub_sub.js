// 发布-订阅模式
export class PubSub {
  constructor() {
    this.events = {} // 存储事件及其回调列表
  }
  /**
   * 订阅事件
   * @param {string} event - 事件名称
   * @param {Function} callback - 回调函数
   */
  on(event, callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function')
    }
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
  }
  /**
   * 发布事件
   * @param {string} event - 事件名称
   * @param {...any} args - 回调函数的参数
   */
  emit(event, ...args) { // ...args：剩余参数语法，用于将所有接收到的参数收集到 args 数组中
    const callbacks = this.events[event]
    if (callbacks) {
      callbacks.forEach(cb => {
        try {
          cb(...args) // 同步执行回调，可在此处添加异步逻辑
        } catch (e) {
          console.error(`Error in ${event} handler:`, e)
        }
      })
    }
  }
  /**
   * 取消订阅
   * @param {string} event - 事件名称
   * @param {Function} callback - 需要取消的回调函数
   */
  off(event, callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function')
    }
    const callbacks = this.events[event]
    if (callbacks) {
      this.events[event] = callbacks.filter(cb => cb !== callback)
    }
  }
  /**
   * 一次性订阅
   * @param {string} event - 事件名称
   * @param {Function} callback - 回调函数
   */
  once(event, callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }
    const onceWrapper = (...args) => {
      try {
        callback(...args)
      } finally {
        this.off(event, onceWrapper) // 确保无论是否抛出异常，都自动取消订阅
      }
    }
    this.on(event, onceWrapper)
  }
}

// 使用示例
const pubSub = new PubSub()

// 订阅 message 事件
const logMessage = (msg) => console.log('Message:', msg)
pubSub.on('message', logMessage)

// 发布 message 事件
pubSub.emit('message', 'Hello World') // 输出: Message: Hello World

// 取消订阅 message 事件
pubSub.off('message', logMessage)
// 再次发布 message 事件，无输出
pubSub.emit('message', 'This will not be logged')

// 一次性订阅 greet 事件
pubSub.once('greet', (name) => console.log(`Hello, ${name}!`))

// 发布一次性订阅 greet 事件
pubSub.emit('greet', 'Alice') // 输出: Hello, Alice!
pubSub.emit('greet', 'Bob')   // 无输出

/*
关键点解析：

  事件中心 (events 对象)
  使用对象存储事件及其对应的回调列表，键为事件名，值为回调函数数组。

  订阅方法 (on)
  将回调函数添加到指定事件的回调列表中，支持同一事件的多次订阅。

  发布方法 (emit)
  触发指定事件的所有回调，支持传递参数。使用 try-catch 避免单个回调错误导致整体崩溃。

  取消订阅 (off)
  通过过滤回调列表移除指定函数，需注意匿名函数无法直接取消。

  一次性订阅 (once)
  通过包装函数在触发后自动取消订阅，确保回调仅执行一次。
*/

/*
  优化建议：

  异步执行：在 emit 中使用 setTimeout 或微任务（如 Promise）实现异步回调，避免阻塞主线程。

  错误处理：提供全局错误监听接口，方便集中处理异常。

  上下文绑定：允许在订阅时绑定 this 或使用箭头函数避免上下文丢失。
*/

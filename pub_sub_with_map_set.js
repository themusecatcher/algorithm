// 发布-订阅模式 使用 Map 和 Set 实现
class PubSub {
  constructor() {
    this.eventsMap = new Map() // 存储事件及其回调列表
  }
  /**
   * 订阅事件
   * @param {string} event - 事件名称
   * @param {Function} callback - 回调函数
   */
  on(event, callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('Callback must be a function')
    }
    if (!this.eventsMap.has(event)) {
      this.eventsMap.set(event, new Set())
    }
    this.eventsMap.get(event).add(callback)
  }
  /**
   * 发布事件
   * @param {string} event - 事件名称
   * @param {...*} args - 传递给回调函数的参数
   */
  emit(event, ...args) { // ...args：剩余参数语法，用于将所有接收到的参数收集到 args 数组中
    const callbacksSet = this.eventsMap.get(event)
    if (callbacksSet) {
      for (const cb of callbacksSet) { // 或者 forEach
        try {
          cb(...args) // 同步执行回调，可在此处添加异步逻辑
        } catch (e) {
          console.error(`Error in ${event} handler:`, e)
        }
      }
    }
  }
  /**
   * 取消订阅
   * @param {string} event - 事件名称
   * @param {Function} callback - 要取消的回调函数
   */
  off(event, callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('Callback must be a function')
    }
    const callbacksSet = this.eventsMap.get(event)
    if (callbacksSet && callbacksSet.has(callback)) {
      callbacksSet.delete(callback)
      // 如果该事件的所有回调都被移除，则从 eventsMap 中删除该事件
      if (callbacksSet.size === 0) {
        this.eventsMap.delete(event)
      }
    }
  }
  /**
   * 一次性订阅事件
   * @param {string} event - 事件名称
   * @param {Function} callback - 回调函数
   */
  once(event, callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('Callback must be a function')
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

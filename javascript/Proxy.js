/*
  Vue 3 的响应式系统是基于 ES6 的 `Proxy` 特性构建的。
  下面是一个简化版的 Vue 3 `Proxy` 响应式实现，它展示了如何使用 `Proxy` 来创建响应式对象，并在属性被访问或修改时触发更新。
*/
// 检查一个值是否为对象类型
function isObject (value) {
  return value !== null && typeof value === 'object'
}
function createReactiveObject (obj) {
  const handler = {
    get (target, key, receiver) {
      console.log(`get target['${key}'] value`)
      const res = Reflect.get(target, key, receiver)
      return res
    },
    set (target, key, value, receiver) {
      console.log(`target['${key}'] changed to '${value}'`)
      if (key in target && target[key] === value) {
        return true
      }
      Reflect.set(target, key, value, receiver)
      return true
    },
    deleteProperty (target, key) {
      console.log(`target['${key}'] has been deleted`)
      const res = Reflect.deleteProperty(target, key)
      return res
    }
  }
  const observed = {}
  for (const key in obj) {
    if (isObject(obj[key])) {
      observed[key] = createReactiveObject(obj[key])
    } else {
      observed[key] = obj[key]
    }
  }
  const proxy = new Proxy(observed, handler)
  return proxy
}

const player = {
  name: 'Curry',
  age: 34,
  career: {
    sports: 'basketball'
  }
}
const reactiveData = createReactiveObject(player)

console.log('reactiveData:', reactiveData) // { name: 'Curry', age: 34, career: { sports: 'basketball' } }

// 访问响应式数据name
console.log('name:', reactiveData.name) // curry

// 修改响应式数据
reactiveData.name = 'Stephen' // 输出: "'name' changed to 'Stephen'"
console.log('reactiveData:', reactiveData)

reactiveData.career.sports = 'golf'
console.log('reactiveData:', reactiveData)

// 删除响应式数据
delete reactiveData.career.sports // 输出: "'sports' has been deleted"
console.log('reactiveData:', reactiveData)
/*
  在这个简化版的例子中，我们定义了一个 `createReactiveObject` 函数来递归地将普通对象转换为响应式对象。
  我们使用 `Proxy` 来拦截对对象属性的访问（`get`）和修改（`set`）操作，并在这些操作发生时执行特定的逻辑。
  我们还定义了一个 `isObject` 辅助函数来检查一个值是否为对象类型。
  请注意，这个例子是一个非常基础的实现，Vue 3 的实际响应式系统要复杂得多，包括对数组的特别处理、依赖收集、批量更新等高级特性。
  此外，Vue 3 还使用了 `WeakMap` 和 `WeakSet` 来处理一些内部的响应式数据结构。
*/

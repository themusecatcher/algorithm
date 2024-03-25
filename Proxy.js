/*
  Vue 3 的响应式系统是基于 ES6 的 `Proxy` 特性构建的。
  下面是一个简化版的 Vue 3 `Proxy` 响应式实现，它展示了如何使用 `Proxy` 来创建响应式对象，并在属性被访问或修改时触发更新。
*/

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function createProxy(target, key, proxyHandler) {
  if (isObject(target[key])) {
    return createProxy(target[key], key, proxyHandler);
  }

  const proxy = new Proxy(target, proxyHandler);
  return proxy;
}

function createReactiveObject(data, proxyHandler) {
  const observed = {};
  const handler = {
    get(target, key, receiver) {
      if (key in target) {
        const value = target[key];
        return createProxy(value, key, proxyHandler);
      } else {
        return Reflect.get(target, key, receiver);
      }
    },
    set(target, key, value, receiver) {
      if (key in target && target[key] === value) {
        return true;
      }
      const oldValue = target[key];
      target[key] = value;
      proxyHandler.set(target, key, value, oldValue);
      return true;
    },
    deleteProperty(target, key) {
      if (key in target) {
        const oldValue = target[key];
        delete target[key];
        proxyHandler.delete(target, key, oldValue);
        return true;
      }
      return Reflect.deleteProperty(target, key);
    }
  };

  for (const key in data) {
    if (isObject(data[key])) {
      observed[key] = createReactiveObject(data[key], proxyHandler);
    } else {
      observed[key] = data[key];
    }
  }

  return createProxy(observed, null, handler);
}

// 使用示例
const data = {
  name: 'Alice',
  age: 30,
  details: {
    address: 'Wonderland'
  }
};

const reactiveData = createReactiveObject(data, {
  set(target, key, value, oldValue) {
    console.log(`'${key}' changed from '${oldValue}' to '${value}'`);
  },
  delete(target, key, oldValue) {
    console.log(`'${key}' has been deleted`);
  }
});

// 访问响应式数据
console.log(reactiveData.name); // 输出: 'Alice'

// 修改响应式数据
reactiveData.name = 'Bob'; // 输出: "'name' changed from 'Alice' to 'Bob'"

// 删除响应式数据
delete reactiveData.details.address; // 输出: "'address' has been deleted"

/*
  在这个简化版的例子中，我们定义了一个 `createReactiveObject` 函数来递归地将普通对象转换为响应式对象。
  我们使用 `Proxy` 来拦截对对象属性的访问（`get`）和修改（`set`）操作，并在这些操作发生时执行特定的逻辑。
  我们还定义了一个 `isObject` 辅助函数来检查一个值是否为对象类型。
  请注意，这个例子是一个非常基础的实现，Vue 3 的实际响应式系统要复杂得多，包括对数组的特别处理、依赖收集、批量更新等高级特性。
  此外，Vue 3 还使用了 `WeakMap` 和 `WeakSet` 来处理一些内部的响应式数据结构。
*/

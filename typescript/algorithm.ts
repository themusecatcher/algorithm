class Store {
  private store: Map<string, string>
  private promises: Map<string, Promise<string>>
  private resolvers: Map<string, (value: string) => void>

  constructor() {
    this.store = new Map()
    this.promises = new Map()
    this.resolvers = new Map()
  }

  get(key: string) {
    return this.store.get(key)
  }

  set(key: string, value: string) {
    this.store.set(key, value)
    
    // 如果有等待该key的promise，则resolve它
    if (this.resolvers.has(key)) {
      const resolve = this.resolvers.get(key)
      if (resolve) {
        resolve(value)
        this.resolvers.delete(key)
      }
    }
  }

  async waitSet(key: string, value: string) {
    this.set(key, value)
  }

  async waitGet(key: string) {
    // 如果值已经存在，直接返回
    if (this.store.has(key)) {
      return this.store.get(key)
    }
    
    // 如果值不存在，创建一个promise等待值被设置
    if (!this.promises.has(key)) {
      this.promises.set(key, new Promise((resolve) => {
        this.resolvers.set(key, resolve)
      }))
    }
    
    return this.promises.get(key)
  }
}

const store = new Store();
(async () => {
  store.set('name', 'UAI')
  console.log(store.get('name')) // UAI
  setTimeout(() => {
      store.waitSet('token', 'UAI_WAIT')
  }, 5000)
  const waitName = await store.waitGet('token')
  console.log(waitName) // 五秒后打印 UAI_WAIT
})()

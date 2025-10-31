const obj = {
  fn1: () => console.log(this), // 定义函数时的对象
  fn2: function () { console.log(this) }, // （使用或运行或执行）函数时的对象
  fn3: this
}
obj.fn1() // Window 对象（浏览器环境时）
obj.fn2() // obj: {fn1: ƒ, fn2: ƒ, fn3: Window}
console.log(obj.fn3) // Window 对象（浏览器环境时）

// in 操作符，无论 'name' 属性存在于实例中还是原型中，都会返回 true
Object.prototype.name = 'curry'
console.log(obj.__proto__ === Object.prototype) // true
console.log(Object.prototype.__proto__ === null) // true
console.log(obj.hasOwnProperty('name')) // false，只有存在于对象实例中时，才会返回 true
console.log('name' in obj) // true，存在于原型中

function Person() {
}
Person.prototype.name = "Curry"
Person.prototype.age = 31
Person.prototype.job = "Software Engineer"
Person.prototype.sayName = function () {
  console.log(this.name)
}
var person1 = new Person()
var person2 = new Person()

person1.name = "Stephen"
console.log(person1.hasOwnProperty("name"))  // true, "Stephen" —— 来自实例
console.log(person2.hasOwnProperty("name"))  // false, "Curry" —— 来自原型

/*
  原型：
  显式原型：每个函数 function 都有一个 prototype，这个就是显式原型
  隐式原型：每个实例对象都有一个 __proto__，这个就是隐式原型
  每个实例对象的 __proto__ 都等于其构造函数的 prototype，它们都指向原型对象
  也就是 函数的是显式原型，实例对象的是隐式原型。
	• prototype 与 __proto__ 的联系
	  prototype 与 __proto__ 都指向原型对象，
    任意一个函数（包括构造函数）都有一个 prototype 属性，指向该函数的原型对象，
    任意一个构造函数实例化的对象，都有一个 __proto__ 对象,它指向构造函数的原型对象.
	• prototype 与 __proto__ 的区别
		prototype 是函数独有的，而 __proto__ 是每个对象都会拥有的（包括函数）
		prototype 的作用是保存所有实例公共的属性和方法；
    原型链：
      当试图访问一个对象的某个属性时，会先在对象自身中寻找，如果对象本身没有这个属性，
      则会去它的隐式原型 __proto__（也即它的构造函数的显式原型 prototype）中寻找，
      如果没有，则会去它的原型的原型中去寻找，直到找到 Object 对象的原型，如果依然没有，则返回 undefined
    s.__proto__ === Student.prototype  prototype 还有一个 constructor 属性,指向该对象的构造函数本身
*/
/*
  new 运算符允许开发人员创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。
  描述
  当使用 new 关键字调用函数时，该函数将被用作构造函数。new 将执行以下操作：
  1.创建一个空的简单 JavaScript 对象。为方便起见，我们称之为 newInstance。
  2.如果构造函数的 prototype 属性是一个对象，则将 newInstance 的 [[Prototype]] 指向构造函数的 prototype 属性，
    否则 newInstance 将保持为一个普通对象，其 [[Prototype]] 为 Object.prototype。

  备注： 因此，通过构造函数创建的所有实例都可以访问添加到构造函数 prototype 属性中的属性/对象。

  3.使用给定参数执行构造函数，并将 newInstance 绑定为 this 的上下文（换句话说，在构造函数中的
    所有 this 引用都指向 newInstance）。
  4.如果构造函数返回非原始值，则该返回值成为整个 new 表达式的结果。否则，如果构造函数未返回任何值或返回了一个原始值，
    则返回 newInstance。（通常构造函数不返回值，但可以选择返回值，以覆盖正常的对象创建过程。）

  在 JavaScript 中，非原始值（Non-primitive values）是指所有不是原始类型（primitive types）的值，
  它们本质上是对象（Object）或派生自对象的特殊类型。
  核心特征：
    1.引用类型：存储的是内存地址（引用），而不是实际值
    2.可变性：创建后内容可以被修改
    3.按引用比较：比较的是内存地址而非内容

  非原始值类型：
  类型	示例	说明
  对象	{ name: 'John' }	普通对象
  数组	[1, 2, 3]	特殊类型的对象
  函数	function() {}	可执行对象
  日期	new Date()	日期对象
  正则表达式	/pattern/	正则对象
  包装对象	new String("hello")	原始值的对象包装
  Map/Set	new Map(), new Set()	ES6 新增集合类型
  自定义类	class MyClass {}	用户定义的对象类型


  构造函数就是一个普通的函数，创建方式和普通函数没有区别，不同的是：
	· 构造函数习惯上首字母大写
	· 调用方式的不同，普通函数是直接调用，而构造函数需要使用new关键字来调用。
  function Person () {} // 构造函数，函数都有一个属性prototype（即：Person.prototype）
  var player = new Person() // 对象 player 为实例，对象都有一个属性__proto__（即player.__proto__）
  Person.prototype === player.__proto__ // true
  Person.prototype.constructor === Person
  new 关键字会进行如下操作：
	① 创建一个空的简单 JavaScript 对象（即{}），即新的实例对象
	② 为步骤1新创建的对象添加属性 __proto__ ，将该属性链接至构造函数的原型对象
	③ 执行构造函数，同时将步骤1新创建的对象绑定为this的上下文（即将this绑定到新创建的对象）
  ④ 如果构造函数返回非原始值，该返回值成为整个 new 表达式的结果。如果未返回任何值或返回原始值，则返回该实例对象。
*/
function Person1(name) {
  this.name = name
  return null // 未返回任何值或返回了一个原始值（如 null 或 undefined），则返回创建的新实例对象
}
function Person2(name) {
  this.name = name
  return { name: 'John' } // 返回一个对象（非原始值），则 new 表达式的结果为这个对象，而不是 this 指向的新实例
}
function Person3(name) {
  this.name = name
  return new String('hello') // 返回一个非原始值，则 new 表达式的结果为这个对象，而不是 this 指向的新实例
}
const person1 = new Person1('curry')
const person2 = new Person2('curry')
const person3 = new Person3('curry')
console.log('person1:', person1.__proto__.__proto__) // Person1 { name: 'curry' } 实例对象
console.log('person2:', person2) // { name: 'John' }
console.log('person3:', person3) // [String: 'hello']

console.time('prototype')
const obj = new Object() // 等价于 const obj = {}
const arr = new Array() // 等价于 const arr = []
const fn = function () {}
const date = new Date()
const reg = new RegExp('at', 'g')
const err = new Error()
const newTru = new Boolean(true) // typeof：oject
const newNum = new Number(3) // typeof：object
const newStr = new String('world') // typeof：object
const tru = true // typeof：boolean
const num = 5 // typeof：number
const str = 'world' // typeof：string
console.log('typeof obj:', typeof obj) // object
console.log('typeof arr:', typeof arr) // object
console.log('typeof fn:', typeof fn) // function
console.log('typeof date:', typeof date) // object
console.log('typeof reg:', typeof reg) // object
console.log('typeof err:', typeof err) // object
console.log('typeof null:', typeof null) // object
console.log('typeof newTru:', typeof newTru) // object
console.log('typeof newNum:', typeof newNum) // object
console.log('typeof newStr:', typeof newStr) // object
console.log('typeof undefined:', typeof undefined) // undefined
console.log('typeof tru:', typeof tru) // boolean
console.log('typeof num:', typeof num) // number
console.log('typeof str:', typeof str) // string
console.log(obj.__proto__ === Object.prototype) // true
console.log(arr.__proto__ === Array.prototype) // true
console.log(fn.__proto__ === Function.prototype) // true
console.log(date.__proto__ === Date.prototype) // true
console.log(reg.__proto__ === RegExp.prototype) // true
console.log(tru.__proto__ === Boolean.prototype) // true
console.log(num.__proto__ === Number.prototype) // true
console.log(str.__proto__ === String.prototype) // true
console.log(Object.prototype.__proto__) // null
console.log(Array.prototype.__proto__ === Object.prototype) // true
console.log(Function.prototype.__proto__ === Object.prototype) // true
console.log(Date.prototype.__proto__ === Object.prototype) // true
console.log(RegExp.prototype.__proto__ === Object.prototype) // true
console.log(Boolean.prototype.__proto__ === Object.prototype) // true
console.log(Number.prototype.__proto__ === Object.prototype) // true
console.log(String.prototype.__proto__ === Object.prototype) // true

console.log('Object.__proto__:', Object.__proto__)
console.log('Function.prototype:', Function.prototype)
console.log(Object.__proto__ === Function.prototype) // true
console.log('obj.toString():', obj.toString()) // [object Object]

function Player (name) {
  this.name = name
  // return this // 默认返回this对象
}
const curry = new Player('curry')
console.log('curry:', curry)
console.log('curry.__proto__:', curry.__proto__)
console.log(curry.__proto__ === Player.prototype) // true
console.log('Player.prototype:', Player.prototype)
console.log('Player.prototype.__proto__:', Player.prototype.__proto__)
console.log(Player.prototype.__proto__ === Object.prototype) // true
console.log(Object.prototype.__proto__) // null，Object的隐式原型__proto__指向null
console.timeEnd('prototype')
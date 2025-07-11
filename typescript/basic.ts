/* 基础类型 */

let isDone: boolean = false
let score: number = 100
let str: string = 'TypeScript'
let data: null = null
let value: undefined = undefined
let key: symbol = Symbol()

/* 复合类型 */

// 数组类型
let nums: number[] = [1, 2, 3]
let users: Array<string> = ['Alice', 'Bod']

// 元组
let person: [string, number] = ['Alice', 18]

// 对象类型
let user: { name: string, age?: number } = { name: 'Alice' }

// 接口声明
interface User {
  id: number
  name: string
  email?: string // 可选属性
  readonly createdAt: Date // 只读属性
}

// 枚举类型
enum UserRole {
  Admin = 'ADMIN',
  Editor = 'EDITOR',
  Guest = 'GUEST'
}

const role: UserRole = UserRole.Admin

/* 函数类型 */

// 普通函数
function greet(name: string): string {
  return `Hello, ${name}`
}
// 箭头函数
const add = (a: number, b: number): number => a + b

/* 高级类型 */

// 联合类型
type ID = string | number

// 交叉类型
interface Named { name: string }
interface Aged { age: number }

type Person = Named & Aged // { name: string, age: number }

// 字面量类型
type ButtonSize = 'small' | 'middle' | 'large'
type Answer = true | false | 42

/* 工具类型 */

interface User {
  id: number
  name: string
  email?: string // 可选属性
  readonly createdAt: Date // 只读属性
}
type PartialUser = Partial<User> // 所有属性可选
type RequiredUser = Required<User> // 所有属性必选
type ReadonlyUser = Readonly<User> // 只读属性，属性值均不允许修改
type UserNames = Pick<User, 'name'> // 属性筛选 { name: string }
type omitUser = Omit<User, 'email' | 'createdAt'> // 属性排除 { id: number, name: string }

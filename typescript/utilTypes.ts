// 工具类型 Partial<Type> & Required<Type> & Readonly<Type 默认均为浅层操作

// 将类型 Type 的所有属性变为 可选（即添加 ? 修饰符），生成一个新类型。
type MyPartial<T> = {
  [P in keyof T]?: T[P] | undefined
}
/**
 * keyof T：获取 T 的所有属性名组成的联合类型。
 * [P in keyof T]：映射类型，遍历 T 的所有键组成的联合类型。
 * ?:：为每个属性添加可选修饰符。
 */

// 将类型 Type 的所有属性变为 必选（即移除 ? 修饰符），生成一个新类型。
type MyRequired<T> = {
  [P in keyof T]-?: T[P]
}
/**
 * -?：移除属性的可选修饰符（- 表示移除修饰符）。
 */


// 将类型的所有属性设置为只读（readonly）
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}
/**
 * readonly：为每个属性添加只读修饰符。
 */

// 深层 Partial<Type> & Required<Type> & Readonly<Type>  实现

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] | undefined
}

type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P]
}

type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

/*
  T: Type 表示通用类型
  K: Keys 表示对象类型的属性键
  P: Property 表示对象的属性（键）
  keyof：如 [keyof T]（生成联合类型）作用于类型，生成一个类型的所有属性名（键）的联合类型。
  in：如 [in K]（遍历联合类型）作用于显式定义的联合类型，生成映射类型的属性。（在映射类型中遍历一个联合类型的成员，生成新属性）
*/

// 泛型类型工具 Pick<T, K> & Omit<T, K> & Record<K, T> 实现

// 从类型 T 中选取指定的属性集合 K，生成新的类型。
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}
/**
 * K extends keyof T：约束 K 必须是 T 的所有键组成的联合类型的子集。
 * 遍历 K 中的每个属性并保留其类型。
 */

// 从类型 T 中 排除指定的属性集合 K，生成新的类型。
type MyOmit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P]
}
/**
 * Exclude<keyof T, K>：先通过 Exclude 移除 T 中属于 K 的键名（属性名）。
 * 再遍历剩余的属性并保留其类型
 */

// 或 MyRecord<K extends keyof any, T> = { [P in K]: T }
// keyof any: string | number | symbol
type MyRecord<K extends string | number | symbol, T> = {
  [P in K]: T
}
/**
 * K extends keyof any：约束 K 必须是 string | number | symbol 的子类型。
 * [P in K]：遍历联合类型 K 的每一项作为键。
 */

// 工具类型 Extract<T, U> & Exclude<T, U> 实现

// 从类型 T 中排除所有可以赋值给 U 的类型成员，生成一个新的联合类型。
type MyExclude<T, U> = T extends U ? never : T
/**
 * 分布式条件类型：当 T 是联合类型时，会按成员分发执行条件判断。
 * T extends U ? never : T：若 T 的成员属于 U，返回 never（被排除），否则保留。
 */

// 从类型 T 中提取所有可以赋值给 U 的类型成员，生成一个新的联合类型
type MyExtract<T, U> = T extends U ? T : never
/**
 * 与 Exclude 逻辑相反：保留属于 U 的成员，排除不属于的。
 */

// 从 T 中排除 null 和 undefined 类型
type MyNonNullable<T> = T & {} // T extends null | undefined ? never : T
/**
 * 从类型 T 中剔除 null 和 undefined。
 * 条件类型判断：若 T 是 null | undefined，返回 never，否则保留。
 * {} 的含义：
 *  {} 表示一个非 null 且非 undefined 的类型（即 TypeScript 中的“空对象类型”，它匹配任何非空值）。
 *  例如：string、number、object、{ name: string } 都符合 {}，但 null 和 undefined 不符合。
 * 交叉类型 T & {}：
 *  它会将 T 与 {} 合并，要求结果同时满足 T 和 {} 的约束。
 *  如果 T 包含 null 或 undefined，交叉运算会将这些无效类型过滤掉。
 *  最终类型是 T 中所有非空子类型的联合。
 */

// 获取函数类型 T 的参数类型组成的元组类型
type MyParameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never
/**
 * infer P：在条件类型中推断函数参数的类型并保存到 P 中。
 */

// 获取函数类型 T 的返回值类型
type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any
/**
 * 使用 infer R 推断函数返回值类型
 */

// 获取构造函数类型 T 的实例类型
type MyInstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any
/**
 * 针对构造函数（含 new 关键字），推断其返回的实例类型 R
 */

// 示例

export type User = {
  name: string
  age: boolean
  sex: 'boy' | 'girl'
}

type UserKeys = keyof User // 'name' | 'age' | 'sex'
type UserProps = User[UserKeys] // string | boolean | 'boy' | 'girl'
type UserExtract = Extract<User, string> // never
type UserExclude = Exclude<User, string> // User
type UserExtract2 = MyExtract<keyof User, string> // 'name' | 'age' | 'sex'
type UserExclude2 = MyExclude<User[keyof User], string> // boolean

interface Person {
  name: string
  age: number
  height: number
  weight: string // 不是 number 类型
  isStudent: boolean
}

type NumberProperties<T> = {
  [K in keyof T]: T[K] extends number ? K : never
}[keyof T]
// TypeScript 会自动移除 never 类型的属性，生成最终的映射类型
type PersonNumberProps = NumberProperties<Person> // 'age' | 'height'

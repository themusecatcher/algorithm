// 工具类型 Partial<Type> & Required<Type> & Readonly<Type 默认均为浅层操作

// 将类型 Type 的所有属性变为 可选（即添加 ? 修饰符），生成一个新类型。
type MyPartial<T> = {
  [P in keyof T]?: T[P] | undefined
}

// 将类型 Type 的所有属性变为 必选（即移除 ? 修饰符），生成一个新类型。
type MyRequired<T> = {
  [P in keyof T]-?: T[P]
}

// 将类型的所有属性设置为只读（readonly）
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}

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

// 从类型 T 中选取 指定的属性集合 K，生成新的类型。
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}

// 从类型 T 中 排除指定的属性集合 K，生成新的类型。
type MyOmit<T, K extends keyof T> = { [P in Exclude<keyof T, K>]: T[P] }

// 或 MyRecord<K extends keyof any, T> = { [P in K]: T }
type MyRecord<K extends string | number | symbol, T> = {
  [P in K]: T
}

// 工具类型 Extract<T, U> & Exclude<T, U> 实现

// 从类型 T 中提取所有可以赋值给 U 的类型成员，生成一个新的联合类型
type MyExtract<T, U> = T extends U ? T : never

// 从类型 T 中排除所有可以赋值给 U 的类型成员，生成一个新的联合类型。
type MyExclude<T, U> = T extends U ? never : T

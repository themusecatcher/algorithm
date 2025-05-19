// 工具类型 Partial<Type> & Required<Type> & Readonly<Type 默认均为浅层操作

type MyPartial<T> = {
  [P in keyof T]?: T[P] | undefined
}

type MyRequired<T> = {
  [P in keyof T]-?: T[P]
}

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

// 泛型类型工具 Pick<T, K> & Omit<T, K> & Record<K, T> 实现

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}

type MyOmit<T, K extends keyof T> = { [P in Exclude<keyof T, K>]: T[P] }

// 或 MyRecord<K extends keyof any, T> = { [P in K]: T }
type MyRecord<K extends string | number | symbol, T> = {
  [P in K]: T
}

export const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000
}

// 鼠标悬停 ConfigType 查看，等价于 { apiUrl: string; timeout: number; }
type ConfigType = typeof config  // 推断出类型

/**
 * 类型 vs 值
 * - 类型（Type）：只在编译时存在，用于 TypeScript 的类型检查。
 * - 值（Value）：在运行时存在，是实际的数据。
 * 
 * 
 * typeof ***，这是一个经典的 "重载"（overloading）问题——同一个关键字 typeof，在 JavaScript 和 TypeScript 中扮演完全不同的角色，发生在不同的阶段。
 * 
 * 1. JavaScript 中的 typeof（运行时操作符）
 * 作用：返回一个字符串，表示操作数的运行时类型。
 * 
 * console.log(typeof {});          // "object"
 * console.log(typeof "hello");     // "string"
 * console.log(typeof 42);          // "number"
 * console.log(typeof undefined);   // "undefined"
 * 
 * - 执行时机：代码运行时。
 * - 输出：固定的几个字符串值之一（"object"、"string"、"number"、"undefined" 等）。
 * - 本质：JavaScript 语言内置的操作符，用于动态类型检查。
 * 
 * 
 * 2. TypeScript 中的 typeof（类型查询操作符）
 * 作用：在类型层面推导出变量或表达式的静态类型结构。
 * 
 * const config = { apiUrl: 'https://example.com', timeout: 5000 };
 * type ConfigType = typeof config;  // { apiUrl: string; timeout: number; }
 * const arr = [1, 2, 3];
 * type ArrType = typeof arr;  // number[]
 * 
 * 执行时机：代码编译时（类型检查阶段）。
 * 输出：一个类型，描述值的结构（属性名、类型、是否可选等）。
 * 本质：TypeScript 类型系统的操作符，用于类型推导和复用。
 * 
 * 
 * 为什么能共存？—— 编译时 vs 运行时
 * 
 * TypeScript 编译器会区分上下文（即根据上下文区分 typeof 的含义）：
 * 
 * 在类型位置（如 type、interface 后）→ 类型查询
 * type T = typeof obj;  // TypeScript 的 typeof：推导类型
 * 在值位置（如表达式、函数体）→ JavaScript 操作符
 * const s = typeof obj;  // JavaScript 的 typeof：返回字符串
 * 
 * 编译后，TypeScript 的类型信息会被完全擦除
 * 
 * 
 * 编译前（TypeScript）
 * const obj = { x: 1 };
 * type T = typeof obj;    // { x: number; }
 * const s = typeof obj;   // "object"
 * 编译后（JavaScript）
 * const obj = { x: 1 };
 * type T = ... ← 完全消失，不存在于运行时
 * const s = typeof obj;   // "object"（保留，因为这是 JavaScript 代码）
 * 
 */
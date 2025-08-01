/* 

import { ref } from 'vue'

// 因为需要得到 T 的实例，所以需要约束 T 的类型必须继承自一个类（即必须是一个构造函数类型）
export function useCompRef<T extends abstract new (...args: any) => any>(
  _comp: T // 通过类型推导获得 T 的类型，下划线表示该参数在函数体内未被使用，不要给我报错
) {
  return ref<InstanceType<T>>()
}

// 使用
import { useCompRef } from './useCompRef'

const form = useCompRef(Form)

form.value.validate()
*/
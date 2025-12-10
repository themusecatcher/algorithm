/*
  比较两个字符串的大小
  两个字符串都是用 - 连接的数字，比如 1-2-33-41-5
  比较方式是从左到右，依次比较每个数字的大小，遇到相等的数字继续往后比较，
  遇到不同的数字直接得到比较结果

  s1 > s2 return 1
  s1 < s2 return -1
  s1 === s2 return 0
*/
function compare(s1, s2) {
  const iter1 = walk(s1)
  const iter2 = walk(s2)
  while(1) {
    const { done: d1, value: v1 } = iter1.next()
    const { done: d2, value: v2 } = iter2.next()
    if (d1 && d2) {
      return 0
    }
    if (d1) {
      return -1
    }
    if (d2) {
      return 1
    }
    if (v1 < v2) {
      return -1
    }
    if (v1 > v2) {
      return 1
    }
  }
}
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator
function* walk(str) {
  let s = ''
  for (const char of str) {
    if (char === '-') {
      yield Number(s)
      s = ''
    } else {
      s += char
    }
  }
  if (s) {
    yield Number(s)
  }
}
const s1 = '1-2-333-41-5'
const s2 = '1-2-221-33-41'
const iter = walk(s1)
console.log(iter.next()) // { value: 1, done: false }
console.log(iter.next()) // { value: 2, done: false }
console.log(iter.next()) // { value: 33, done: false }
console.log(iter.next()) // { value: 41, done: false }
console.log(iter.next()) // { value: 5, done: false }
console.log(iter.next()) // { value: undefined, done: true }

console.log(compare(s1, s2))

/*
  01背包问题（DP: Dynamic Programming 动态规划）
  给定一个背包最大承重为 bagWeight，物品列表 itemsValue 和 itemsWeight，
  itemsValue: 表示每个物品的价值
  itemsWeight: 表示每个物品的重量
  求背包能装下物品的最大价值是多少？
*/

function backpack(bagWeight, values, weights) {
  let res = []
  // 求第一行结果（即只装第一个物品 values[0]时）
  // res[j]：表示背包承重为 j 时，只装第一个物品的最大价值
  for (let j = 0; j <= bagWeight; j++) { // j 表示背包的承重
    res[j] = j > weights[0] ? values[0] : 0
  }
  console.log(res)
  // 求下一行结果（即依次计算只装前 2,3,4... 个物品时的最大价值）
  for (let i = 1; i < values.length; i++) { // i 表示物品的索引
    let next = [] // 当前结果可凭借上一行结果得出
    for (let j = 0; j <= bagWeight; j++) {
      if (j <  weights[i]) { // 装不下时
        next[j] = res[j] // 当前最大价值等上一次的最大价值
      } else { // 装得下
        /*
          装还是不装，取最大值
          res[j]：表示不装第 i 个物品时的最大价值
          res[j - weights[i]] + values[i]：表示装第 i 个物品时的最大价值
          j - weights[i]：表示装第 i 个物品后，背包剩余的承重
        */
        next[j] = Math.max(res[j], res[j - weights[i]] + values[i])
      }
    }
    res = next
  }
  return res[bagWeight] // 当前数组的最后一项即为背包能装下物品的最大价值
}
const bagWeight = 6
const itemsValue = [5, 10, 3, 6, 3]
const itemsWeight = [2, 5, 1, 4, 3]
console.log(backpack(bagWeight, itemsValue, itemsWeight))

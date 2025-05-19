const people = [
  {  name: 'Alice', age: 25, sex: 'female' },
  {  name: 'Bob', age: 30, sex: 'male' },
  {  name: 'Charlie', age: 30, sex: 'male' },
  {  name: 'David', age: 25, sex: 'male' },
  {  name: 'Edith', age: 30, sex: 'female' },
  {  name: 'Frank', age: 25, sex: 'male' },
  {  name: 'Grace', age: 25, sex: 'female' },
  {  name: 'Hannah', age: 30, sex: 'female' },
]
// 通用分组函数封装
function groupBy(arr, generateKey) {
  if (typeof generateKey === 'string') {
    const propsName  = generateKey;
    generateKey = (item) => item[propsName]
  }
  const res = []
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    const key = generateKey(item, i, arr)
    if (!res[key]) {
      res[key] = []
    }
    res[key].push(item)
  }
  return res
}

// 按照性别分组
const result1 = groupBy(people, 'sex')
console.log(result1)
// 按照年龄分组
const result2 = groupBy(people, (item) => {
  if (item.age < 30) {
    return 'young'
  } else {
    return 'old'
  }
})
console.log(result2)
// 按照性别+年龄分组
const result3 = groupBy(people, (item) => `${item.sex}-${item.age}`)
console.log(result3)
// 按照奇偶分组
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const result4 = groupBy(numbers, (n) => (n % 2 === 0 ? 'even' : 'odd'))
console.log(result4)

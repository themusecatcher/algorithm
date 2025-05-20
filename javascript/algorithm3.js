/*
const obj = {
	a: { b: 1, c: 2, d: { e: 5 } },
	b: [ 1, 3, { a: 2, b: 3 } ],
	c: 3
}
实现一个方法，可以将上述对象转化得到如下结果：
{
	'a.b': 1,
	'a.c': 2,
	'a.d.e': 5,
	'b[0]': 1,
	'b[1]': 3,
	'b[2].a': 2,
	'b[2].b': 3
	c: 3
}
*/
function transform(obj) {
  let res = {}
  function findRes (obj, pKey, isArray) {
    let res = {}
    for (const key in obj) {
      let tempRes = {}
      if (typeof obj[key] === 'number') {
        tempRes = { [ isArray ? `${pKey}[${key}]` : [`${pKey}.${key}`] ]: obj[key] }
      } else {
        tempRes = { ...tempRes, ...findRes(obj[key], isArray ? `${pKey}[${key}]` : [`${pKey}.${key}`]) }
      }
      res = { ...res, ...tempRes }
    }
    return res
  }
  const keys = Object.keys(obj)
  keys.forEach(key => {
    if (typeof obj[key] === 'number') {
      res = { ...res, [key]: obj[key] }
    } else {
      res = { ...res, ...findRes(obj[key], key, Array.isArray(obj[key])) }
    }
  })
  return res
}
const obj = {
	a: {b: 1, c: 2, d: {e: 5}},
	b: [1, 3, {a: 2, b: 3}],
	c: 3
}
console.log(transform(obj))

/*
  最长递增子系列
  输入：[1, 3, 5, 2, 4, 6, 7]
  输出：[1, 3, 5, 6, 7]
*/
function LIS(nums) {
  if (nums.length === 0) {
    return []
  }
  const res = [[nums[0]]]
  function updateRes (n) {
    for (let i = res.length - 1; i >= 0; i--) {
      const line = res[i]
      const last = line[line.length - 1]
      if (n > last) {
        res[i + 1] = [...line, n]
        return
      }
    }
    res[0] = [n]
  }
  for (let i = 1; i < nums.length; i++) {
    updateRes(nums[i])
  }
  return res[res.length - 1]
}
console.log(LIS([4, 5, 1, 2, 7, 3, 6, 9])) // [1, 2, 3, 6, 9]

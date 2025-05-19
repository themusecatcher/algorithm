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

/*
  解压字符串
  uncompress('3(ab)') // 'ababab'
  uncompress('3(ab2(c))') // 'abccabccabcc'
*/

/*
  数组拍平
  arr: ['hello', 'world', 1, [2], [3, [4]], [[[5], 6]]]
*/
function flat(arr, depth) {
  if (depth <= 0) {
    return arr
  }
  const res = []
  for (const item of arr) {
    if (Array.isArray(item)) {
      res.push(...flat(item, depth - 1))
    } else {
      res.push(item)
    }
  }
  return res
}
const nestedArr = ['hello', 'world', 1, [2], [3, [4]], [[[5], 6]]]
console.log(flat(nestedArr, 0))
console.log(flat(nestedArr, 1))
console.log(flat(nestedArr, 2))
console.log(flat(nestedArr, 3))
/*
  判断是否存在循环依赖
  pkgs = [
    {
      name: 'a',
      dependencies: {
        'b': '^1.0.0'
      }
    },
    {
      name: 'b',
      dependencies: {
        'c': '^1.0.0'
      }
    },
    {
      name: 'c',
      dependencies: {
        'a': '^1.0.0'
      }
    }
  ]
*/

function findCircle (pkgs) {
  const pkgsObj = {}
  pkgs.forEach(pkg => {
    pkgsObj[pkg.name] = Object.keys(pkg.dependencies) || []
  })
  let isVisited = {}
  function isCircle(dependencies) {
    for (const dependency of dependencies) {
      if (dependency in pkgsObj) {
        if (isVisited[dependency]) { // 存在循环依赖
          return true
        } else { // 继续查找依赖
          isVisited[dependency] = true // 标记为已访问
          return isCircle(pkgsObj[dependency])
        }
      }
    }
    return false
  }
  for (const key of Object.keys(pkgsObj)) {
    isVisited = {
      [key]: true // 标记为已访问
    }
    if (isCircle(pkgsObj[key])) {
      return true
    }
  }
  return false
}
const pkgs = [
  {
    name: 'a',
    dependencies: {
      'b': '^1.0.0'
    }
  },
  {
    name: 'b',
    dependencies: {
      'c': '^1.0.0'
    }
  },
  {
    name: 'c',
    dependencies: {
      'a': '^1.0.0'
    }
  }
]
console.log(findCircle(pkgs))

/*
  1、找到所有的treeNode父节点
*/
const data = [
      {
        id: '1897e132-e98e-4d33-9ca4-b884d4079567',
        name: '分组-1',
        parent_id: null
      },
      {
        id: 'fb88c694-df36-42db-9890-429b58674877',
        name: '分组-2',
        parent_id: null
      },
      {
        id: '685a99b5-f8dd-427f-a6df-e43766358e68',
        name: '分组-1-1',
        parent_id: '1897e132-e98e-4d33-9ca4-b884d4079567'
      },
      {
        id: '7c93d559-8c20-4480-83aa-c9fc51c066f0',
        name: '分组-3',
        parent_id: null
      },
      {
        id: '703faaa2-c3ae-49a4-9ebd-c152adc6f91c',
        name: '分组-1-2',
        parent_id: '1897e132-e98e-4d33-9ca4-b884d4079567'
      },
      {
        id: 'b22a266d-9e6a-4ab4-ab6d-4d3fad1e41f0',
        name: '分组-1-3',
        parent_id: '1897e132-e98e-4d33-9ca4-b884d4079567'
      },
      {
        id: '08b7bf26-51f9-43f6-bb46-892397d5f210',
        name: '分组-1-1-1',
        parent_id: '685a99b5-f8dd-427f-a6df-e43766358e68'
      }
    ]
function treeNode (data) {
  function findParent (res, child, childIndex) { // child找对应的父级
    let len = res.length, i = 0
    while (i < len) {
      if (res[i].id === child.parent_id) { // 加入children数组中
        if (res[i].children) {
          res[i].children.push(child)
        } else {
          res[i].children = [child]
        }
        children.splice(childIndex, 1)
        return true
      }
      if (res[i].children) { // 如果存在children数组，递归找父级
        if (findParent(res[i].children, child, childIndex)) { // 只有成功找到才return
          return true
        }
      }
      i++
    }
    return false
  }
  if (data.length < 2) {
    return data
  }
  let res = data.filter(item => !item.parent_id) // 找到所有的顶级
  let children = data.filter(item => item.parent_id) // 得到所有的非顶级
  let i = 0
  while (children.length) { // 直到所有child都找到对应的父级
    if (findParent(res, children[i], i)) {
      i = 0
    } else {
      i++
    }
  }
  return res
}
console.log('treeNode:', treeNode(data))
/*
  2.给定一个匹配格式，给定一段由空格拼接的字符串，判断 s 是否符合 pattern 的格式
  Input: pattern = "abba", s = "dog dog dog dog"
  Output: false

  Input: pattern = "abba", s = "dog cat cat dog"
  Output: true
*/
var findBoolean = function (pattern, s) {
    if (s === '' || pattern === '') return false
    const sArr = s.split(' ')
    const len = sArr.length
    if (pattern.length !== len) return false
    const res = []
    for (let i = 0; i < len; i++) {
      if (!res[i]) { // 该索引位置（即i）没有被匹配替换过
        for(let j = i; j < len; j++) {
          if (!res[j] && sArr[j] === sArr[i]) { // 该索引位置没有被替换过，且
            res[j] = pattern[i]
          }
        }
      }
    }
    if (res.join('') === pattern) {
      return true
    }
    return false
  }
console.log('findBoolean:', findBoolean('abba', 'b a a b'))

/*
  3.删除倒数第n个节点，并返回结果
  Input: [1, 2, 3, 4, 5] n=2
  Output: [1, 2, 3, 5]

  Input: { val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: { val: 5, next: null } } } } }  n = 2
  Output: { val: 1, next: { val: 2, next: { val: 3, next: { val: 5, next: null } } } }
*/
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
function ListNode (val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}
var removeNthFromEnd = function(head, n) {
  let slow = new ListNode()
  slow.next = head
  let fast = head
  let i = 0
  while (i < n) {
    fast = fast.next
    i++
  }
  if (fast === null) { // 只需删除头节点
    return head.next
  }
  while (fast !== null) {
    slow = slow.next
    fast = fast.next
  }
  // 删除 slow.next 节点
  slow.next = slow.next.next
  return head
};
var target = { val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: { val: 5, next: null } } } } }
console.log(removeNthFromEnd(target, 2))
// { val: 1, next: { val: 2, next: { val: 3, next: { val: 5, next: null } } } } 
// console.log(removeNthFromEnd([1, 2, 3, 4, 5], 2))

// 数组去重 [1, 2, 3, 4, 5, 2, 5, 6, 8, 3, 9]
const arr = [1, 2, 3, 4, 5, 2, 5, 6, 7, 8, 3, 9]
console.log('使用set除重:', [...new Set(arr)])
const res = arr.filter(item => arr.indexOf(item) === -1)
console.log('filter去重:', res)
function removingDuplicate (arr) {
  const len = arr.length
  let i = 0
  const res = []
  while (i < len) {
    if (!res.includes(arr[i])) {
      res.push(arr[i])
    }
    i++
  }
  return res
}
console.log('removingDuplicate:', removingDuplicate(arr))

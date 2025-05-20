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

/*
  给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。
  有效 二叉搜索树定义如下：
  1.节点的左子树只包含 小于 当前节点的数。
  2.节点的右子树只包含 大于 当前节点的数。
  3.所有左子树和右子树自身必须也是二叉搜索树。
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
  function recurse (node, lower, upper) {
      if (node === null) return true
      const val = node.val
      if (lower !== null && lower >= val) return false
      if (upper !== null && upper <= val) return false
      if (!recurse(node.left, lower, val)) return false // 递归判断左子树
      if (!recurse(node.right, val, upper)) return false // 递归判断右子树
      return true
  }
  return recurse(root, null, null) //  或 recurse(root, -Infinity, Infinity)
}
/*
  数组去重
*/
const arr = [3, 1, 2, 2, 3, 3, 'a', 'a', NaN, NaN]
const uniqueArr1 = [...new Set(arr)] // ES6+
/*
  时间复杂度 O(n)：高效，适合大数据量。
  无法处理对象：对象引用不同视为不同元素。
  自动处理 NaN：Set 能正确识别 NaN 去重。
*/

console.log(uniqueArr1) // [3, 1, 2, 'a', NaN]

const uniqueArr2 = arr.filter((item, index) => arr.indexOf(item) === index)
/*
  时间复杂度 O(n²)：性能较差，适用于小数据量。
  不处理 NaN：indexOf(NaN) 始终返回 -1，无法去重 NaN。
*/
console.log(uniqueArr2) // [ 3, 1, 2, 'a' ]

// 一个 非严格递增排列 的数组 nums，原地 删除重复出现的元素，使每个元素 只出现一次，返回删除后数组
const nums1 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
/*
  通过 双指针法（快慢指针） 实现原地删除非严格递增数组中重复元素的需求，满足时间复杂度 O(n) 和空间复杂度 O(1)
*/
function removeDuplicates(nums) {
  if (nums.length <= 1) return nums.length
  let slow = 1
  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow - 1]) {
      nums[slow] = nums[fast]
      slow++
    }
  }
  // return slow
  return nums.slice(0, slow)
}
console.log(removeDuplicates(nums1)) // 5: [ 0, 1, 2, 3, 4 ]

// 保留最多 k 次重复 (去重即 k = 1)
const nums2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 3, 3, 4, 5]
function removeDuplicatesK(nums, k) {
  if (nums.length <= k) return nums.length
  let slow = k
  for (let fast = k; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow - k]) {
      nums[slow] = nums[fast]
      slow++
    }
  }
  // return slow
  return nums.slice(0, slow)
}
console.log(removeDuplicatesK(nums2, 1)) // 6: [ 0, 1, 2, 3, 4, 5 ]
// console.log(removeDuplicatesK(nums2, 2)) // 10: [ 0, 0, 1, 1, 2, 2, 3, 3, 4, 5 ]

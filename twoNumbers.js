/**
 * Definition for singly-linked list.
 */
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  const result = new ListNode()
  let cur = result
  let carry = 0
  while (l1 || l2 || carry) {
    const sum = (l1 && l1.val || 0) + (l2 && l2.val || 0) + carry
    carry = Math.floor(sum / 10) // 0 | 1
    cur.val = sum % 10
    if (l1) l1 = l1.next
    if (l2) l2 = l2.next
    if (l1 || l2 || carry) cur.next = new ListNode()
    cur = cur.next
  }
  return result
}
const l1 = { val: 2, next: { val: 4, next: { val: 3, next: null } } }
const l2 = { val: 5, next: { val: 6, next: { val: 4, next: null } } }
console.log('result', addTwoNumbers(l1, l2))
/*
result: ListNode {
  val: 7,
  next: ListNode { val: 0, next: ListNode { val: 8, next: null } }
}
*/
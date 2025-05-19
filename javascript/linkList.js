// 将一个整数插入到已排序的链表中，不破坏原有的排序

function insertList (head, node) {
  node.next = head
  return node
}
const head = { val: 2, next: null }
const node = { val: 1, next: null }
console.log('insertList', insertList(head, node))

// 重排链表为：L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → …
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
function ListNode (val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}
var reorderList = function(head) {
  function middleNode (head) { // 寻找链表的中间节点，奇数时是中间节点的下一节点
    let slow = new ListNode()
    let odd = false
    slow.next = head
    let fast = head
    while (fast !== null) {
      slow = slow.next
      fast = fast.next
      if (fast !== null) {
        fast = fast.next
      } else { // 链表节点个数为奇数
        odd = true
      }
    }
    return [slow.next, odd]
  }
  function reverseList (head) { // 翻转链表
    let ans = null
    while (head !== null) {
      const next = head.next
      head.next = ans
      ans = head
      head = next
    }
    return ans
  }
  const [middleHead, odd] = middleNode(head) // 获取中间节点 & 链表节点个数是否为奇数
  let reverseHead = reverseList(middleHead) // 翻转链表
  const res = new ListNode()
  let cur = res
  while (reverseHead !== null) {
    const next = head.next
    head.next = reverseHead
    cur.next = head
    cur = reverseHead
    head = next
    reverseHead = reverseHead.next
  }
  if (odd) { // 奇数时再多加一个 head 节点
    head.next = null
    cur.next = head
  }
  return res.next
};
const list = { val: 1, next: { val: 2, next: { val: 3, next: { va: 4, next: null } } } }
console.log('reorderList', reorderList(list))

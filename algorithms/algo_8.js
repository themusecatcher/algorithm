/**
 * 验证回文串
 * 回文串：一个字符串，忽略大小写和非字母数字，正着读和倒着读都一样的
 * 例如：
 * 'abcba' 是回文串，'abc' 不是回文串，
 * 'A man, a plan, a canal: Panama' 是回文串，'race a car' 不是回文串
 */
function isPalindrome(str) {
  let left = 0, right = str.length - 1
  const isValid = (char) => {
    return char >= 'a' && char <= 'z' || char >= '0' && char <= '9'
  }
  while (left < right) {
    const leftChar = str[left].toLowerCase()
    const rightChar = str[right].toLowerCase()
    if (!isValid(leftChar)) {
      left++
    } else if (!isValid(rightChar)) {
      right--
    } else if(leftChar === rightChar) {
      left++
      right--
    } else {
      return false
    }
  }
  return true
}
console.log(isPalindrome('A man, a plan, a canal: Panama')) // true
console.log(isPalindrome('race a car')) // false
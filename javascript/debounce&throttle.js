/*
  防抖（debounce）：对于短时间内连续触发的事件（上面的滚动事件），
  防抖就是让某个时间期限（如上面的1000毫秒）内，事件处理函数只执行一次。
*/
function debounce(fn: Function, delay: number = 300): Function {
  let timer: any = null // 使用闭包保存定时器的引用
  return function (...args: any[]) {
    // 返回一个包装函数
    if (timer) {
      // 如果定时器存在，则清除之前的定时器
      clearTimeout(timer)
    }
    // 设置新的定时器，延迟执行原函数
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
function showTop  () {
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop
  console.log('滚动条位置：' + scrollTop)
}
window.onscroll = debounce(showTop, 300)

/*
  节流（throttle）：如果短时间内大量触发同一事件，那么在函数执行一次之后，
  该函数在指定的时间期限内不再工作，直至过了这段时间才重新生效。
*/
function throttle(fn: Function, delay: number = 300): Function {
  let valid = true // 用于标记函数是否可以执行
  return function (...args: any[]) {
    if (!valid) return false // 返回 false，表示当前不执行函数
    // 返回一个新的函数，该函数负责执行节流逻辑
    if (valid) {
      fn(...args) // 执行原函数
      valid = false // 将函数置为无效
      setTimeout(() => {
        valid = true
      }, delay)
    }
  }
}
function showTop  () {
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop
  console.log('滚动条位置：' + scrollTop)
}
window.onscroll = throttle(showTop, 1000)
/**
 * 生成漩涡型二维数组，输入行和列，输出漩涡型二维数组
 */

function Vortex(row, column) {
  let res = new Array(row).fill(0).map(() => new Array(column).fill(0))
  let r = 0, c = 0 // 初始位置
  let stepR = 0, stepC = 1 // 初始步长
  let num = 1
  function isBlock() { // 判断是否到达边界
    return !res[r + stepR] || res[r + stepR][c + stepC] !== 0
  }
  while(num <= row * column) {
    res[r][c] = num
    if(isBlock()) {
      // if (stepC === 1) { // 从左向右
      //   // 变为从上向下
      //   stepR = 1
      //   stepC = 0
      // } else if (stepR === 1) { // 从上向下
      //   // 变为从右向左
      //   stepR = 0
      //   stepC = -1
      // } else if (stepC === -1) { // 从右向左
      //   // 变为从下向上
      //   stepR = -1
      //   stepC = 0
      // } else { // 从下向上
      //   // 变为从左向右
      //   stepR = 0
      //   stepC = 1
      // }
      if (stepR === 0) { // 横向移动
        stepR = stepC
        stepC = 0
      } else { // 竖向移动
        stepC = -stepR
        stepR = 0
      }
    }
    r +=  stepR
    c +=  stepC
    num++
  }
  return res
}
console.log(Vortex(4, 5))
console.log(Vortex(6, 6))
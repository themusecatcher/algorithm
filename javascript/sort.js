// js的sort()排序
function compare (a, b) {
	return a - b // 升序
	//return b - a // 降序
}
function compareNum (a, b) {
  // 以对象的某一属性值进行降序
  return b.number - a.number
}
const sortList = [5, 0, 1, 10, -5]
console.log('sort:', sortList.sort())
console.log('compare sort:', sortList.sort(compare))

// 冒泡排序
function bubbleSort (list) {
	var len = list.length
	for (var i = 0; i < len; i++) {
		for (var j = i + 1; j < len; j++) {
			if (list[j] < list[i]) {
				[list[i], list[j]] = [list[j], list[i]]
			}
		}
	}
	return list
}
const bubbleList = [-5, 0, 1, 10, 5]
console.log('bubbleSort:', bubbleSort(bubbleList))

/**
 * 选择排序
 * 
 * 每次从待排序的数据元素中选出最小（或最大）的一个元素，存放在序列的起始位置，直到全部待排序的数据元素排完
 */
const selectList = [5, 0, 1, 10, -5]
function selectSort (list) {
	const len = list.length
	let minIndex = i
	for (let i = 0; i < len - 1; i++) {
		minIndex = i
		for (let j = i + 1; j < len; j++) {
			if (list[j] < list[minIndex]) {
				minIndex = j
			}
		}
    if (minIndex !== i) {
      [list[i], list[minIndex]] = [list[minIndex], list[i]]
    }
	}
	return list
}

console.log('selectSort:', selectSort(selectList))

/**
 * 插入排序
 * 
 * 构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。
 */
const insertList = [5, 0, 1, 10, -5]
function insertSort (list) {
	const len = list.length
	let preIndex, current
	for (let i = 1; i < len; i++) {
		preIndex = i - 1
		current = list[i]
		while (preIndex >= 0 && list[preIndex] > current) {
			list[preIndex + 1] = list[preIndex]
			preIndex--
		}
		list[preIndex + 1] = current
	}
	return list
}
console.log('insertSort:', insertSort(insertList))

const nums = [1, 2, [3, [4]], 5]
console.log('flat-nums:', nums.flat())

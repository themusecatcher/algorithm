/*
  闭包（Closure）是 JavaScript 中的一个核心概念，它指的是 函数与其词法作用域（lexical environment）的组合，
  使得函数能够访问并记住其定义时所处的上下文中的变量，即使该函数在其原始作用域之外被调用。

  闭包由以下要素构成：
  1.函数嵌套：一个函数（内部函数）定义在另一个函数（外部函数）内部。
  2.变量引用：内部函数引用了外部函数作用域中的变量。
  3.外部函数执行完毕：外部函数已经完成执行并退出，但其作用域中的变量仍被内部函数保留引用。
  4.持续访问能力：内部函数在外部函数之外被调用时，仍然可以访问外部函数的变量。

  闭包的作用：闭包常常用来「间接访问一个变量」。换句话说，「隐藏一个变量」

  什么要 return add 呢？
  因为如果不 return，你就无法使用这个闭包。
  把 return add 改成 window.add = add 也是一样的，只要让外面可以访问到这个 add 函数就行。
  所以 return add 只是为了 add 能被使用，也跟闭包无关。
*/
function addLocal () {
	var local = 1
	function add () {
		local++
		return local
	}
	return add
}
var res = addLocal()
console.log('res:', res()) // 2

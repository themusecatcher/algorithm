/**
 * 
 * <div class="switch">
 *  <span class="left"><slot name="close"></slot></span>
 *  <div class="switch-core">
 *    <div class="switch-action"></div>
 *  </div>
 *  <span class="right"><slot name="open"></slot></span>
 * </div>
 */

class ASwitch extends HTMLElement { 
  static observedAttributes = ['default-checked'] // 定义被观察的属性
  // 在 constructor 中初始化或者直接定义在外部
  // state = {
  //   checked: false
  // }
  /**
   * 当浏览器解析到已注册的自定义元素时，创建其示例。
   * 
   * 此时元素可能为加入到 DOM 树，也未拥有任何属性和子项
   * this 指向元素本身
   */
  constructor() {
    super() // 必须要调用父元素的构造函数
    console.log('a-switch', this) // 元素本身
    this.state = {
      checked: false
    }
  }

  /**
   * 被观察的属性变化，更新 UI
   * 
   * @param {string} name - 发生变化的属性名称
   * @param {string|null} oldValue - 属性的旧值
   * @param {string|null} newValue - 属性的新值
   * 
   * 被观察的属性需要通过 static observedAttributes 定义
   * 第一次 attributeChangedCallback 的触发在 connectedCallback 之前
   * 通常在此钩子函数中同步属性数据
   */
  attributeChangedCallback(name, oldValue, newValue) {
    console.log('a-switch attributeChangedCallback', name, oldValue, newValue)
    this.state.checked = this.getAttribute('default-checked') === 'true'
    const core = this.querySelector('.switch-core')
    if (core) {
      this.toggleChecked()
    }
  }

  toggleChecked() {
    const core = this.querySelector('.switch-core')
    /**
     * 可选的 force 参数：如果包含该值，设置后会将方法变成单向操作。
     * 如果设置为 false，仅会删除标记列表中匹配的给定标记，且不会再度添加。
     * 如果设置为 true，仅在标记列表中添加给定标记，且不会再度删除。
     */
    core.classList.toggle('checked', this.state.checked)
  }
  
  /**
   * 元素插入 DOM，开始交互
   * 
   * 此时，自定义元素已被插入到 DOM 树，可以获取到其所有信息
   * 通常在此钩子函数中构建内部 DOM 结构
   */
  connectedCallback() {
    console.log('a-switch connectedCallback')
    const template = document.querySelector('#a-switch-template')
    console.log('template', template)
    const components = template.content.cloneNode(true) // 深度克隆
    this.innerHTML = '' // 清空当前元素
    this.appendChild(components)
    this.toggleChecked()
    const core = this.querySelector('.switch-core')
    core.addEventListener('click', () => {
      this.state.checked = !this.state.checked
      this.toggleChecked()
    })
  }
  
  /**
   * 元素从 DOM 移除，清理资源。
   */
  disconnectedCallback() {
    console.log('a-switch disconnectedCallback')
  }

  /**
   * 元素被移动到 DOM 树的其他位置触发
   */
  connectedMoveCallback() {
    console.log('a-switch connectedMoveCallback')
  }

  /**
   * 元素被移动到新的页面时触发
   */
  adoptedCallback() {
    console.log('a-switch adoptedCallback')
  }
}

customElements.define('a-switch', ASwitch)

import vnode from "./vnode"


// 形态一 h('div',{},'文字')
// 形态二 h('div',{},[])
// 形态三 h('div',{},h())

// 上面三种形式最终都是转换成抽象结点，对于形态2和3，需要单独收集children属性然后传入vnode

export default function (sel, data, c) {
  if (arguments.length !== 3) {
    throw Error("h函数参数必须是3个")
  } else if (typeof c === 'string' || typeof c === 'number') {
    // 第一种形态:直接返回
    return vnode(sel, data, undefined, c, undefined)
  } else if (Array.isArray(c)) {
    // 第二种形态:对子元素进行Vnode函数处理，最终返回虚拟节点。
    let children = []
    for (let i = 0; i < c.length; i++) {
      // 这里不用执行c[i]，测试用例已执行过
      if (!(c[i] && c[i].hasOwnProperty('sel'))) {
        throw Error("参数不是h函数")
      }
      // 收集children
      children.push(c[i])
    }
    return vnode(sel, data, children, undefined, undefined)
  } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
    // 第三种形态
    let children = [c]
    return vnode(sel, data, children, undefined, undefined)
  } else {
    throw Error("参数不对")
  }
}